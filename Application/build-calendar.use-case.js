const { days } = require("../Domain/days");
const { GravatarClient, GetPrimaryImageUseCase } = require("grav.client");
const { ImageShortageError } = require("../Domain/image-shortage.error");
const { ErrorCode } = require("../Domain/error-code");
const moment = require("moment");

function rotateLeft(collection, _targetIndex) {
  const targetIndex = _targetIndex % collection.length;
  if (targetIndex == 0) {
    return collection;
  }
  const begin = [];
  const end = [];
  collection.map((item, index) => {
    if (index >= targetIndex) {
      begin.push(item);
    } else {
      end.push(item);
    }
  });
  return [...begin, ...end];
}

export class BuildCalendarUseCase {
  constructor({ avbx }) {
    this.client = new GravatarClient();
    this.avbx = avbx;
    this.isEnabled = false;
    this.getPrimaryImage = new GetPrimaryImageUseCase();
  }
  async execute() {
    this.client = await this.avbx.fetch(this.client.email);
    this.isEnabled = await this.avbx.isActive(this.client.email);
    this.getPrimaryImage.client = this.client;
    const primaryImage = await this.getPrimaryImage.execute();
    const { userImages } = await this.client.userImages();
    if (!(userImages && userImages.length))
      throw new ImageShortageError(ErrorCode.NoImages);
    if (userImages && userImages.length == 1)
      throw new ImageShortageError(ErrorCode.SingleImage);
    const primaryImageIndex = userImages
      .map((img) => {
        img.url = img.url.replace("http:", "https:");
        return img;
      })
      .reduce(
        (targetIndex, image, currentIndex) =>
          targetIndex < 0 && image.name == primaryImage.name
            ? currentIndex
            : targetIndex,
        -1
      );
    const targetIndex = this.isEnabled
      ? primaryImageIndex
      : primaryImageIndex + 1;
    const firstImageName = this.isEnabled ? "Now" : "Next";
    const images = rotateLeft(userImages, targetIndex).map((img, index) => ({
      url: `${img.url}?size=200`,
      day:
        index == 0
          ? firstImageName
          : index == 1
          ? "Tomorrow"
          : days[(moment().day() + index) % 7],
    }));
    return { images, isEnabled: this.isEnabled };
  }
}
