import App from './pages/app.js';

const qs = (selector) => document.querySelector(selector);
new App(
    qs('main'),
    qs('.menu-count'),
    qs('#espresso-menu-list')
    );