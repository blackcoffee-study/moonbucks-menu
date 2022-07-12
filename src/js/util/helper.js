export const $ = (selector, el = document) => {
  return el.querySelector(selector);
};

export const createElement = (template) => {
  const $el = document.createElement("template");
  $el.insertAdjacentHTML("afterbegin", template);
  return $el.firstChild.cloneNode(true);
};

export const dispatchCustomEvent = (name, detail, target = window) => {
  target.dispatchEvent(new CustomEvent(name, { detail }));
};

export const addCustomEventListener = (name, callback, target = window) => {
  target.addEventListener(name, ({ detail }) => callback(detail));
};
