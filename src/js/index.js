import { $ } from './util/dom.js';
import { renderMenuItem } from './render/render.js';
const BASE_URL = 'http://localhost:3000/api';

const menuApi = {
  async addMenu(category, menuName) {
    await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: menuName }),
    });
  },

  async getAllMenuForCategory(category, menu) {
    await fetch(`${BASE_URL}/category/${category}/menu`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        menu[category] = data;
      });
  },

  // 400 오류 발생 중...
  async updateMenu(category, menuName, menuId) {
    await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: menuName }),
    });
    if (!response.ok) {
      window.alert('에러가 발생했습니다.');
    }
    return response.json();
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.menu.categoryName = '';

  const addMenu = async () => {
    const menuName = $('#espresso-menu-name').value;
    if (menuName === '') {
      return;
    }
    let isSoldOut = false;
    this.menu[this.menu.categoryName].push({
      name: menuName,
      isSoldOut,
    });
    await menuApi.addMenu(this.menu.categoryName, menuName);
    renderMenuItem(this.menu, this.menu.categoryName);
  };

  const updateMenu = async e => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const menuId = e.target.closest('li').dataset.menuId;
    const updatedMenuName = window.prompt(
      '메뉴를 수정하세요',
      $menuName.innerHTML,
    );
    if (updatedMenuName === null) {
      return;
    }
    await menuApi.updateMenu(this.menu.categoryName, $menuName, menuId);
    this.menu[this.menu.categoryName][menuId].name = updatedMenuName;
    $menuName.innerHTML = updatedMenuName;
    renderMenuItem(this.menu, this.menu.categoryName);
  };

  const removeMenu = e => {
    const removedMenu = window.confirm('메뉴를 삭제하시겠습니까?');
    if (removedMenu) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.menu.categoryName].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest('li').remove();
      renderMenuItem(this.menu, this.menu.categoryName);
    }
  };

  const soldOutMenu = e => {
    e.target
      .closest('li')
      .querySelector('.menu-name')
      .classList.toggle('sold-out');
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.menu.categoryName][menuId].isSoldOut = this.menu[
      this.menu.categoryName
    ][menuId].isSoldOut
      ? false
      : true;
    //store.setLocalStorage(this.menu);
  };

  const initEventListeners = () => {
    $('#espresso-menu-form').addEventListener('submit', function (e) {
      e.preventDefault();
      addMenu();
    });
    $('#espresso-menu-list').addEventListener('click', function (e) {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenu(e);
      }
      if (e.target.classList.contains('menu-remove-button')) {
        removeMenu(e);
      }
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
      }
    });
    $('.cafe-category').addEventListener('click', function (e) {
      app.ChangeCategoryName(e);
    });
  };

  this.ChangeCategoryName = async e => {
    if (e.target.classList.contains('cafe-category-name')) {
      this.menu.categoryName = e.target.dataset.categoryName;
      $('#cafe-category-title').innerHTML = `${e.target.innerHTML} 메뉴 관리`;
      await menuApi.getAllMenuForCategory(this.menu.categoryName, this.menu);
      renderMenuItem(this.menu, this.menu.categoryName);
    }
  };

  this.init = async () => {
    this.menu.categoryName = 'espresso';
    await menuApi.getAllMenuForCategory(this.menu.categoryName, this.menu);
    renderMenuItem(this.menu, this.menu.categoryName);
    initEventListeners();
  };
}

const app = new App();
app.init();
