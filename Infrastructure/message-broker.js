var amqp = require("amqplib/callback_api");

const exchange = 'gravatar';

const queues = {
  "update.single": "update-queue",
  "update.bulk": "bulk-update-queue"
}

class MessageBroker {
  constructor({ logger }) {
    this.logger = logger;
    this.connection = null;
    this.channel = null;
    this._onUpdateHandler = null;
    this._onBulkUpdateHandler = null;
  }
  
  onUpdate(onUpdateHandler){
    this._onUpdateHandler = onUpdateHandler;
    return this;
  };

  onBulkUpdate(onBulkUpdateHandler){
    this._onBulkUpdateHandler = onBulkUpdateHandler;
    return this;
  };

  async connect() {
    return new Promise((resolve, reject) => {
      amqp.connect("amqp://avatarbox:5672", (connectionError, connection) => {
        if (connectionError) {
          reject(connectionError);
        } else {
          this.connection = connection;
          this.connection.createChannel((channelError, channel) => {
            if (channelError) {
              reject(channelError);
            } else {
              channel.assertExchange(exchange, 'direct', { durable: false}, (exchangeError) => {
                if (exchangeError) {
                  reject(exchangeError);
                } else {
                  this.channel = channel;
                  resolve(this);
                }
              })
            }
          });
        }
      });
    });
  }

  subscribe(){
    const bindQueue = (routingKey, handler) => {
      const name = queues[routingKey];
      this.channel.assertQueue(name, { durable: false });
      this.channel.bindQueue(name, exchange, routingKey);
      this.channel.consume(name, handler);
      this.logger.notice(`listening for messages on ${routingKey}`);
    }
    if(this._onUpdateHandler){
      bindQueue("update.single", this._onUpdateHandler);
    }
    if(this._onBulkUpdateHandler){
      bindQueue("update.bulk", this._onBulkUpdateHandler);
    }
  }

  publish(routingKey, message) {
    if(this.channel){
      this.channel.publish(exchange, routingKey, Buffer.from(message));
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
