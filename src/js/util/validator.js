import { MESSAGE } from "../constant";

export function validateMenuName(menuName) {
  const checkName = (menuName || "").trim();

  if (!checkName) {
    throw new Error(MESSAGE.REQUIRED_MENU_NAME);
  }
}
