export const $ = (selector, $target = document) =>
    $target.querySelector(selector);

export const $all = (selector, $target = document) =>
    $target.querySelectorAll(selector);

export const createElement = (element, $target = document) =>
    $target.createElement(element);
