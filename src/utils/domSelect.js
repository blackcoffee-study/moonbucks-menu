export const domSelector = (selector) => {
  return document.querySelector(selector)
}
export const domSelectorAll = (selector) => {
  return [...document.querySelectorAll(selector)]
}