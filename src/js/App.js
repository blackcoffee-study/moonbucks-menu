import MenuForm from './component/MenuForm.js';
import MenuHeader from './component/MenuHeader.js';
import MenuList from './component/MenuList.js';
import Navigator from './component/Navigator.js';
import { $ } from './lib/utils.js';
import store from './store/store.js';
import api from './lib/api.js';

export default function App($target) {
  this.$ = $($target);
  this.state = {
    categoryName: 'espresso',
    menuItems: [],
  };

  this.init = () => {
    this.navigator = new Navigator(this.$('nav'), { onClick: setCategoryName });
    this.menuHeader = new MenuHeader(this.$('div.heading'));
    this.menuForm = new MenuForm(this.$('#espresso-menu-form'), {
      onSubmit: addMenu,
    });
    this.menuList = new MenuList(this.$('#espresso-menu-list'), {
      onEdit: editMenu,
      onRemove: removeMenu,
      onSoldOut: soldOutMenu,
    });
    getMenuItems('espresso');
  };

  const getMenuItems = async categoryName => {
    const menuItems = await store.fetchMenuItems(categoryName);
    this.setState({
      categoryName,
      menuItems,
    });
  };

  this.setState = state => {
    this.state = state;
    this.menuHeader.setState(state);
    this.menuList.setState(state);
  };

  const setCategoryName = categoryName => {
    getMenuItems(categoryName);
  };

  const addMenu = async menuName => {
    await api.CREATE_MENU(this.state.categoryName, menuName);
    getMenuItems(this.state.categoryName);
  };

  const editMenu = async (menuName, newName) => {
    const id = this.state.menuItems.find(el => el.name === menuName).id;
    await api.EDIT_MENU(this.state.categoryName, id, newName);
    getMenuItems(this.state.categoryName);
  };

  const removeMenu = async menuName => {
    const id = this.state.menuItems.find(el => el.name === menuName).id;
    await api.DELETE_MENU(this.state.categoryName, id);
    getMenuItems(this.state.categoryName);
  };

  const soldOutMenu = async menuName => {
    const id = this.state.menuItems.find(el => el.name === menuName).id;
    await api.SOLD_OUT_MENU(this.state.categoryName, id);
    getMenuItems(this.state.categoryName);
  };
}
