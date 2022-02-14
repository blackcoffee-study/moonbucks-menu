const getTemplate = (name, index) => `    
<li class="menu-list-item d-flex items-center py-2">   
    <span class="w-100 pl-2 menu-name">${name}</span>  
    <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button" id=${index}> 
    수정
    </button>
    <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button" id=${index}> 
    삭제
    </button>
</li>  
`;

const createNewMenu = (menu, index) => {
  const { name } = menu;
  const $newMenu = document.createElement("frame");
  $newMenu.innerHTML = getTemplate(name, index);

  return $newMenu.firstElementChild;
};

export default ($targetEl, state, events) => {
  const { menuList } = state;
  const { removeMenu, renameMenu } = events;
  const $newMenuList = $targetEl.cloneNode(true);

  // 초기화
  $newMenuList.innerHTML = "";

  menuList
    .map((menu, index) => createNewMenu(menu, index))
    .forEach(($el) => {
      $newMenuList.appendChild($el);
    });

  $newMenuList.addEventListener("click", (e) => {
    const { target } = e;
    if (target.matches("button.menu-remove-button")) {
      const result = confirm("정말삭제하시겠습니까?");
      if (result) removeMenu(target.id);
    }
    if (target.matches("button.menu-edit-button")) {
      const result = prompt("수정할이름을 입력해주세요");
      if (result) renameMenu(target.id, result);
    }
  });

  return $newMenuList;
};
