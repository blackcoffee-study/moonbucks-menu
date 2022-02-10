const MENU_WHITE_SPACE_INPUT = "메뉴를 입력해주세요.";
export function isEmpty(info, type = "any") {
  const valueCheck = info.replace(/^\s*/, "");
  if (!valueCheck) {
    alert(MENU_WHITE_SPACE_INPUT);
    return false;
  }
  return valueCheck;
}
