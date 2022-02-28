export const checkDuplicate = (menus, newMenu) => {
  const menuArr = [];
  menus.forEach((menu) => {
    menuArr.push(menu.name);
  });
  menuArr.push(newMenu);
  const set = new Set(menuArr);

  if (menuArr.length !== set.size) {
    alert('중복된 메뉴입니다!');
    return true;
  } else {
    return false;
  }
};
