export const $ = (selector) => {
  return document.querySelector(selector);
};

export const MESSAGE = {
  CHECK_MODIFY: "수정할 메뉴명을 적어주세요.",
  ALREADY_EXIST: "이미 동일한 메뉴명이 있습니다.",
  WARN_BLANK: "메뉴명을 입력해주세요.",
  CHECK_REMOVE: "해당 메뉴를 삭제하시겠습니까?",
};
