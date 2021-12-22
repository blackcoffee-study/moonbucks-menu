export const $ = (selector) => document.querySelector(selector)
export const $$ = (selector) => Array.prototype.slice.call(document.querySelectorAll(selector))