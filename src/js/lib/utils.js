export const $ = target => selector => target.querySelector(selector);
export const $all = target => selector => target.querySelectorAll(selector);
export const isEmpty = value => !(value && value.trim());
export const hasClass = ($target, className) =>
  $target.classList.contains(className);
