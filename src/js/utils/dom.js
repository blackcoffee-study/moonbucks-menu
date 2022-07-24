// @ts-check
/**
 * @template {Element} T
 * @param {string} selector
 * @returns {T}
 */
export function select(selector) {
  /** @type {T | null} */
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`No element found for selector: ${selector}`);
  }
  return element;
}
