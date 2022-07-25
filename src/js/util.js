import getMenuItem from './components/menuItem.js'
import * as D from './dom.js'

export const updateCnt = (dir) => {
  D.totalCnt.innerHTML = Number(D.totalCnt.innerText) + dir
}

export const getInputValue = () => D.menuInput.value

export const createItem = () => {
  const menuName = getInputValue()
  if (!menuName) return window.alert('메뉴 이름을 입력해주세요.')
  const menuItem = getMenuItem(menuName).getElement()
  D.menuList.insertAdjacentElement('afterbegin', menuItem)
  D.menuInput.value = ''
  updateCnt(1)
}

export const deleteItem = (target, itemName) => {
  const result = window.confirm(`${itemName}을 삭제하시겠습니까?`)
  if (!result) return
  target.remove()
  updateCnt(-1)
}

export const updateItem = (target) => {
  const result = window.prompt('변경할 이름을 작성해주세요.')
  if (result) target.innerHTML = result
}
