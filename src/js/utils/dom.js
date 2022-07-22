export const $ = (selector) => document.querySelector(selector);

export const $all = (selector) => document.querySelectorAll(selector);

export const createCustomElement = (el, name) => {
  const customElement = document.createElement(el);
  customElement.className = name;
  return customElement;
};

export const createCustomButton = (names, event, text) => {
  const customButton = document.createElement("button");
  customButton.className = "bg-gray-50 text-gray-500 text-sm";
  names.forEach((name) => customButton.classList.add(name));
  customButton.onclick = event;
  customButton.appendChild(document.createTextNode(text));
  return customButton;
};
