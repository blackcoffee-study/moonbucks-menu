import { on } from "../helper.js";

class MainController {
  constructor(mainModel, { espressoView }) {
    this.mainModel = mainModel;
    this.espressoView = espressoView;

    this.showEspressoMenu();
  
    this.submitViewEvent();
  }

  showEspressoMenu() {
    this.espressoMenuList = this.mainModel.getEspressoMenu();
    this.espressoMenuList && this.espressoView.showEspressoMenu(this.espressoMenuList);
    this.espressoView.espressoMenuCount();
  }

  submitViewEvent() {
    on(this.espressoView.espressoForm, '@addEspressoMenu', (event) => this.submitAddEspressMenu(event));
    on(this.espressoView.espressoMenuListElement, '@editEspressoMenu', (event) => this.submitEditEspressMenu(event));
    on(this.espressoView.espressoMenuListElement, '@removeEspressoMenu', (event) => this.submitRemoveEspressMenu(event));
    on(this.espressoView.espressoMenuListElement, '@soldoutEspressoMenu', (event) => this.submitSoldoutEspressMenu(event));
  }

  submitAddEspressMenu(event) {
    this.mainModel.addEspressoMenu(event.detail);
    this.showEspressoMenu();
  }

  submitEditEspressMenu(event) {
    this.mainModel.editEspressoMenu(event.detail);
    this.showEspressoMenu();
  }

  submitRemoveEspressMenu(event) {
    this.mainModel.removeEspressoMenu(event.detail);
    this.showEspressoMenu();
  }

  submitSoldoutEspressMenu(event) {
    this.mainModel.soldoutEspressMenu(event.detail);
    this.showEspressoMenu();
  }

}

export default MainController;