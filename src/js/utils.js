
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const getRandomID = () => Math.random().toString(36).substr(2,12);


export {$, $$, getRandomID}


