import MenuInfo from './MenuInfo.js';
import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import CategoryNav from './CategoryNav.js';
import {
  getMenuData,
  addMenuData,
  editMenuData,
  setSoldOutData,
} from '../api/api.js';
import { DEFAULT_CATEGORY } from '../commons/constants.js';

export default function App($app) {
  this.$target = $app;

  this.state = {
    currentCategory: DEFAULT_CATEGORY,
    menus: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    menuList.setState(nextState.menus);
    menuInfo.setState(nextState);
    categoryNav.setState(nextState.currentCategory);
    console.log(this.state);
    // setLocalStorageData(MENU_STORAGE_KEY, nextState);
  };

  const categoryNav = new CategoryNav({
    initialState: this.state.currentCategory,
    changeCategory: async (newCategory) => {
      try {
        const data = await getMenuData(newCategory);
        this.setState({
          ...this.state,
          currentCategory: newCategory,
          menus: data,
        });
      } catch (e) {
        alert(e);
      }
    },
  });

  const menuInfo = new MenuInfo({
    initialState: this.state,
  });

  const menuInput = new MenuInput({
    addMenu: async (newMenu) => {
      try {
        const data = await addMenuData(this.state.currentCategory, newMenu);
        this.setState({
          ...this.state,
          menus: [
            ...this.state.menus,
            { id: data.id, name: newMenu, isSoldOut: false },
          ],
        });
      } catch (e) {
        alert(e);
      }
    },
  });

  const menuList = new MenuList({
    initialState: this.state.menus,
    toggleSoldOut: (id) => {
      setSoldOutData(this.state.currentCategory, id);
      this.setState({
        ...this.state,
        menus: this.state.menus.map((menu) =>
          menu.id === id ? { ...menu, isSoldOut: !menu.isSoldOut } : menu
        ),
      });
    },
    editMenu: (id, editedMenu) => {
      editMenuData(this.state.currentCategory, id, editedMenu);
      const nextMenu = [...this.state.menus];
      const editIndex = nextMenu.findIndex((menu) => menu.id === id);
      nextMenu.splice(editIndex, 1, {
        id: nextMenu[editIndex].id,
        name: editedMenu,
        isSoldOut: nextMenu[editIndex].isSoldOut,
      });
      this.setState({ ...this.state, menus: nextMenu });
    },
    removeMenu: (id) => {
      this.setState({
        ...this.state,
        menus: this.state.menus.filter((menu) => menu.id !== id),
      });
    },
  });

  this.init = async () => {
    try {
      const data = await getMenuData(DEFAULT_CATEGORY);
      this.setState({
        currentCategory: DEFAULT_CATEGORY,
        menus: data,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  this.init();
}
