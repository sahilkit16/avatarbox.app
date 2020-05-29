const isJson = (stringValue) => {
  try {
    JSON.parse(stringValue);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  isJson,
};
