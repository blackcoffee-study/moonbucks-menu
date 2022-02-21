import { on } from "../helper.js";

class MainController {
  constructor(mainModel, { categoryView, menuView }) {
    this.mainModel = mainModel;
    this.categoryView = categoryView;
    this.menuView = menuView;

    this.categoryName = 'espresso';

    this.showMenu();

    this.submitMenuEvent();
  
    this.submitViewEvent();
  }

  showMenu() {
    this.menuList = this.mainModel.getMenuList(this.categoryName);
    this.menuView.showMenuList(this.menuList);
    this.menuView.menuCount();
  }

  submitMenuEvent() {
    on(this.categoryView.menuListElement, '@menuClick', (event) => this.submitMenuClick(event));
  }

  submitViewEvent() {
    on(this.menuView.menuForm, '@addMenu', (event) => this.submitAddMenu(event));
    on(this.menuView.menuListElement, '@editMenu', (event) => this.submitEditMenu(event));
    on(this.menuView.menuListElement, '@removeMenu', (event) => this.submitRemoveMenu(event));
    on(this.menuView.menuListElement, '@soldoutMenu', (event) => this.submitSoldoutMenu(event));
  }

  submitMenuClick(event) {
    this.categoryName = event.detail;
    this.showMenu();
  }

  submitAddMenu(event) {
    this.mainModel.setAddMenu(event.detail, this.categoryName);
    this.showMenu();
  }

  submitEditMenu(event) {
    this.mainModel.setEditMenu(event.detail, this.categoryName);
    this.showMenu();
  }

  submitRemoveMenu(event) {
    this.mainModel.setRemoveMenu(event.detail, this.categoryName);
    this.showMenu();
  }

  submitSoldoutMenu(event) {
    this.mainModel.setSoldoutMenu(event.detail, this.categoryName);
    this.showMenu();
  }

}

export default MainController;