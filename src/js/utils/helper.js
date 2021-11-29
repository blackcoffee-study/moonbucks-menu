const isEmptyString = (string) => {
  if (string === null) {
    return true;
  }
  if (string.trim() === '') {
    return true;
  }
  return false;
};

export default isEmptyString;
