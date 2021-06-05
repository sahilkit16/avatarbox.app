import { GravatarIcons } from "./avatar-collection.gravatar";
import { TwitterIcons } from "./avatar-collection.twitter";
import { getImageId } from "./helpers";

export class AvatarCollection {
  constructor(source) {
    this.source = source;
    switch (source) {
      case "gravatar":
        this.icons = new GravatarIcons();
        break;
      case "twitter":
        this.icons = new TwitterIcons();
        break;
      default:
        break;
    }
  }

  set userId(value) {
    this.icons.userId = value;
  }
  set client(value) {
    this.icons.client = value;
  }

  async add(imageUrl) {
    return await this.icons.add(imageUrl);
  }

  async delete(imageUrl) {
    const imageId = getImageId(this.source, imageUrl);
    return await this.icons.delete(imageId);
  }
}
