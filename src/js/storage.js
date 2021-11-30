/**
 * 로컬 스토리지에서 카테고리별 메뉴 데이터를 가져온다.
 * @returns {object} 메뉴 목록 객체
 */
export function loadMenuData() {
  let existingMenus = localStorage.getItem("menus");
  return existingMenus ? JSON.parse(existingMenus) : {};
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
 * 전달 받은 카테고리/메뉴 이름으로 수정 대상 데이터를 찾아 새로운 데이터로 갱신한다.
 * @param {string} targetCategoryName
 * @param {string} targetMenuName
 * @param {Object} newMenuData
 * @param {string} newMenuData.name
 * @param {boolean} newMenuData.soldOut
 */
export function updateMenu(targetCategoryName, targetMenuName, newMenuData) {
  const menuData = loadMenuData();
  const selectedMenus = menuData[targetCategoryName];
  if (!selectedMenus) return;

  const idx = selectedMenus.findIndex((menu) => menu.name === targetMenuName);

  if (idx === -1) return;
  selectedMenus[idx] = { ...selectedMenus[idx], ...newMenuData };
  localStorage.setItem("menus", JSON.stringify(menuData, ...selectedMenus));
}

/**
 * 전달 받은 카테고리의 메뉴를 삭제한다.
 * @param {string} targetCategoryName - 삭제할 메뉴의 카테고리 이름
 * @param {string} targetMenuName - 삭제할 메뉴 이름
 */
export function deleteMenu(targetCategoryName, targetMenuName) {
  const menuData = loadMenuData();
  const selectedMenus = menuData[targetCategoryName];
  if (!selectedMenus) return;

  const newSelectedMenus = selectedMenus.filter(
    (menu) => menu.name !== targetMenuName
  );
  menuData[targetCategoryName] = newSelectedMenus;

  localStorage.setItem("menus", JSON.stringify(menuData));
}
