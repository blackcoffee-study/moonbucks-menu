function App() {
  this.menu = [];

  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };
  const menuTemplate = (id, name) => `
    <li class="menu-list-item d-flex items-center py-2" id=${id}>
    <span class="w-100 pl-2 menu-name">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>
  `;

  const render = () => {
    const template = this.menu
      .map((item, idx) => menuTemplate(item, idx))
      .join("");
    $menuList.innerHTML = template;
    getMenuCount();
  };

  // function addMenuInList({ id, name }) {
  //   const menuItem = menuTemplate(id, name);
  //   $menuList.innerHTML += menuItem;
  //   getMenuCount();
  // }

  function handleToSubmitMenu() {
    if ($("#espresso-menu-name").value == "") {
      alert("메뉴를 입력해주세요.");
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    render();
    $("#espresso-menu-name").value = "";
  }

  function handleToSubmitWithEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleToSubmitMenu();
    }
  }

  function updateMenuItem({ target }) {
    const { classList } = target;
    const $li = target.parentElement;
    // if (classList.contains("menu-sold-out-button")) soldOutMenu($li);
    if (classList.contains("menu-edit-button")) editMenuName($li);
    if (classList.contains("menu-remove-button")) deleteMenuName($li);
  }

  // function soldOutMenu($li) {
  //   const $state = $li.querySelector(".menu-name");
  //   menuList[category].forEach((menu) => {
  //     if (menu.id == parseInt($li.id)) {
  //       menu.soldOut = !menu.soldOut;
  //       if (menu.soldOut) {
  //         $state.classList.add("sold-out");
  //       } else {
  //         $state.classList.remove("sold-out");
  //       }
  //     }
  //   });
  //   saveMenuLust();
  // }

  function editMenuName($li) {
    const $span = $li.querySelector(".menu-name");
    let editedMenuName = prompt(EDIT_INPUT, $span.textContent);
    if (editedMenuName) {
      editedMenuName = editedMenuName.trim();
    }
    if (!isEmpty(editedMenuName)) return;
    this.menu[menuId].name = editedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
    // this.menu.forEach((menu) => {
    //   if (menu.id == parseInt($li.id)) {
    //     menu.name = editedMenuName;
    //     $span.textContent = editedMenuName;
    //   }
    // });
  }

  function deleteMenuName($li) {
    const answer = confirm(DELETE_CHECK);
    if (!answer) return;
    // menuList = menuList[category].filter(
    //   (menu) => menu.id !== parseInt($li.id)
    // );
    $li.remove();
    getMenuCount();
    saveMenuLust();
  }

  function getMenuCount() {
    const menuCount = $menuList.querySelectorAll("li").length;
    $menuCount.textContent = `총 ${menuCount}개`;
  }

  // $menuList.addEventListener("click", updateMenuItem);
  $menuForm.addEventListener("submit", (event) => event.preventDefault());
  $menuName.addEventListener("keyup", handleToSubmitWithEnter);
  $menuSubmitButton.addEventListener("click", handleToSubmitMenu);

  // trim polyfill
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
  }
}
const app = new App();
app.init();
