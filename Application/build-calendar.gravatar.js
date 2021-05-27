import { GetPrimaryImageUseCase, GravatarClient } from "avatarbox.sdk";
import { container } from "../Common/di-container";
import { ErrorCode } from "../Domain/error-code";
import { ImageShortageError } from "../Domain/image-shortage.error";
import { StrategyBase } from "./build-calendar.strategy";

export class GravatarStrategy extends StrategyBase {
  constructor() {
    super();
    this.client = container.resolve("gravatarClient");
    this.rpcClient = new GravatarClient();
    this.getPrimaryImage = new GetPrimaryImageUseCase();
    this.primaryImage = null;
    this.icons = [];
    this.load = async function () {
      this.isEnabled = await this.client.isActive(this.rpcClient.email);
      this.getPrimaryImage.client = this.rpcClient;
      this.primaryImage = await this.getPrimaryImage.execute();
      const { userImages } = await this.rpcClient.userImages();
      if (!(userImages && userImages.length))
        throw new ImageShortageError(ErrorCode.NoImages);
      if (userImages && userImages.length == 1)
        throw new ImageShortageError(ErrorCode.SingleImage);
      this.icons = userImages.map((img) => {
        img.url = `${img.url.replace("http:", "https:")}?size=250`;
        return img;
      });
    };
    this.compute = async function () {
      const exists = await this.rpcClient.exists();
      const { primaryImage } = this;
      if (!exists.success) {
        this.icons.unshift({
          url: "https://www.gravatar.com/avatar/0000?s=250",
          name: primaryImage.name,
        });
      }
      this.startIndex = this.icons.reduce(
        (targetIndex, image, currentIndex) =>
          targetIndex < 0 && image.name == primaryImage.name
            ? currentIndex
            : targetIndex,
        -1
      );
    };
  }
}
