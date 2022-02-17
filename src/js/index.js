import View from './View/view.js';
import Model from './Model/model.js';
import Controller from './Controller/controller.js';

export class cafeAPP {
  constructor() {
    const view = new View();
    const model = new Model();
    const controller = new Controller(model, view);

    view.initApp();
    controller.bindEvent();
  }
}

new cafeAPP();
