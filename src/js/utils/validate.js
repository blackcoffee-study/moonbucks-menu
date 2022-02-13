const MENU_WHITE_SPACE_INPUT = "메뉴를 입력해주세요.";
export function isEmpty(menuName) {
  if (!menuName) {
    alert(MENU_WHITE_SPACE_INPUT);
    return false;
  }
  return true;
}
