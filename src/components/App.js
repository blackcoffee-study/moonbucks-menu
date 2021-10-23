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
    const nextMenu = await this.getMenuList(nextCurrentCategory);

    const nextState = {
      menu: nextMenu,
      currentCategory: nextCurrentCategory,
    };

    this.setState(nextState);
    console.log(this.state);
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    this.menuList.setState(this.state);
    this.menuCount.setState(this.state);
    this.menuNavigation.setState(this.state);
    this.menuCategoryTitle.setState(this.state);
  };

  this.onSelectCategory = async (nextCategory) => {
    const nextMenu = await this.getMenuList(nextCategory);
    const nextState = {
      menu: nextMenu,
      currentCategory: nextCategory,
    };
    this.setState(nextState);
  };

  this.getMenuList = async (nextCurrentCategory) => {
    try {
      return await api.getMenu(nextCurrentCategory);
    } catch (e) {
      alert(`[${e.name}] : 메뉴 조회 시 에러가 발생하였습니다.`);
    }
  };

  this.onAddMenu = (menu) => {
    const newMenuItem = {
      id: String(new Date()).replaceAll(' ', ''),
      name: menu,
      isSoldOut: false,
    };
    const nextState = {
      ...this.state,
      menu: {
        ...this.state.menu,
        [this.state.currentCategory]: [
          ...this.state.menu[this.state.currentCategory],
          newMenuItem,
        ],
      },
    };
    this.setState(nextState);
  };

  this.onEditMenu = (menuId) => {
    const editName = prompt('변경할 메뉴를 입력하세요');
    const nextState = {
      ...this.state,
      menu: {
        ...this.state.menu,
        [this.state.currentCategory]: this.state.menu[
          this.state.currentCategory
        ].map((menu) =>
          menu.id === menuId
            ? {
                ...menu,
                name: editName,
              }
            : menu
        ),
      },
    };
    this.setState(nextState);
  };

  this.onSoldoutMenu = (menuId) => {
    const nextState = {
      ...this.state,
      menu: {
        ...this.state.menu,
        [this.state.currentCategory]: this.state.menu[
          this.state.currentCategory
        ].map((menu) =>
          menu.id === menuId
            ? {
                ...menu,
                isSoldOut: !menu.isSoldOut,
              }
            : menu
        ),
      },
    };
    this.setState(nextState);
  };

  this.onRemoveMenu = (menuId) => {
    if (confirm('선택한 메뉴를 삭제하시겠습니까?')) {
      const nextState = {
        ...this.state,
        menu: {
          ...this.state.menu,
          [this.state.currentCategory]: this.state.menu[
            this.state.currentCategory
          ].filter((menu) => menu.id !== menuId),
        },
      };
      this.setState(nextState);
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
