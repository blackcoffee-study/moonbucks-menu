import App from './states/App.js'
import Menu from './states/Menu.js'
import { menuTemplate } from './template/menu.js'
import { $ } from './utils/DOM.js'
import { menuAPI } from './api/index.js'

class Renderer {
  constructor (app) {
    this.app = app
  }

  render () {
    this._render()
  }

  _render () {
    console.log('must be override')
  }
}

class DOMRenderer extends Renderer {
  constructor (app) {
    super(app)
    this.init()
  }

  async init () {
    const category = this.getCurrentCategory()
    const menuList = await menuAPI.getCurrentMenu(category)

    this.app = App.load([{ title: category, menuList }])
    this.currentMenu = this.app.getCurrentMenuList()

    return this.addMenuEvent().render()
  }

  addMenuEvent () {
    this.$menuList = $('#espresso-menu-list')
    this.$menuCount = $('span.menu-count')

    const $inputMenu = $('#espresso-menu-form')
    const $navMenu = $('#category-name')

    $inputMenu.addEventListener('submit', this.handleAddMenu)
    $navMenu.addEventListener('click', this.handleChangeMenu)
    return this
  }

  getCurrentCategory = () => {
    const { title: category } = this.currentMenu?.getInfo() || { title: 'espresso' }

    return category
  }

  handleChangeMenu = ({ target: { dataset } }) => {
    const category = dataset['categoryName']

    if (category) {
      this.currentMenu = this.app.getCurrentMenuList(category)
    }

    this.render()
  }

  handleAddMenu = async (e) => {
    e.preventDefault()
    const $input = e.target.elements['espressoMenuName']
    const name = $input.value.trim()

    if (!name.length) return
    const category = this.getCurrentCategory()
    const memo = await menuAPI.addCafeMenu(category, name)

    this.currentMenu.addMenu(Menu.load(memo))
    $input.value = ''
    this.render()
  }

  toggleSoldOut = async (menu) => {
    const category = this.getCurrentCategory()
    const { id: menuId } = menu.getInfo()
    await menuAPI.soldOutMenu(category, menuId)

    menu.toggleSoldOut()
    this.render()
  }

  updateMenu = async (menu) => {
    const newName = window.prompt('메뉴를 수정해주세요')

    if (!newName.trim()) return
    const category = this.getCurrentCategory()
    const { id: menuId } = menu.getInfo()
    await menuAPI.updateMenuName(category, menuId, newName)

    menu.updateName(newName)
    this.render()
  }

  deleteMenu = async (menu) => {
    const isDelete = window.confirm('메뉴를 삭제하시겠습니까?')

    if (!isDelete) return
    const category = this.getCurrentCategory()
    const { id: menuId } = menu.getInfo()
    await menuAPI.deleteMenu(category, menuId)

    this.currentMenu.removeMenu(menu)
    this.render()
  }

  createMenu = (menu) => {
    const { id, name, isSoldOut } = menu.getInfo()
    const li = document.createElement('li')
    const style = 'menu-list-item d-flex items-center py-2'.split(' ')
    li.id = id
    li.classList.add(...(style))
    li.addEventListener('click', ({ target }) => {
        if (target.classList.contains('menu-sold-out-button')) {
          this.toggleSoldOut(menu)
        }
        if (target.classList.contains('menu-edit-button')) {
          this.updateMenu(menu)
        }
        if (target.classList.contains('menu-remove-button')) {
          this.deleteMenu(menu)
        }
      }
    )
    li.innerHTML = menuTemplate(name, isSoldOut)
    this.$menuList.appendChild(li)
  }

  async render () {
    const category = this.getCurrentCategory()
    const menuList = await menuAPI.getCurrentMenu(category)

    if (this.prev === JSON.stringify(menuList)) return
    this.$menuList.innerHTML = ''
    menuList.forEach(memo => this.createMenu(Menu.load(memo)))

    this.$menuCount.innerHTML = `총 ${menuList.length}개`

    this.prev = JSON.stringify(menuList)
  }
}

new DOMRenderer(new App())
