import { menuListRender } from './elements.js';
import { $, $All } from './common.js';
import { TEXT } from './text.js';

const menuNameElement = $('#espresso-menu-name');
const menuListUlElement = $('#espresso-menu-list');
const menuCountElement = $('.menu-count');
const menuListHeaderElement = $('.menu-list-header');

//메뉴 추가
function addMenu(currentMenuType) {
	let menuName = menuNameElement.value;
  let menuList = JSON.parse(localStorage.getItem(currentMenuType)) || [];

	if(menuName && menuName !== '') {
    document.querySelector('#espresso-menu-name').value = '';
    menuList.push({'name': menuName, 'isSoldOut' : false});
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    menuListRender(currentMenuType);
    //커피 개수 증가
    changeCountMenu();
  }
}

//메뉴 수정
function editMenu(currentMenuType, menuListLiElement) {
  const menuNameElement = menuListLiElement.querySelector('.menu-name');
  let menuList = JSON.parse(localStorage.getItem(currentMenuType));
  let oldMenuName = menuNameElement.innerText;
  let newMenuName = prompt(`수정하실 메뉴이름을 입력하세요`);

  if(newMenuName !== '') {
    let oldMenuNameIndex = menuList.findIndex(menu => menu.name === oldMenuName);
    menuList[oldMenuNameIndex].name = newMenuName;
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    menuNameElement.innerText = newMenuName;
  }
}

//메뉴 삭제
function removeMenu(currentMenuType, menuListLiElement) {
  const menuNameElement = menuListLiElement.querySelector('.menu-name');
  let menuList = JSON.parse(localStorage.getItem(currentMenuType));
  const selectedMenuName = menuNameElement.innerText;
  const message = '해당 메뉴를 삭제하시겠습니까?';

  if(confirm(message)) {
    menuList = menuList.filter(menu => menu.name !== selectedMenuName);
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    menuListUlElement.removeChild(menuListLiElement);
  }
  changeCountMenu();
}

//메뉴 품절 관리
function setSoldOutMenu(currentMenuType, menuListLiElement) {
  const menuNameElement = menuListLiElement.querySelector('.menu-name');
  const soldOutElement = menuListLiElement.querySelector('.menu-sold-out-button');
  let menuList = JSON.parse(localStorage.getItem(currentMenuType));
  let selectedMenuName = menuNameElement.innerText;
  let selectedMenuNameIndex = menuList.findIndex(menu => menu.name === selectedMenuName);

  if(!soldOutElement) return;
  
  if(soldOutElement.classList.contains('sold-out')) {
    menuList[selectedMenuNameIndex].isSoldOut = false;
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    soldOutElement.classList.remove('sold-out');
  } else {
    menuList[selectedMenuNameIndex].isSoldOut = true;
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    soldOutElement.classList.add('sold-out');
  }
}

//메뉴 개수 관리
function changeCountMenu() {
  const menuListElement = $('#espresso-menu-list');
  const menuCount =  $All('li', menuListElement).length;
  menuCountElement.innerHTML = `총 ${menuCount}개`;
}

//메뉴리스트 헤더명 관리
function changeMenuListHeader(currentMenuType) {
  menuListHeaderElement.innerHTML = TEXT.menuListHeader[currentMenuType];
}

export { addMenu, editMenu, removeMenu, setSoldOutMenu, changeCountMenu, changeMenuListHeader };
