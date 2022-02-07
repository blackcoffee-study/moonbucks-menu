import { $ } from '../utils/querySelector.js'

export default function MenuList({
  menus,
  onDeleteMenu,
  onModifyMenu,
  onSoldOutMenu
}){
  this.menus = menus
  this.onDeleteMenu = onDeleteMenu
  this.onModifyMenu = onModifyMenu
  this.onSoldOutMenu = onSoldOutMenu

  this.menuList = $('#category-menu-list')
  
  this.menuItemTemp = (menuItem) => {
    return `<li class="menu-list-item d-flex items-center py-2" data-id="${menuItem.id}">
              <span class="w-100 pl-2 menu-name ${menuItem.isSoldOut ? 'sold-out' : ''}">${menuItem.name}</span>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              >
                품절
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
              >
                수정
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
              >
                삭제
              </button>
            </li>`
  }

  this.handleMapMenu = () => {
    this.menuList.innerHTML = ''
    this.menus.map(item => {
      this.menuList.insertAdjacentHTML('beforeend', this.menuItemTemp(item))
    })
  }

  this.handleDeleteMenu = (e) => {
    if(confirm("정말 삭제하시겠습니까?")) {
      const target = e.target.closest('li').querySelector('.menu-name')
      const targetId = e.target.closest('li').getAttribute('data-id')
      const targetText = target.innerText
      this.onDeleteMenu(targetId)
    }
  }

  this.handleModifyMenu = (e) => {
    const newMenuName = prompt('수정하시겠습니까?', '')
    const target = e.target.closest('li').querySelector('.menu-name')
    const targetId = e.target.closest('li').getAttribute('data-id')
    if(newMenuName !== '') {
      target.innerText = newMenuName
      this.onModifyMenu(targetId, newMenuName)
    }
  }

  this.handleSoldOutMenu = (e) => {
    const targetId = e.target.closest('li').getAttribute('data-id')
    const menuName = e.target.closest('li').querySelector('.menu-name')
    if(menuName.classList.contains('sold-out')) {
      menuName.classList.remove('sold-out')
    } else {
      menuName.classList.add('sold-out')
    }
    this.onSoldOutMenu(targetId)
  }

  this.handleEvents = () => {
    this.menuList.addEventListener('click', e => {
      if(e.target.classList.contains('menu-remove-button')){
        this.handleDeleteMenu(e)
      }
      if(e.target.classList.contains('menu-edit-button')){
        this.handleModifyMenu(e)
      }
      if(e.target.classList.contains('menu-sold-out-button')){
        this.handleSoldOutMenu(e)
      }
    })
  }

  this.init = () => {
    this.handleEvents()
  }

  this.render = () => {
    this.handleMapMenu()
  }

  this.setState = (nextState) => {
    this.menus = nextState
    this.render()
  }

  this.init()
  this.render()
}