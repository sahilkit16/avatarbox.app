const days = require('../Domain/days');
const { rotateLeft } = require('../Common/utilities');
const { GravatarClient, GetPrimaryImageUseCase } = require('grav.client');
const ImageCountError = require('../Domain/image-count.error');
const ErrorCode = require('../Domain/error-code');
const moment = require('moment');

class BuildCalendarUseCase {
  constructor() {
    this.client = new GravatarClient();
    this.getPrimaryImage = new GetPrimaryImageUseCase();
  }
  async execute() {
    this.getPrimaryImage.client = this.client;
    const primaryImage = await this.getPrimaryImage.execute();
    const userImagesResult = await this.client.userImages();
    if(userImagesResult.DidFail) throw new Error(userImagesResult.ErrorMessage);
    const { userImages } = userImagesResult.Value;
    if(!(userImages && userImages.length)) throw new ImageCountError(ErrorCode.NoImages);
    if(userImages && userImages.length == 1) throw new ImageCountError(ErrorCode.SoleImage);
    const primaryImageIndex = userImages.reduce((targetIndex, image, currentIndex) => (
      (targetIndex < 0 && image.name == primaryImage.name) ? currentIndex : targetIndex
    ), -1);
    const images = rotateLeft(userImages, (primaryImageIndex + 1)).map((img, index) => ({
      url: `${img.url}?size=200`,
      day: (index == 0 ? "Next" : (
      (index == 1 ? "Tomorrow" : days[(moment().day() + index) % 7])))
    }));
    return { images };
  }
}

module.exports = BuildCalendarUseCase;