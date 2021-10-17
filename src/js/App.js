import MenuForm from './component/MenuForm.js';
import MenuHeader from './component/MenuHeader.js';
import MenuList from './component/MenuList.js';
import Navigator from './component/Navigator.js';
import { $ } from './lib/utils.js';
import store from './store/store.js';

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

    this.setState({
      ...this.state,
      menuItems: store.getLocalStorage()[this.state.categoryName],
    });
  };

  this.setState = state => {
    this.state = state;
    this.menuHeader.setState(state);
    this.menuList.setState(state);
    store.setLocalStorage(state.categoryName, state.menuItems);
  };

  const setCategoryName = name => {
    const state = {
      categoryName: name,
      menuItems: store.menuItems[name],
    };
    this.setState(state);
  };

  const addMenu = menuName => {
    const menuItems = [...this.state.menuItems, new MenuItem(menuName)];
    this.setState({ ...this.state, menuItems });
  };

  const editMenu = (menuName, newName) => {
    const menuItems = this.state.menuItems.map(el =>
      el.name === menuName ? new MenuItem(newName) : el,
    );
    this.setState({ ...this.state, menuItems });
  };

  const removeMenu = menuName => {
    const menuItems = this.state.menuItems.filter(el => el.name !== menuName);
    this.setState({ ...this.state, menuItems });
  };

  const soldOutMenu = menuName => {
    const menuItems = this.state.menuItems.map(el =>
      el.name === menuName ? new MenuItem(menuName, !el.soldOut) : el,
    );
    this.setState({ ...this.state, menuItems });
  };
}

const MenuItem = function (name, soldOut = false) {
  this.name = name;
  this.soldOut = soldOut;
};
