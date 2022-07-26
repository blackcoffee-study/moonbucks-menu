import { Element } from '../module/Element.js'
import { deleteItem, updateItem } from '../util.js'

export default function compMenuItem(name, category) {
  const menuItem = new Element('li', ['menu-list-item', 'd-flex', 'py-2', 'items-center']).setElement()
  const menuName = new Element('span', ['w-100', 'pl-2', 'menu-name']).setElement().setText(name).getElement()
  const updateBtn = new Element('button', ['bg-gray-50', 'text-gray-500', 'text-sm', 'mr-1', 'menu-edit-button'])
    .setElement()
    .setType('button')
    .setText('수정')
    .getElement()
  const deleteBtn = new Element('button', []).setElement().setType('button').setText('삭제').getElement()

  deleteBtn.addEventListener('click', () => deleteItem(category, name))
  updateBtn.addEventListener('click', () => updateItem(category, name))

  menuItem.setChild(menuName).setChild(updateBtn).setChild(deleteBtn)

  return menuItem
}
