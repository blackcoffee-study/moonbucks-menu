import MainController from './controller/MainController.js';
import MainModel from './model/MainModel.js';
import EspressoView from './views/EspressoView.js';

document.addEventListener('DOMContentLoaded', main);

function main() {
  const mainModel = new MainModel();

  const views = {
    espressoView: new EspressoView(),
  };

  new MainController(mainModel, views);
}
