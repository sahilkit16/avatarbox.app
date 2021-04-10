export const isJson = (stringValue) => {
  try {
    return JSON.parse(stringValue);
  } catch (error) {
    return false;
  }
};
