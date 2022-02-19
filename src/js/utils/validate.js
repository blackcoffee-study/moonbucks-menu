const MENU_WHITE_SPACE_INPUT = "메뉴를 입력해주세요.";
export function isBlank(menuName) {
  if (!menuName) {
    alert(MENU_WHITE_SPACE_INPUT);
    return true;
  }
  return false;
}

export function isReduplicated(arr, menuName, id = null) {
  const reduplication = arr.find(
    (item) => item.name === menuName && item.id !== parseInt(id)
  );
  if (reduplication) alert("이미 동일한 메뉴가 있습니다.");
  return !!reduplication;
}
