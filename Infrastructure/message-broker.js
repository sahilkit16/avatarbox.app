var amqp = require("amqplib/callback_api");

class MessageBroker {
  constructor({ logger }) {
    this.logger = logger;
    this.connection = null;
    this.channel = null;
    this.queue = null;
  }
  async connect(queue) {
    this.queue = queue;
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
              channel.assertQueue(queue, {
                durable: false,
              });
              this.channel = channel;
              this.logger.notice("broker connected");
              resolve(this);
            }
          });
        }
      });
    });
  }
  send(message, queue = this.queue) {
    if (this.channel && queue) {
      this.channel.sendToQueue(queue, Buffer.from(message));
      this.logger.notice(`broker message sent`);
    } else if (!this.channel) {
      this.logger.warn("missing channel - could not send message");
    } else if (!queue) {
      this.logger.warn("missing queue name - could not send message");
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
