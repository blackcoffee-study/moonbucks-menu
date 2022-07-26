import compMenuItem from './components/menuItem.js'
import * as D from './dom.js'
import { cafe } from './index.js'

export const updateCnt = (dir) => {
  D.totalCnt.innerHTML = Number(D.totalCnt.innerText) + dir
}

export const getInputValue = () => D.menuInput.value
export const resetInputValue = () => (D.menuInput.value = '')

export const deleteItem = (category, itemName) => {
  const result = window.confirm(`${itemName}을 삭제하시겠습니까?`)
  if (result) {
    cafe.deleteItem(category, itemName)
    setMenuList(category)
  }
}

export const updateItem = (category, prevName) => {
  const result = window.prompt('변경할 이름을 작성해주세요.')

  if (result) {
    cafe.updateItem(category, prevName, result)
    setMenuList(category)
  }
}

export const setMenuList = (category) => {
  D.menuList.innerHTML = ''
  const newMenuList = cafe.getItem().menu[category]
  if (!newMenuList.length) return
  newMenuList.map((item) =>
    D.menuList.insertAdjacentElement('afterbegin', compMenuItem(item.name, category).getElement())
  )
}
