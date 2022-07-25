import * as D from './dom.js'

export const createMenu = (_name) => {
  const item = document.createElement('li')
  item.classList.add('menu-list-item', 'd-flex', 'py-2', 'items-center')
  const name = document.createElement('span')
  name.innerHTML = _name
  item.insertAdjacentElement('afterbegin', name)
  D.menuList.insertAdjacentElement('afterbegin', item)
  D.menuInput.value = ''
}

export const getInputValue = () => D.menuInput.value
