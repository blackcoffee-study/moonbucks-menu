import * as D from './dom.js'
import { INITIAL_STATE, MENU_MAP } from './constant.js'
import { Storage } from './module/Storage.js'
import { getInputValue, resetInputValue, setMenuList } from './util.js'

let currentCategory = 'espresso'

// 메뉴들을 관리하는 스토리지 생성, localStorage에 'cafe'라는 키가, 없다면 : 로컬스토리지안에 cafe: INITIAL_STATE 추가, 있다면 : 새로 만들지 않는다.
export const cafe = new Storage('cafe').createStorage(INITIAL_STATE)

// nav의 각 카테고리를 선택하면, 아래 리스트의 정보들이 각 카테고리에 맞게 변하도록 한다.
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

// 확인 버튼 클릭 시 메뉴 생성
D.createBtn.addEventListener('click', () => {
  const itemName = getInputValue()
  if (itemName) {
    cafe.createItem(currentCategory, itemName)
    setMenuList(currentCategory)
    resetInputValue()
  }
})

// 엔터 누르면 메뉴 생성
D.menuInput.addEventListener('keydown', (e) => {
  const itemName = getInputValue()
  if (e.key === 'Enter' && itemName && !e.isComposing) {
    e.preventDefault()
    cafe.createItem(currentCategory, itemName)
    setMenuList(currentCategory)
    resetInputValue()
  } else return
})

// 기본 화면은 에스프레소 카테고리
window.onload = setMenuList(currentCategory)
