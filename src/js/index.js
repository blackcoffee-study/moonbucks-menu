import Menu from './components/Menu.js';
import MenuCategory from './components/MenuCategory.js';
import { CATEGORY_LIST } from './constant/index.js';
import { Router } from './Router.js';

const menuCategory = new MenuCategory('menu-category');

const router = new Router();

CATEGORY_LIST.forEach((category) => {
  const menu = new Menu('espresso-menu-list', category.id);
  router.addRoutePath(category.id, menu);

  if (category.id === 'espresso') {
    router.setDefaultPage(menu);
  }
});

router.route();
