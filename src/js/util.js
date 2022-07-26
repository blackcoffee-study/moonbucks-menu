import compMenuItem from './components/menuItem/index.js'
import * as D from './dom.js'
import { cafe } from './index.js'

export const updateCnt = (dir) => {
  D.totalCnt.innerHTML = Number(D.totalCnt.innerText) + dir
}

// input에 관련된 함수
export const getInputValue = () => D.menuInput.value
export const resetInputValue = () => (D.menuInput.value = '')

// 메뉴 리스트를 새로 그려주는 함수
export const setMenuList = (category) => {
  D.menuList.innerHTML = ''
  const newMenuList = cafe.getItem().menu[category]

  if (newMenuList.length) {
    newMenuList.map((item) => D.menuList.insertAdjacentElement('afterbegin', compMenuItem(item, category).getElement()))
    D.totalCnt.innerHTML = newMenuList.length
  }
}
