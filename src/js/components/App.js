import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import Count from './Count.js';
import { $ } from '../utils/dom.js';
import { UPDATE_MSG, DELETE_MSG } from '../constants/index.js';
import { store } from '../store/index.js';

function App() {
  let menuId = 0;
  let currentCategory = 'espresso';
  let menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  const count = new Count();
  const menuList = new MenuList();

  this.init = () => {
    if (localStorage.getItem('menu')) menu = store.getItem();
    this.render();
    initEventListeners();
  };

  this.render = () => {
    menuList.render(menu[currentCategory]);
    count.updateCount({ menuCount: menu[currentCategory].length });
  };

  this.setState = updatedMenuList => {
    menu = updatedMenuList;
    store.setItem(menu);
    this.render();
  };

  const onAdd = name => {
    this.setState({ ...menu, [currentCategory]: [...menu[currentCategory], { name, id: menuId++ }] });
  };

  const onUpdate = id => {
    const name = window.prompt(UPDATE_MSG);
    if (!name) return;

    const updated = menu[currentCategory].map(el => (el.id * 1 === id * 1 ? { ...el, name } : el));
    this.setState({ ...menu, [currentCategory]: updated });
  };

  const onDelete = id => {
    const result = window.confirm(DELETE_MSG);
    if (!result) return;

    const deletedList = menu[currentCategory].filter(el => el.id * 1 !== id * 1);
    this.setState({ ...menu, [currentCategory]: deletedList });
  };

  const onSoldOut = id => {
    const soldOutEl = menu[currentCategory].map(el => (el.id * 1 === id * 1 ? { ...el, soldOut: !el.soldOut } : el));
    this.setState({ ...menu, [currentCategory]: soldOutEl });
  };

  new MenuInput({ onAdd });

  const initEventListeners = () => {
    $('#menu-list').addEventListener('click', e => {
      const menuId = e.target.parentNode.dataset.menuId;
      if (e.target.classList.contains('menu-edit-button')) {
        onUpdate(menuId);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        onDelete(menuId);
        return;
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        onSoldOut(menuId);
        return;
      }
    });

    $('nav').addEventListener('click', e => {
      if (e.target.classList.contains('cafe-category-name')) {
        currentCategory = e.target.dataset.categoryName;
        this.render();
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      }
    });
  };
  }

export default App;
