import MenuInfo from './MenuInfo.js';
import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import CategoryNav from './CategoryNav.js';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../utils/localStorage.js';
import { MENU_STORAGE_KEY, DEFAULT_CATEGORY } from '../commons/constants.js';

export default function App($app) {
  this.$target = $app;

  if (getLocalStorageData(MENU_STORAGE_KEY) === []) {
    this.state = {
      currentCategory: DEFAULT_CATEGORY,
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      dessert: [],
    };
  } else {
    this.state = getLocalStorageData(MENU_STORAGE_KEY);
  }

  this.setState = (nextState) => {
    this.state = nextState;
    menuList.setState(nextState);
    menuInfo.setState(nextState);
    categoryNav.setState(nextState.currentCategory);
    setLocalStorageData(MENU_STORAGE_KEY, nextState);
  };

  const categoryNav = new CategoryNav({
    initialState: this.state.currentCategory,
    changeCategory: (newCategory) => {
      this.setState({ ...this.state, currentCategory: newCategory });
    },
  });

  const menuInfo = new MenuInfo({
    initialState: this.state,
  });

  const menuInput = new MenuInput({
    addMenu: (newMenu) => {
      this.setState({
        ...this.state,
        [this.state.currentCategory]: [
          ...this.state[this.state.currentCategory],
          { isSoldOut: false, name: newMenu },
        ],
      });
    },
  });

  const menuList = new MenuList({
    initialState: this.state,
    toggleSoldOut: (currentIndex) => {
      this.setState({
        ...this.state,
        [this.state.currentCategory]: this.state[
          this.state.currentCategory
        ].map((menu, index) =>
          index === currentIndex
            ? { ...menu, isSoldOut: !menu.isSoldOut }
            : menu
        ),
      });
    },
    editMenu: (index, editedMenu) => {
      const nextMenu = [...this.state[this.state.currentCategory]];
      nextMenu.splice(index, 1, editedMenu);
      this.setState({ ...this.state, [this.state.currentCategory]: nextMenu });
    },
    removeMenu: (currentIndex) => {
      this.setState({
        ...this.state,
        [this.state.currentCategory]: this.state[
          this.state.currentCategory
        ].filter((_, index) => index !== currentIndex),
      });
    },
  });
}
