const PromptView = require('./_prompt');
const ImageShortageError = require("../../Domain/image-shortage.error");
const ErrorCode = require("../../Domain/error-code");

class ImageShortagePrompt extends PromptView {
  constructor(error = new ImageShortageError()){
    let title, message;
    if(error.code == ErrorCode.NoImages) {
      title = "No Images";
      message = "Whoops, looks like you don't have any images yet!";
    } else if (error.code == ErrorCode.SingleImage){
      title = "Not Enough Images";
      message = "You need at least two images.";
    }
    super(title, message);
    this.linkText = "Add some by clicking here!";
  }
}

module.exports = ImageShortagePrompt;
