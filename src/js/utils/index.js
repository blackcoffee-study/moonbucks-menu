export const $ = (selector, $target = document) =>
  $target.querySelector(selector);

export const stopInitEvents = (e) => {
  e.preventDefault();
};

export const getIsTargetContainsClass = (e, className) =>
  e.target.classList.contains(className);
