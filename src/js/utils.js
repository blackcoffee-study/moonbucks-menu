import store, { ADD_MENU_ITEM, DELETE_MENU_ITEM, UPDATE_CAFE_CATEGORY, UPDATE_MENU_ITEM, UPDATE_MENU_SOLDOUT } from './reducer.js';

import validation, { isEmpty } from './validation/index.js';
import MenuList from './components/MenuList.js';

const $header = document.querySelector('.heading');
const $menuName = document.querySelector('#menu-name');

const $menuForm = document.querySelector('#menu-form');
const $menuLabel = $menuForm.querySelector('[for="menu-name"]');
const $menuInput = $menuForm.querySelector('input');
const $menuList = document.querySelector('#menu-list');
const $menuCount = document.querySelector('.menu-count');

const { check, error } = validation([isEmpty('메뉴를 입력해주세요.')]);

export const updateMenuCategory = ({ target }) => {
  const { categoryName } = target.dataset;
  const button = document.querySelector(`[data-category-name="${categoryName}"]`);
  console.log(document.querySelector('[for="menu-name"]'));

  const menuList = getLocalStorage(categoryName);
  store.dispatch({
    type: UPDATE_CAFE_CATEGORY,
    data: { categoryName, menuList },
  });
  categoryRender(button.innerText, categoryName);
};

export const addMenu = (e) => {
  e.preventDefault();

  const name = $menuInput.value;
  if (!check(name)) {
    error().then(() => {
      $menuInput.focus();
    });
    return
  }

  // random id 생성
  const id = Math.floor(new Date().valueOf() * Math.random()).toString();

  store.dispatch({
    type: ADD_MENU_ITEM,
    data: { id, name, soldout: false},
  });

  const { category, menuList } = store.getState();
  setLocalStorage(category, menuList);

  $menuInput.value = '';
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const updateMenu = (target) => {
  const { id } = target.parentNode.dataset;
  const newName = prompt('메뉴를 입력해주세요.');

  if (!check(newName)) {
    error().then(() => {
      $menuInput.focus();
    });
    return
  }
  store.dispatch({
    type: UPDATE_MENU_ITEM,
    data: { id, name: newName },
  });
}

export const removeMenu = (target) => {
  const { id } = target.parentNode.dataset;
  const result = confirm('정말 삭제하시나요?');
  if (result) {
    store.dispatch({
      type: DELETE_MENU_ITEM,
      data: id,
    })
  }
};

export const soldoutMenu = (target) => {
  const { id } = target.parentNode.dataset;
  store.dispatch({
    type: UPDATE_MENU_SOLDOUT,
    data: id,
  });
  // 상태 변한거 localStorage에 저장해야함
}

export const categoryRender = (title, categoryName) => {
  const $title = $header.querySelector('h2');
  console.log($menuName);
  $title.textContent = `${title} 메뉴 관리`;
  $menuName.setAttribute('placeholder', `${categoryName} 메뉴 이름`);
  $menuLabel.textContent = `${categoryName} 메뉴 이름`;
}

export const menuRender = () => {
  const { menuList } = store.getState();
  $menuCount.innerText = `총 ${menuList.length}개`;

  const template = menuList.map((menu) => MenuList(menu)).join('');
  $menuList.innerHTML = template;
};
