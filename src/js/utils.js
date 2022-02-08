// 인풋창 validation
export const isEmpty = (value) => {
  if (value.replace(/ /g, "") === "") {
    return true;
  }

  return false;
};
