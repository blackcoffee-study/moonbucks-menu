export const $ = (selector) => document.querySelector(selector);
export const $All = (selector) => document.querySelectorAll(selector);
export const addEvent = (type, selector, callback) => {
  selector.addEventListener(type, callback);
};
