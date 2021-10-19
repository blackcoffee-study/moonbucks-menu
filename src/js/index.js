import App from './pages/app.js';

const qs = (selector) => document.querySelector(selector);
const qsAll = (selector) => document.querySelectorAll(selector);

new App(
    qs('nav'),
    qs('form'),
    qs('.heading > h2'),
    qs('.heading > .menu-count'),
    qs('#espresso-menu-list'),
    qsAll('.cafe-category-name')
    );
