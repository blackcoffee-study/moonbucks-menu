import { MESSAGE } from "../constant";

export const validateMenuName = (menuName) => {
  const checkName = (menuName || "").trim();

  if (!checkName) {
    throw new Error(MESSAGE.REQUIRED_MENU_NAME);
  }
};
