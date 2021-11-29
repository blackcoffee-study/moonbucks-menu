// const menus = {
//   espresso: [
//     {
//       name: "에스프레소 1",
//       soldOut: true,
//     }
//   ],
//   ...
// }

/**
 * 로컬 스토리지에서 메뉴 목록을 가져온다.
 * @returns {object} 메뉴 목록 객체
 */
export function loadMenuData() {
  let existingMenus = localStorage.getItem("menus");
  return existingMenus
    ? JSON.parse(existingMenus)
    : {};
}

/**
 * 전달 받은 메뉴 이름을 카테고리 이름에 맞게 로컬 스토리지에 저장한다.
 * @param {string} categoryName 가져올 카테고리 이름
 * @param {string} menuName 저장할 메뉴 이름
 */
export function createMenu(categoryName, menuName) {
  const menus = loadMenuData();
  if (!menus[categoryName]) {
    menus[categoryName] = [];
  }

  menus[categoryName].push({
    name: menuName,
    soldOut: false,
  });

  localStorage.setItem("menus", JSON.stringify(menus));
}

/**
 * 
 * @param {string} categoryName 
 * @param {string} targetMenuName 
 * @param {Object} newMenuData 
 * @param {string} newMenuData.name
 * @param {boolean} newMenuData.soldOut
 * @returns 
 */
export function updateMenu(categoryName, targetMenuName, newMenuData) {
  const menuData = loadMenuData();
  const selectedMenus = menuData[categoryName];
  if (!selectedMenus) return;

  const idx = selectedMenus.findIndex(
    (menu) => menu.name === targetMenuName
  );

  if (idx !== -1) {
    selectedMenus[idx] = newMenuData;
  }

  localStorage.setItem("menus", JSON.stringify(menuData, ...selectedMenus));
}
