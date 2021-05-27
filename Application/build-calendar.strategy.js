import moment from "moment";
import { days } from "../Domain/days";
import { rotateLeft } from "../Common/helpers";

const noop = () => async () => {};

export class StrategyBase {
  constructor() {
    this.isEnabled = false;
    this.load = noop();
    this.compute = noop();
    this.handleError = noop();
    this.icons = [];
    this.startIndex = 0;
  }
  render() {
    const { icons, startIndex } = this;
    const dayNumber = moment().day();
    const images = rotateLeft(icons, startIndex).map((image, index) => ({
      url: image.url,
      day:
        index == 0
          ? "Now"
          : index == 1
          ? "Tomorrow"
          : days[(dayNumber + index) % 7],
    }));
    return { images, isEnabled: this.isEnabled };
  }
}
