const getTemplate = (name, id, isSoldout) => `     
<li class="menu-list-item d-flex items-center py-2" id=${id}> 
  <span class="w-100 pl-2 menu-name ${isSoldout ? "sold-out" : ""}">${name}</span> 
  <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
    품절
  </button>
  <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
    수정
  </button>
  <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
    삭제
  </button>
</li>
`;

const createNewMenu = (menu) => {
  const { id, name, isSoldout } = menu;
  const $newMenu = document.createElement("frame");
  $newMenu.innerHTML = getTemplate(name, id, isSoldout);

  return $newMenu.firstElementChild;
};

export default ($targetEl, state, events) => {
  const { menuList, selectedCategoryId } = state;
  const { removeMenu, renameMenu, setSoldout } = events;
  const $newMenuList = $targetEl.cloneNode(true);

  // 초기화
  $newMenuList.innerHTML = "";

  menuList
    .filter((menu) => menu.category === selectedCategoryId)
    .map((menu, index) => createNewMenu(menu, index))
    .forEach(($el) => {
      $newMenuList.appendChild($el);
    });

  $newMenuList.addEventListener("click", (e) => {
    const { target } = e;
    const id = target.parentNode.id;
    if (target.matches("button.menu-remove-button")) {
      const result = confirm("정말삭제하시겠습니까?");
      if (result) removeMenu(id);
    }
    if (target.matches("button.menu-edit-button")) {
      const result = prompt("수정할이름을 입력해주세요");
      if (result) renameMenu(id, result);
    }
    if (target.matches("button.menu-sold-out-button")) {
      setSoldout(id);
    }
  });

  return $newMenuList;
};
