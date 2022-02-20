const $ = (selector, doc=document) => doc.querySelector(selector);
const $All = (selector, doc=document) => doc.querySelectorAll(selector);

export { $, $All };
