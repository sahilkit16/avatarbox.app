import { container } from "../Common/di-container";
import { StrategyBase } from "./build-calendar.strategy";

export class TwitterStrategy extends StrategyBase {
  constructor() {
    super();
    this.client = container.resolve("twitterClient");
    this.id = null;
    this.load = async function () {
      const { avatars, isActive, currentAvatarIndex } = await this.client.fetch(
        this.id
      );
      this.currentAvatarIndex = currentAvatarIndex;
      this.isEnabled = isActive;
      this.icons = avatars.map((avatar) => ({
        url: avatar,
      }));
    };
    this.compute = async function () {
      this.startIndex = this.currentAvatarIndex;
      return await Promise.resolve();
    };
  }
}
