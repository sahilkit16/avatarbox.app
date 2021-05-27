import { container } from "../Common/di-container";
import { StrategyBase } from "./build-calendar.strategy";

export class TwitterStrategy extends StrategyBase {
  constructor() {
    super();
    this.client = container.resolve("twitterClient");
    this.profile = null;
    this.load = async function () {
      this.isEnabled = await this.client.isActive(this.profile.id);
      this.icons = this.profile.avatars.map((avatar) => ({
        url: avatar,
      }));
    };
    this.compute = async function () {
      this.startIndex = this.profile.currentAvatarIndex;
      return await Promise.resolve();
    };
  }
}
