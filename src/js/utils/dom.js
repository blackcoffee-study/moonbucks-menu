export const $ = ($selector) => $selector && document.querySelector($selector);
export const $$ = ($selector) =>
  $selector && document.querySelectorAll($selector);

