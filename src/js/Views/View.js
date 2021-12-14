import { emit, on } from "../utils.js";

export default class View {
  constructor(target) {
    this.target = target;
  }

  on(eventName, handler) {
    on(this.target, eventName, handler);
    return this;
  }

  emit(eventName, data) {
    emit(this.target, eventName, data);
    return this;
  }

  $(selector) {
    return this.target.querySelector(selector);
  }
}
