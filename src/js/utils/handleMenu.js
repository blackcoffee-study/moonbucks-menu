import { menuListRender } from './elements.js';
import { $ } from './common.js';
import { TEXT } from './text.js';

const menuNameTag = $('#espresso-menu-name');
const menuListUlTag = $('#espresso-menu-list');
const menuCountTag = $('.menu-count');
const menuListHeaderTag = $('.menu-list-header');

//메뉴 추가
function addMenu(currentMenuType) {
	let menuName = menuNameTag.value;
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
function editMenu(currentMenuType, menuListLiTag) {
  const menuNameTag = menuListLiTag.querySelector('.menu-name');
  let menuList = JSON.parse(localStorage.getItem(currentMenuType));
  let oldMenuName = menuNameTag.innerText;
  let newMenuName = prompt(`수정하실 메뉴이름을 입력하세요`);

  if(newMenuName !== '') {
    let oldMenuNameIndex = menuList.findIndex(menu => menu.name === oldMenuName);
    menuList[oldMenuNameIndex].name = newMenuName;
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    menuNameTag.innerText = newMenuName;
  }
}

//메뉴 삭제
function removeMenu(currentMenuType, menuListLiTag) {
  const menuNameTag = menuListLiTag.querySelector('.menu-name');
  let menuList = JSON.parse(localStorage.getItem(currentMenuType));
  const selectedMenuName = menuNameTag.innerText;
  const message = '해당 메뉴를 삭제하시겠습니까?';

  if(confirm(message)) {
    menuList = menuList.filter(menu => menu.name !== selectedMenuName);
    localStorage.setItem(currentMenuType, JSON.stringify(menuList));
    menuListUlTag.removeChild(menuListLiTag);
  }
  changeCountMenu();
}

//메뉴 품절 관리
function setSoldOutMenu(menuListLiTag) {
  const soldOutTag = menuListLiTag.querySelector('.menu-sold-out-button');
  if(!soldOutTag) return;
  
  if(soldOutTag.classList.contains('sold-out')) {
    soldOutTag.classList.remove('sold-out');
  } else {
    soldOutTag.classList.add('sold-out');
  }
}

function changeCountMenu() {
  const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
  menuCountTag.innerHTML = `총 ${menuCount}개`;
}

//메뉴리스트 헤더명 관리
function changeMenuListHeader(currentMenuType) {
  menuListHeaderTag.innerHTML = TEXT.menuListHeader[currentMenuType];
}

export { addMenu, editMenu, removeMenu, setSoldOutMenu, changeMenuListHeader };