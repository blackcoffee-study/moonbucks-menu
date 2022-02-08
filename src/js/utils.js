// 인풋창 validation
export const isEmpty = (value) => {
  if (!value || value.replace(/ /g, "") === "") {
    return true;
  }

  return false;
};
