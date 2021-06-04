export const isJson = (stringValue) => {
  try {
    return JSON.parse(stringValue);
  } catch (error) {
    return false;
  }
};

export function rotateLeft(collection, _targetIndex) {
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

export function getImageId(source, imageUrl) {
  let imageId = "";
  const url = imageUrl.replace(/\?.*$/, "");
  switch (source) {
    case "gravatar":
      const urlParts = url.split("/");
      const imageFileName = urlParts.pop();
      imageId = imageFileName.replace(/\..*$/, "");
      break;
    case "twitter":
      imageId = url;
    default:
      break;
  }
  return imageId;
}

export const deleteIcon = () => {
  if (confirm("Are you sure?")) {
    document.getElementById("menu-form").submit();
  }
};
