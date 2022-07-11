import App from './App.js';
import { $ } from './utils/dom.js';
import { menuApi } from './utils/api.js';
import { INITIAL_RENDERING_MENU } from './constants/constants.js';

window.addEventListener('DOMContentLoaded', async () => {
  new App($('#app'), {
    menu: await menuApi.getMenuListByCategory(INITIAL_RENDERING_MENU),
    category: INITIAL_RENDERING_MENU,
  });
});
