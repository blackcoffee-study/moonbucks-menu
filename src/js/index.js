import * as D from './dom.js'
import { INITIAL_STATE, MENU_MAP } from './constant.js'
import { Storage } from './module/Storage.js'
import { getInputValue, resetInputValue, setMenuList } from './util.js'

let currentCategory = 'espresso'

export const cafe = new Storage('cafe').createStorage(INITIAL_STATE)
Array.from(D.categoryList).map((btn) =>
  btn.addEventListener('click', () => {
    const btnCategoryName = btn.getAttribute('data-category-name')
    currentCategory = btnCategoryName
    D.currentCategory.innerHTML = MENU_MAP[btnCategoryName].iconName
    D.menuInput.placeholder = `${MENU_MAP[btnCategoryName].name} 메뉴 이름`
    setMenuList(currentCategory)
    resetInputValue()
  })
)

D.createBtn.addEventListener('click', () => {
  const itemName = getInputValue()
  cafe.createItem(currentCategory, itemName)
  setMenuList(currentCategory)
  resetInputValue()
})

D.menuInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const itemName = getInputValue()
    cafe.createItem(currentCategory, itemName)
    setMenuList(currentCategory)
    resetInputValue()
  } else return
})

window.onload = setMenuList(currentCategory)
