const getTemplate = (menuName, menuCount) => ` 
    <h2 class="mt-1">${menuName} 메뉴 관리</h2>
    <span class="mr-2 mt-4 menu-count">${menuCount}</span>   
`;

const getMenuCount = (menuList, selectedCategoryId) => {
  const count = menuList.filter((menu) => !menu.isSoldout && menu.category === selectedCategoryId).length;

  return `총 ${count}개`;
};

export default ($targetEl, { menuList, categories, selectedCategoryId }) => {
  const $newHeader = $targetEl.cloneNode(true);

  const menuCount = getMenuCount(menuList, selectedCategoryId);
  const menuName = categories.find((category) => category.id === selectedCategoryId).name || "";

  $newHeader.innerHTML = getTemplate(menuName, menuCount);

  return $newHeader;
};
