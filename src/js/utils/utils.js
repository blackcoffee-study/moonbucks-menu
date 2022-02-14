import { isEmpty, isDuplicated } from "./validation.js";
import { TEXT } from "../consts.js";

// 공백 체크와 메뉴 중복 체크를 진행합니다.
export const inputValidator = (items, value) => {
  if (isEmpty(value)) {
    alert(TEXT.MENU_INPUT_EMPTY);

    return true;
  }

  if (isDuplicated(items, value)) {
    alert(TEXT.MENU_EXIST);

    return true;
  }

  return false;
};
