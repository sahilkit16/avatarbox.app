require('dotenv').config();
var amqp = require("amqplib/callback_api");

const exchange = "gravatar-events";

const queues = {
  "update.daily": "daily-update-queue",
  "update.now": "update-queue",
};

class MessageBroker {
  constructor({ logger }) {
    this.logger = logger;
    this.connection = null;
    this.channel = null;
    this._onUpdateHandler = null;
    this._onDailyUpdateHandler = null;
  }

  onUpdate(onUpdateHandler) {
    this._onUpdateHandler = onUpdateHandler;
    return this;
  }

  onDailyUpdate(onDailyUpdateHandler) {
    this._onDailyUpdateHandler = onDailyUpdateHandler;
    return this;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      amqp.connect(process.env.AMQP_URI, (connectionError, connection) => {
        if (connectionError) {
          reject(connectionError);
        } else {
          this.connection = connection;
          this.connection.createChannel((channelError, channel) => {
            if (channelError) {
              reject(channelError);
            } else {
              channel.assertExchange(
                exchange,
                "direct",
                { durable: false, maxPriority: 2 },
                (exchangeError) => {
                  if (exchangeError) {
                    reject(exchangeError);
                  } else {
                    this.channel = channel;
                    this.logger.notice("message broker connected");
                    resolve(this);
                  }
                }
              );
            }
          });
        }
      });
    });
  }

  subscribe() {
    const bindQueue = (routingKey, handler) => {
      const name = queues[routingKey];
      this.channel.assertQueue(name, { durable: false, maxPriority: 2 });
      this.channel.bindQueue(name, exchange, routingKey);
      this.channel.consume(name, handler);
      this.logger.notice(`listening for messages on ${routingKey}`);
    };
    if (this._onUpdateHandler) {
      bindQueue("update.now", this._onUpdateHandler);
    }
    if (this._onDailyUpdateHandler) {
      bindQueue("update.daily", this._onDailyUpdateHandler);
    }
  }

  publish(routingKey, message, priority = 1) {
    if (this.channel) {
      this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(message),
        priority
      );
    } else {
      this.logger.warn("no channel - message not published");
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.close();
      this.logger.warn("message broker disconnected");
    }
  }
}

module.exports = MessageBroker;
