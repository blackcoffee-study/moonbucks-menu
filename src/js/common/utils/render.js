import store from '../../reducer.js';

import MenuList from "../../components/MenuList.js";

const $header = document.querySelector('.heading');
const $title = $header.querySelector('h2');
const $menuName = document.querySelector('#menu-name');

const $menuForm = document.querySelector('#menu-form');
const $menuLabel = $menuForm.querySelector('[for="menu-name"]');
const $menuList = document.querySelector('#menu-list');
const $menuCount = document.querySelector('.menu-count');

export const categoryRender = (title, category) => {
  $title.textContent = title;
  $menuName.setAttribute('placeholder', `${category} 메뉴 이름`);
  $menuLabel.textContent = `${category} 메뉴 이름`;
}

export const menuRender = () => {
  const { menuList } = store.getState();
  $menuCount.innerText = `총 ${menuList.length}개`;

  const template = menuList.map((menu) => MenuList(menu)).join('');
  $menuList.innerHTML = template;
};
