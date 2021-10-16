import MenuForm from './component/MenuForm.js';
import MenuHeader from './component/MenuHeader.js';
import MenuList from './component/MenuList.js';
import Navigator from './component/Navigator.js';
import { $ } from './lib/utils.js';

export default function App($target) {
  this.$ = $($target);
  this.state = {
    categoryName: 'espresso',
    menuList: [],
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
    });
  };

  this.setState = state => {
    this.state = state;
    this.menuHeader.setState(state);
    this.menuList.setState(state);
  };

  const setCategoryName = name => {
    // NOTE: 그냥 setState 함수 만들어놓고, 거따가 name 파라미터로 넘겨줘도 될듯
    this.state.categoryName = name;
    this.setState(this.state);
  };

  const addMenu = menuName => {
    // TODO: state 상태 확인하기 위해 불변성 넣어야하지않나?
    this.state.menuList.push(menuName);
    this.setState(this.state);
  };

  const editMenu = (menuName, newName) => {
    this.state.menuList = this.state.menuList.map(el =>
      el === menuName ? newName : el,
    );
    this.setState(this.state);
  };

  const removeMenu = menuName => {
    this.state.menuList = this.state.menuList.filter(el => el !== menuName);
    this.setState(this.state);
  };
}
