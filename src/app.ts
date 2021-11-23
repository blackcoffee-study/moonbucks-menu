{
  class Model {
    menu;
    selectedTab;
    menuObserver;
    constructor() {
      this.menu = {
        espresso: JSON.parse(localStorage.getItem("espresso")) || [],
        frappuchino: JSON.parse(localStorage.getItem("frappuchino")) || [],
        blended: JSON.parse(localStorage.getItem("blended")) || [],
        teavana: JSON.parse(localStorage.getItem("teavana")) || [],
        dessert: JSON.parse(localStorage.getItem("dessert")) || [],
      };
      this.selectedTab = "espresso";
    }

    bindMenuListChanged(handler) {
      this.menuObserver = handler;
    }

    onMenuChanged() {
      this.menuObserver(this.menu[this.selectedTab]);
      localStorage.setItem(
        this.selectedTab,
        JSON.stringify(this.menu[this.selectedTab])
      );
    }

    addMenu(menuName) {
      this.menu[this.selectedTab].push(menuName)

      this.onMenuChanged();
    }

    editMenu(menuId, editedName) {
      this.menu[this.selectedTab][menuId] = editedName;

      this.onMenuChanged();
    }

    deleteMenu(menuId) {
      this.menu[this.selectedTab].splice(menuId, 1)

      this.onMenuChanged();
    }

    selectMenuTab(selectedTab) {
      this.selectedTab = selectedTab;

      this.onMenuChanged();
    }
  }

  class View {
    input;
    form;
    menuList;
    menuCount;
    categoryButtons;
    constructor() {
      this.input = document.querySelector("#espresso-menu-name");
      this.form = document.querySelector("#espresso-menu-form");
      this.menuList = document.querySelector("#espresso-menu-list");
      this.menuCount = document.querySelector(".menu-count");
      this.categoryButtons = document.querySelectorAll('button[data-category-name]');
    }

    get menuName() {
      return this.input.value;
    }

    resetInput() {
      return (this.input.value = "");
    }

    getMenuElement(menuList) {
      return menuList.map((menu, index) =>
        `<li class="menu-list-item d-flex items-center py-2" data-menu-id=${index}>
    <span class="w-100 pl-2 menu-name">${menu}</span>
    <button
    type="button"
    name="edit"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
    수정
    </button>
    <button
    type="button"
    name="delete"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
    삭제
    </button>
    </li>`
      )
        .join("");
    }

    renderMenuList(menus) {
      while (this.menuList.firstChild) {
        this.menuList.removeChild(this.menuList.firstChild);
      }

      if (!menus) {
        return;
      }

      const menuListElement = this.getMenuElement(menus);
      this.menuList.innerHTML = menuListElement;
    }

    renderMenuCount(menus) {
      if (!menus) { return this.menuCount.innerText = '총 0개'}
      this.menuCount.innerText = `총 ${menus.length}개`;
    }

    bindAddMenu(handler) {
      this.form.addEventListener("submit", (event) => handler(event))
    }

    bindEditMenu(handler) {
      this.menuList.addEventListener("click", (event) => handler(event))
    }

    bindDeleteMenu(handler) {
      this.menuList.addEventListener("click", (event) => handler(event))
    }

    bindClickMenuTab(handler) {
      this.categoryButtons.forEach((button) => 
        button.addEventListener("click", event => handler(event))
      )
    }
  }

  class Controller {
    model;
    view;
    constructor(model, view) {
      this.model = model;
      this.view = view;

      this.render(this.model.menu.espresso);

      this.view.bindAddMenu(this.handleAddMenu);
      this.view.bindEditMenu(this.handleEditMenu);
      this.view.bindDeleteMenu(this.handleDeleteMenu);
      this.view.bindClickMenuTab(this.handleClickMenuTab)

      this.model.bindMenuListChanged(this.render);
    }

    render = (menuList) => {
      this.view.renderMenuList(menuList);
      this.view.renderMenuCount(menuList);
    };

    handleAddMenu = (event) => {
      event.preventDefault();

      const name = this.view.menuName;

      if (!name) {
        return window.alert("메뉴 이름을 입력해주세요.");
      }
      this.model.addMenu(name);
      this.view.resetInput();
    }

    handleEditMenu = (event) => {
      if (event.target.name === "edit") {
        const editedName = window.prompt("수정할 메뉴 이름을 입력해주세요");

        if (editedName) {
          const { menuId } = event.target.parentNode.dataset;
          this.model.editMenu(menuId, editedName);
        }
      }
    }

    handleDeleteMenu = (event) => {
      if (event.target.name === "delete") {
        const deleteConfirm = window.confirm("메뉴를 삭제하시겠습니까?");

        if (deleteConfirm) {
          const { menuId } = event.target.parentNode.dataset;
          this.model.deleteMenu(menuId);
        }
      }
    }

    handleClickMenuTab = (event) => {
      const { categoryName } = event.target.dataset;
      
      this.model.selectMenuTab(categoryName);
    }
  }

  const app = new Controller(new Model(), new View());
}
