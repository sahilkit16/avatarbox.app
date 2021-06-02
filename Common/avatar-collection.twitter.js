import { AvbxTwitterClient } from "avatarbox.sdk";

export class TwitterIcons {
  constructor() {
    this.client = new AvbxTwitterClient();
    this.userId = null;
  }
  async add(imageUrl) {
    return await this.client.addImage(this.userId, imageUrl);
  }
  async delete(imageId) {
    return await this.client.deleteImage(this.userId, imageId);
  }
}
