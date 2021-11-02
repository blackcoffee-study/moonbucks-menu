import App from './pages/app.js';

const qs = (selector) => document.querySelector(selector);
const qsAll = (selector) => document.querySelectorAll(selector);

new App({
    nav: qs('nav'),
    input: qs('input'),
    category: qs('.heading > h2'),
    count: qs('.heading > .menu-count'),
    menuList: qs('#espresso-menu-list')
});
