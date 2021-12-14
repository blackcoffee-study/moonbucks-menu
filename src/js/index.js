import { MenuForm, MenuHeading, MenuList, Nav } from "./Views/index.js";
import Controller from "./Controller/index.js";
import Store from "./Model/Store.js";

class App {
  constructor() {
    const views = {
      menuFormView: new MenuForm(),
      menuHeadingView: new MenuHeading(),
      menuListView: new MenuList(),
      navView: new Nav(),
    };

    const store = new Store();
    new Controller({ views, store });


window.addEventListener("DOMContentLoaded", () => {
  new App();
});
