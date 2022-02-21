import MainController from './controller/MainController.js';
import MainModel from './model/MainModel.js';
import MenuView from './views/MenuView.js';
import CategoryView from './views/CategoryView.js';

document.addEventListener('DOMContentLoaded', main);

function main() {
  const mainModel = new MainModel();

  const views = {
    categoryView: new CategoryView(), 
    menuView: new MenuView(),
  };

  new MainController(mainModel, views);
}
