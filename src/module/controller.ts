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
    this.view.bindClickMenuTab(this.handleClickMenuTab);
    this.view.bindSoldOutMenu(this.handleSoldOutMenu);

    this.model.bindMenuListChanged(this.render);
  }

  render = (menuList: Array<string>) => {
    this.view.renderMenuList(menuList);
    this.view.renderMenuCount(menuList);
  };

  handleAddMenu = (event: Event) => {
    event.preventDefault();

    const name = this.view.menuName;

    if (!name) {
      return window.alert("메뉴 이름을 입력해주세요.");
    }
    this.model.addMenu(name);
    this.view.resetInput();
  }

  handleEditMenu = (event: { target: HTMLButtonElement }) => {
    if (event.target.name === "edit") {
      const editedName = window.prompt("수정할 메뉴 이름을 입력해주세요");

      if (editedName) {
        const { menuId } = (event.target.parentNode as HTMLLIElement).dataset;
        this.model.editMenu(menuId, editedName);
      }
    }
  }

  handleDeleteMenu = (event: { target: HTMLButtonElement }) => {
    if (event.target.name === "delete") {
      const deleteConfirm = window.confirm("메뉴를 삭제하시겠습니까?");

      if (deleteConfirm) {
        const { menuId } = (event.target.parentNode as HTMLLIElement).dataset;
        this.model.deleteMenu(menuId);
      }
    }
  }

  handleClickMenuTab = (event: { target : HTMLButtonElement }) => {
    const { categoryName } = event.target.dataset;

    this.model.selectMenuTab(categoryName);
  }

  handleSoldOutMenu = (event: { target : HTMLButtonElement }) => {
    if (event.target.name === 'soldOut') {
      const menuText = event.target.parentNode.childNodes[1] as HTMLSpanElement;
      menuText.classList.add('sold-out')
    }
  }
}

export default Controller;
