export const isNodeNameButton = (nodeName) => nodeName === 'BUTTON';

export const isIncludesClass = (classList, className) =>
  classList.includes(className);

export const isEmptyInput = (text) => text.trim() === '';
