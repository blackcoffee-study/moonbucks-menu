import { Element } from '../../module/Element.js'
import { Style } from './constant.js'
import { deleteItem, updateItem, updateSoldOut } from './util.js'

export default function compMenuItem(item, category) {
  const menuItem = new Element('li', Style.menuItem).setElement()
  const menuName = new Element('span', Style.menuName).setElement().setText(item.name).getElement()
  const updateBtn = new Element('button', Style.updateBtn).setElement().setType('button').setText('수정').getElement()

  const deleteBtn = new Element('button', Style.deleteBtn).setElement().setType('button').setText('삭제').getElement()

  const soldOutBtn = new Element('button', item.isSold ? Style.soldOutBtn.isSold : Style.soldOutBtn.default)
    .setElement()
    .setType('button')
    .setText('품절')
    .getElement()

  deleteBtn.addEventListener('click', () => deleteItem(category, item.name))
  updateBtn.addEventListener('click', () => updateItem(category, item.name))
  soldOutBtn.addEventListener('click', () => updateSoldOut(category, item.name))

  menuItem.setChild(menuName).setChild(soldOutBtn).setChild(updateBtn).setChild(deleteBtn)

  return menuItem
}
