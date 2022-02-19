export const $ = <T extends HTMLElement = HTMLDivElement>(selector: string) => {
  const element = document.querySelector(selector);
  return element as T;
};
