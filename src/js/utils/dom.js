export function $(selector) {
  const element = document.querySelector(selector);
  if (element === null) throw new Error('element is null');
  return element;
}
