import store, { ADD_ESPRESSO_MENU, UPDATE_ESPRESSO_MENU, DELETE_ESPRESSO_MENU } from './reducer.js';

import validation, { isEmpty } from './validation/index.js';
import MenuList from './components/MenuList.js';

const $menuForm = document.querySelector('#espresso-menu-form');
const $menuInput = $menuForm.querySelector('input');
const $menuList = document.querySelector('#espresso-menu-list');
const $menuCount = document.querySelector('.menu-count');

const { check, error } = validation([isEmpty('메뉴를 입력해주세요.')]);

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
    type: ADD_ESPRESSO_MENU,
    data: { id, name},
  });
  $menuInput.value = '';
};

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
    type: UPDATE_ESPRESSO_MENU,
    data: { id, name: newName },
  });
}

export const removeMenu = (target) => {
  const { id } = target.parentNode.dataset;
  const result = confirm('정말 삭제하시나요?');
  if (result) {
    store.dispatch({
      type: DELETE_ESPRESSO_MENU,
      data: id,
    })
  }
};

export const render = () => {
  const { menuList } = store.getState();
  $menuCount.innerText = `총 ${menuList.length}개`;

  const template = menuList.map((menu) => MenuList(menu)).join('');
  $menuList.innerHTML = template;
};
