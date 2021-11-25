import Model from "./module/model.js";
import View from "./module/view.js";
import Controller from "./module/controller.js";

const app = new Controller(new Model(), new View());
