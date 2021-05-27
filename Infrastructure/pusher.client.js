import Pusher from "pusher-js";

export class PusherClient {
  constructor() {
    this.channel = null;
    this.self = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });
  }
  subscribe(channelName, handler) {
    this.channel = this.self.subscribe(channelName);
    this.channel.bind("update-event", handler);
  }
}
