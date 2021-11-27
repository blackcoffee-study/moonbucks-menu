export const $ = (selector, $target = document) =>
  $target.querySelector(selector);

export const $$ = (selector, $target = document) =>
  $target.querySelectorAll(selector);
