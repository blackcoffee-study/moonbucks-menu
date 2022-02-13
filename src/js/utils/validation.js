// 공백 value
export const isEmpty = (value) => {
  // 공백 정규식
  const regExp = / /g;

  if (!value || value.replace(regExp, "") === "") {
    return true;
  }

  return false;
};

// 중복 validation
export const isExist = (items, value) => {
  // 특수문자 공백 정규식
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g;
  const replaced = (str) => str.replace(regExp, "");

  const result = items.find((item) => {
    if (replaced(item.name) === replaced(value)) return true;
  });

  return result;
};
