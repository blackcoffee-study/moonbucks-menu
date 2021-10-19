export const $ = (selector, $target = document) =>
    $target.querySelector(selector);

export const createElement = (element, $target = document) =>
    $target.createElement(element);
