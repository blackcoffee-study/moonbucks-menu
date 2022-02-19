const getMenuCount = (menuList, selectedCategoryId) => {
  // 나중에 솔드아웃 처리

  const count = menuList.filter((menu) => !menu.isSoldout && menu.category === selectedCategoryId).length;

  return `총 ${count}개`;
};

export default ($targetEl, { menuList, selectedCategoryId }) => {
  const $newCounter = $targetEl.cloneNode(true);
  $newCounter.textContent = getMenuCount(menuList, selectedCategoryId);
  return $newCounter;
};
