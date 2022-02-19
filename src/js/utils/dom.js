export const qsCurry =
  ($parentElement = document) =>
  (selector) =>
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
