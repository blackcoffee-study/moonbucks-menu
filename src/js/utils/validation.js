// 공백 value
export const isEmpty = (value) => {
  // 공백 정규식
  const regExp = / /g;

  return !value || value.replace(regExp, "") === "";
};

// 중복 validation
export const isDuplicated = (items, value) => {
  // 특수문자 공백 정규식
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g;
  const replaced = (str) => str.replace(regExp, "");

  const result = items.find((item) => {
    return replaced(item.name) === replaced(value);
  });

  return result;
};
