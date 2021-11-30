import { $, makeMenuTemplate, getMenuId, setLocalStorage, getLocalStorage } from './utils.js';

function CoffeeMenuApp() {
  this.category = 'espresso';
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.init = function () {
    const localMenu = getLocalStorage('menu');

    if (localMenu) {
      this.menu = localMenu;
    } else {
      setLocalStorage('menu', this.menu);
    }
    this.render();
  };

  this.render = function () {
    const $ul = $('#menu-list');
    while ($ul.hasChildNodes()) {
      $ul.removeChild($ul.firstChild);
    }

    if (this.menu[this.category].length) {
      const menuList = this.menu[this.category].map((elem, idx) => makeMenuTemplate(elem, idx)).join('');
      $('#menu-list').insertAdjacentHTML('beforeend', menuList);
    }
    this.updateTotalCount();
  };

  this.updateCategory = function (target) {
    this.category = target.dataset.categoryName;
    $('.menu-title').innerText = `${target.innerText} 메뉴 관리`;
    this.render();
  };

  this.makeNewMenu = function () {
    const $newMenu = $('#menu-name');

    if ($newMenu.value.trim().length) {
      const newMenuObj = { name: $newMenu.value, soldOut: false };
      this.menu[this.category].push(newMenuObj);
      setLocalStorage('menu', this.menu);
      this.render();
    } else {
      alert('메뉴명이 입력되지 않았습니다.');
    }
    $newMenu.value = '';
  };

  this.editMenuName = function (target) {
    const $li = target.closest('li');
    const $targetMenuName = $li.querySelector('.menu-name');
    const editedMenuName = prompt('메뉴명을 수정해주세요.', $targetMenuName.innerText);

    if (editedMenuName.trim().length) {
      this.menu[this.category]
        .filter((elem, idx) => getMenuId($li) === idx)
        .map((elem) => (elem.name = editedMenuName));
      setLocalStorage('menu', this.menu);
      $targetMenuName.innerText = editedMenuName;
    } else {
      alert('메뉴명이 입력되지 않았습니다.');
    }
  };

  this.removeMenuName = function (target) {
    const $li = target.closest('li');
    if (confirm('정말 삭제하시겠습니까?')) {
      this.menu[this.category].splice(getMenuId($li), 1);
      setLocalStorage('menu', this.menu);
      this.render();
    }
  };

  this.updateMenuSoldOut = function (target) {
    const $li = target.closest('li');
    this.menu[this.category]
      .filter((elem, idx) => getMenuId($li) === idx)
      .map((elem) => (elem.soldOut = !elem.soldOut));
    setLocalStorage('menu', this.menu);
    this.render();
  };

  this.updateTotalCount = function () {
    $('.menu-count').innerText = `총 ${this.menu[this.category].length}개`;
  };

  $('#menu-list').addEventListener('click', ({ target }) => {
    if (target.classList.contains('menu-edit-button')) {
      this.editMenuName(target);
    }
    if (target.classList.contains('menu-remove-button')) {
      this.removeMenuName(target);
    }
    if (target.classList.contains('menu-sold-out-button')) {
      this.updateMenuSoldOut(target);
    }
  });

  $('#menu-submit-button').addEventListener('click', ({ target }) => {
    this.makeNewMenu();
  });

  $('nav').addEventListener('click', ({ target }) => {
    if (target.classList.contains('cafe-category-name')) {
      this.updateCategory(target);
    }
  });

  $('#menu-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      this.makeNewMenu();
    }
  });

  $('#menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

new CoffeeMenuApp().init();
