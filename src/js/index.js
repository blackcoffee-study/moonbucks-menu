import App from './pages/app.js';

import {qs} from './pages/utils.js';

new App({
    nav: qs('nav'),
    form: qs('#espresso-menu-form'),
    input: qs('#espresso-menu-name'),
    category: qs('.heading > h2'),
    count: qs('.heading > .menu-count'),
    menuList: qs('#espresso-menu-list')
});
