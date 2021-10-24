import MenuInput from './MenuInput.js';
import MenuAddButton from './MenuAddButton.js';
import MenuCount from './MenuCount.js';
import MenuList from './MenuList.js';
import MenuNavigation from './MenuNavigation.js';
import MenuCategoryTitle from './MenuCategoryTitle.js';
import { $, $all } from '../lib/utils.js';
import { LOCALSTORAGE_KEY } from '../lib/constant.js';
import { setLocalStorage, getLocalStorage } from '../lib/localstorage.js';
import { api } from '../api/api.js';

function App($target) {
  this.$ = $($target);
  this.$all = $all($target);
  this.state = {};

  this.init = async () => {
    const categories = this.$all('header button');
    const initialMenu = [];
    categories.forEach(
      (category) =>
        (initialMenu[category.attributes['data-category-name'].value] = [])
    );

    const nextCurrentCategory = 'espresso';
    const nextMenu = await this.onMenuList(nextCurrentCategory);

    const nextState = {
      menu: nextMenu,
      currentCategory: nextCurrentCategory,
    };

    this.setState(nextState);
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    this.menuList.setState(this.state);
    this.menuCount.setState(this.state);
    this.menuNavigation.setState(this.state);
    this.menuCategoryTitle.setState(this.state);
  };

  this.onSelectCategory = async (nextCategory) => {
    const nextMenu = await this.onMenuList(nextCategory);
    const nextState = {
      menu: nextMenu,
      currentCategory: nextCategory,
    };
    this.setState(nextState);
  };

  this.onMenuList = async (nextCurrentCategory) => {
    try {
      return await api.getMenu({ category: nextCurrentCategory });
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  this.onAddMenu = async (menu) => {
    try {
      const result = await api.addMenu({
        category: this.state.currentCategory,
        content: {
          name: menu,
        },
      });
      const nextState = {
        ...this.state,
        menu: [...this.state.menu, result],
      };
      this.setState(nextState);
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  this.onEditMenu = async (menuId) => {
    try {
      const editName = prompt('변경할 메뉴를 입력하세요');
      const resultMenu = await api.editMenuName({
        menuId: menuId,
        category: this.state.currentCategory,
        content: {
          name: editName,
        },
      });
      const nextState = {
        ...this.state,
        menu: this.state.menu.map((menu) =>
          menu.id === menuId ? resultMenu : menu
        ),
      };
      this.setState(nextState);
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  this.onSoldoutMenu = async (menuId) => {
    try {
      const resultMenu = await api.soldoutMenu({
        menuId: menuId,
        category: this.state.currentCategory,
      });
      const nextState = {
        ...this.state,
        menu: this.state.menu.map((menu) =>
          menu.id === menuId ? resultMenu : menu
        ),
      };
      this.setState(nextState);
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  this.onRemoveMenu = async (menuId) => {
    try {
      if (!confirm('선택한 메뉴를 삭제하시겠습니까?')) return;
      await api.deleteMenu({
        menuId: menuId,
        category: this.state.currentCategory,
      });
      const nextState = {
        ...this.state,
        menu: this.state.menu.filter((menu) => menu.id !== menuId),
      };
      this.setState(nextState);
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  this.menuCategoryTitle = new MenuCategoryTitle({
    $target: this.$('.heading h2'),
    state: this.state,
  });

  this.menuNavigation = new MenuNavigation({
    $target: this.$('nav'),
    state: this.state,
    onSelectCategory: this.onSelectCategory,
  });

  this.menuInput = new MenuInput({
    $target: this.$('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuAddButton = new MenuAddButton({
    $target: this.$('.input-submit'),
    $menuInput: this.$('.input-field'),
    onAddMenu: this.onAddMenu,
  });

  this.menuCount = new MenuCount({
    $target: this.$('.menu-count'),
    state: this.state,
  });

  this.menuList = new MenuList({
    $target: this.$('#menu-list'),
    state: this.state,
    onEditMenu: this.onEditMenu,
    onRemoveMenu: this.onRemoveMenu,
    onSoldoutMenu: this.onSoldoutMenu,
  });
}

export default App;
