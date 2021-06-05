import { GravatarClient } from "../../sdk/Release/Presentation";

export class GravatarIcons {
  constructor() {
    this.client = new GravatarClient();
    this.userId = null;
  }
  async add(imageUrl) {
    return await this.client.saveImageUrl(imageUrl);
  }
  async delete(imageName) {
    return await this.client.deleteUserImage(imageName);
  }
}
