import { cafe } from '../../index.js'
import { setMenuList } from '../../util.js'

// 수정 버튼 클릭 시
export const updateItem = (category, prevName) => {
  const result = window.prompt('변경할 이름을 작성해주세요.')

  if (result) {
    cafe.updateItem(category, prevName, result)
    setMenuList(category)
  }
}

// 삭제 버튼 클릭 시
export const deleteItem = (category, itemName) => {
  const result = window.confirm(`${itemName}을 삭제하시겠습니까?`)
  if (result) {
    cafe.deleteItem(category, itemName)
    setMenuList(category)
  }
}

// 품절 버튼 클릭 시
export const updateSoldOut = (category, itemName) => {
  cafe.updateSoldOut(category, itemName)
  setMenuList(category)
}
