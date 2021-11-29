import CategoryClass from './CategoryClass.js';
import MoonbucksContentsClass from './MoonbucksContentsClass.js';
import MenuListClass from './MenuListClass.js';
import { domSelector, domSelectorAll } from '../utils/domSelect.js';
class App {
  constructor() {
    this.$app = domSelector('#app');
    this.$categoryArea = domSelector('header nav');
    this.$moonbucksContents = domSelector('main .wrapper');
    this.render();
  }

  render() {
    new CategoryClass({
      target: this.$categoryArea
    })

    new MoonbucksContentsClass({
      target: this.$moonbucksContents
    })

    new MenuListClass()
  }
}

new App();



// const $menuListItem = (name) => {
//   return `
//     <li class="menu-list-item d-flex items-center py-2">
//       <span class="w-100 pl-2 menu-name">${name}</span>
//       <button
//         type="button"
//         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
//       >
//         품절
//       </button>
//       <button
//         type="button"
//         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//       >
//         수정
//       </button>
//       <button
//         type="button"
//         class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//       >
//         삭제
//       </button>
//     </li>
//   `
// }

// const menuList = [];

// const $menuInputForm = domSelector('#espresso-menu-form');
// const $menuInput = domSelector('#espresso-menu-name');
// const $menuList = domSelector('#espresso-menu-list');
// const $menuCount = domSelector('.menu-count');
// const $submitBtn = domSelector('.input-submit');
// const $categoryWrap = domSelector('nav');
// const $heading = domSelector('.heading');

// $submitBtn.addEventListener('click', () => {
//   submit()
// })

// $menuInputForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   submit()
// })

// const submit = () => {
//   const value = $menuInput.value
//   if (value) {
//     menuList.push(value)
//     $menuInput.value = ''
//     renderList()
//   }
// }

// const renderCategory = () => {
//   $categoryWrap.innerHTML = menus.map(menu => (
//     `
      // <button
      //   data-category-name="${menu.category}"
      //   class="cafe-category-name btn bg-white shadow mx-1"
      // >
      //   ${menu.name}
      // </button>
//     `
//   )).join('')
// }

// const renderHeading = () => {
//   $heading
// }

// const renderList = () => {
//   const menuLists = menuList.map(menu => $menuListItem(menu)).join('');
//   $menuList.innerHTML = menuLists;
//   menuBtnEvent()
//   menuCount()
// }

// const menuCount = () => {
//   const count = menuList.length
//   $menuCount.innerText = `총 ${count}개`
// }

// const modifyMenu = (i) => {
//   const modifyValue = prompt('메뉴명을 수정하세요', menuList[i]);
//   if (modifyValue) {
//     menuList[i] = modifyValue
//     renderList()
//   }
// }

// const deleteMenu = (i) => {
//   const userAnswer = confirm('정말 삭제하시겠습니까?');
//   if (userAnswer) {
//     menuList.splice(i, 1);
//     renderList()
//   }
// }

// const menuBtnEvent = () => {
//   const menuList = domSelectorAll('.menu-list-item')
//   menuList.forEach((list, i) => list.addEventListener('click', (e) => {
//     const btnText = e.target.innerText;
//     if (btnText === "수정") modifyMenu(i)
//     if (btnText === "삭제") deleteMenu(i)
//   }))
// }

// renderCategory()
