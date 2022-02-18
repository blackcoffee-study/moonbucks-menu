const getMenuCount = (menuList) => {
  // 나중에 솔드아웃 처리

  const count = menuList.length;

  return `총 ${count}개`;
};

export default ($targetEl, { menuList }) => {
  const $newCounter = $targetEl.cloneNode(true);
  $newCounter.textContent = getMenuCount(menuList);
  return $newCounter;
};
