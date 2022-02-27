import store from "../../reducer.js";
import validation, { isEmpty } from '../../validation/index.js';

import { ADD_MENU_ITEM,
  DELETE_MENU_ITEM,
  LOAD_MENU_LIST,
  UPDATE_MENU_ITEM,
  UPDATE_MENU_SOLDOUT } from '../constants.js';

import { getStorage } from '../../store/localStorage.config.js';

const $menuForm = document.querySelector('#menu-form');
const $menuInput = $menuForm.querySelector('input');

const { check, error } = validation([isEmpty('메뉴를 입력해주세요.')]);

export const init = (category) => {
  const menuList = getStorage(category);

  store.dispatch({
    type: LOAD_MENU_LIST,
    data: menuList,
  });
}

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

  $menuInput.value = '';
};

export const updateMenu = (target) => {
  const { id } = target.parentNode.dataset;
  const newName = prompt('메뉴를 입력해주세요.');

  if (!check(newName)) {
    error();
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
    });
  }
};

export const updateSoldout = (target) => {
  const { id } = target.parentNode.dataset;
  store.dispatch({
    type: UPDATE_MENU_SOLDOUT,
    data: id,
  });
}
