import { $, $$ } from '../utils/querySelector.js'
import {
  CATEGORY_HEAD_NAME,
  CATEGORY_INPUT_TEXT
} from '../utils/constant.js'

export default function MenuCategory({
  onToggleCategory
}){
  this.handleToggleCategory = onToggleCategory

  this.categoryName = $$('.cafe-category-name')
  this.headingTitle = $('.mt-1')
  this.inputMenu = $('#category-menu-name')

  this.renderMenuText = (menuHeadingText) => {
    this.headingTitle.innerText = menuHeadingText + '메뉴 관리'
  }

  this.handleMenuHeading = (categoryName) => {
    switch(categoryName) {
      case "espresso" :
        this.headingTitle.innerText = CATEGORY_HEAD_NAME.ESPRESSO + ' 메뉴 관리'
        this.inputMenu.placeholder = CATEGORY_INPUT_TEXT.ESPRESSO + ' 메뉴 이름'
      break;

      case "frappuccino" :
        this.headingTitle.innerText = CATEGORY_HEAD_NAME.FRAPPUCCINO + ' 메뉴 관리'
        this.inputMenu.placeholder = CATEGORY_INPUT_TEXT.FRAPPUCCINO + ' 메뉴 이름'
      break;

      case "blended" :
        this.headingTitle.innerText = CATEGORY_HEAD_NAME.BLENDED + ' 메뉴 관리'
        this.inputMenu.placeholder = CATEGORY_INPUT_TEXT.BLENDED + ' 메뉴 이름'
      break;

      case "teavana" :
        this.headingTitle.innerText = CATEGORY_HEAD_NAME.TEAVANA + ' 메뉴 관리'
        this.inputMenu.placeholder = CATEGORY_INPUT_TEXT.TEAVANA + ' 메뉴 이름'
      break;

      case "desert" :
        this.headingTitle.innerText = CATEGORY_HEAD_NAME.DESERT + ' 메뉴 관리'
        this.inputMenu.placeholder = CATEGORY_INPUT_TEXT.DESERT + ' 메뉴 이름'
      break;
    }
  }

  this.handleCategoryName = (e) => {
    const categoryName = e.target.getAttribute('data-category-name')
    this.handleMenuHeading(categoryName)
    this.handleToggleCategory(categoryName)
  }

  this.handleEvents = () => {
    this.categoryName.forEach((target) => {
      target.addEventListener('click', (e) => this.handleCategoryName(e))
    })
  }

  this.render = () => {
    this.handleEvents()
  }

  this.render()
}