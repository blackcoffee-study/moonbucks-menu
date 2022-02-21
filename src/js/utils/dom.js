export const $ = (selector, $parentElement = document) =>
  $parentElement.querySelector(selector);

export const inputWrapper = ($input) => ({
  reset() {
    $input.value = '';
  },
  focus() {
    $input.focus();
  },
  get value() {
    return $input.value.trim();
  },
});

export const targetElementWrapper = ($target) => ({
  dataset(key) {
    return $target.dataset[key];
  },
  closest(key) {
    return $target.closest(key);
  },
});

export const innerText = (selector, $container = document) =>
  $container.querySelector(selector).innerText;

export const elementCreator = (tag, attribute = {}, innerText = '') => {
  const $el = document.createElement(tag);
  for (const key in attribute) {
    $el.setAttribute(key, attribute[key]);
  }
  $el.innerText = innerText;
  return $el;
};

export const getOuterHTML = ($el) => $el.outerHTML;
