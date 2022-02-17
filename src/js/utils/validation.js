const isEmpty = (value) => {
  if (!value || value.trim() === "") {
    return true;
  }
  return false;
};

export { isEmpty };