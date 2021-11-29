const updateMenuName = e => {
  const $menuName = e.target.closest('li').querySelector('.menu-name');
  const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
  $menuName.innerText = updatedMenuName;
};

export default updateMenuName;
