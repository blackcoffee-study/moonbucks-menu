import addNewItem from './addNewItem.js';
import manageMenuItem from './manageMenuItem.js';
import inputEventHandler from './inputEventHandler.js';
import countMenuItems from './countMenuItems.js';
import localStorageHandler from './localHandle.js';

const menuList = document.getElementById('espresso-menu-list');
const menuInputForm = document.getElementById('espresso-menu-form');
const userInputTag = document.getElementById('espresso-menu-name');

const beverageCategoryContainer = document.querySelector('nav')
const currentCategoryNameTxt = document.getElementById('current-category-name')

const inputBtn = document.getElementById('espresso-menu-submit-button');
let itemCount = document.querySelector('.menu-count');
let currentCategory = 'espresso'

let beverageCategory = {
  espresso:[],
  frappuccino:[],
  blended:[],
  teavana:[],
  desert:[]
}

function app() {

  const getData = localStorageHandler.getLocalStorage()

  if (getData.length != null){
    beverageCategory = getData
  }
  addNewItem()
  manageMenuItem();
  countMenuItems();
  inputEventHandler();
  selectCategory();
}

const selectCategory = () => {
  beverageCategoryContainer.addEventListener('click', (e)=>{
    const selectedcategoryName = e.target.innerText
    if(e.target.classList.contains('cafe-category-name')){
      currentCategory = e.target.dataset.categoryName
      currentCategoryNameTxt.innerText = `${selectedcategoryName} 메뉴 관리`
      addNewItem()
    }
  })
}


app();

export { menuList, menuInputForm, userInputTag, inputBtn, itemCount, beverageCategory, currentCategory };