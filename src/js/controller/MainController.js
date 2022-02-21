import { on } from "../helper.js";

class MainController {
  constructor(mainModel, { menuView, espressoView }) {
    this.mainModel = mainModel;
    this.menuView = menuView;
    this.espressoView = espressoView;

    this.categoryName = 'espresso';

    this.showEspressoMenu();

    this.submitMenuEvent();
  
    this.submitViewEvent();
  }

  showEspressoMenu() {
    this.espressoMenuList = this.mainModel.getEspressoMenu(this.categoryName);
    this.espressoView.showEspressoMenu(this.espressoMenuList);
    this.espressoView.espressoMenuCount();
  }

  submitMenuEvent() {
    on(this.menuView.menuListElement, '@menuClick', (event) => this.submitMenuClick(event));
  }

  submitViewEvent() {
    on(this.espressoView.espressoForm, '@addEspressoMenu', (event) => this.submitAddEspressMenu(event));
    on(this.espressoView.espressoMenuListElement, '@editEspressoMenu', (event) => this.submitEditEspressMenu(event));
    on(this.espressoView.espressoMenuListElement, '@removeEspressoMenu', (event) => this.submitRemoveEspressMenu(event));
    on(this.espressoView.espressoMenuListElement, '@soldoutEspressoMenu', (event) => this.submitSoldoutEspressMenu(event));
  }

  submitMenuClick(event) {
    this.categoryName = event.detail;
    this.showEspressoMenu();
  }

  submitAddEspressMenu(event) {
    this.mainModel.addEspressoMenu(event.detail, this.categoryName);
    this.showEspressoMenu();
  }

  submitEditEspressMenu(event) {
    this.mainModel.editEspressoMenu(event.detail, this.categoryName);
    this.showEspressoMenu();
  }

  submitRemoveEspressMenu(event) {
    this.mainModel.removeEspressoMenu(event.detail, this.categoryName);
    this.showEspressoMenu();
  }

  submitSoldoutEspressMenu(event) {
    this.mainModel.soldoutEspressMenu(event.detail, this.categoryName);
    this.showEspressoMenu();
  }

}

export default MainController;