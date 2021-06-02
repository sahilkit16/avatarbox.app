import { GravatarIcons } from "./avatar-collection.gravatar";
import { TwitterIcons } from "./avatar-collection.twitter";
import { getImageId } from "./helpers";

export class AvatarCollection {
  constructor(source){
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
  
  add(imageUrl){
    const imageId = getImageId(this.source, imageUrl);
    console.log(imageId);
    //await this.icons.add(imageUrl);
  }

  delete(imageUrl){
    const imageId = getImageId(this.source, imageUrl);
    console.log(imageId);
    //await this.icons.delete(imageUrl);
  }
}