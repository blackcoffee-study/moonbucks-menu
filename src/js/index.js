import App from './states/App.js'
import Menu from './states/Menu.js'
import { menuTemplate } from './template/menu.js'
import { $ } from './utils/DOM.js'

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
    this.$menuList = $('#espresso-menu-list')

    this._addMenuEvent().render()
  }

  _addMenuEvent () {
    const $inputMenu = $('#espresso-menu-form')
    $inputMenu.addEventListener('submit', this._handleAddMenu)
    return this;
  }

  _handleAddMenu = (e) => {
    e.preventDefault()
    const $input =  e.target.elements['espressoMenuName'];
    const name = $input.value.trim()

    if (!name.length) return
    this.app.addMenu(Menu.get(this.app.size, name))

    $input.value = '';

    this.render()
  }

  _updateMenu = (menu) => {
    const newName = window.prompt('메뉴를 수정해주세요');
    if(!newName.trim()) return;
    menu.updateName(newName);
  }

  _deleteMenu = (menu) => {
    this.app.removeMenu(menu);
  }

  _createMenu = (menu) => {
    const { id, name } = menu.getInfo()
    const li = document.createElement('li')
    const style = 'menu-list-item d-flex items-center py-2'.split(' ')
    li.id = id
    li.classList.add(...(style))
    li.addEventListener('click', ({ target }) => {
        if (target.classList.contains('menu-edit-button')) {
          this._updateMenu(menu)
        }
        if (target.classList.contains('menu-remove-button')) {
          this._deleteMenu(menu)
        }

        this.render()
      }
    )
    li.innerHTML = menuTemplate(name)
    this.$menuList.appendChild(li)
  }

  _render () {
    this.$menuList.innerHTML = ''
    const menuList = this.app.getInfo()
    menuList.forEach(this._createMenu)
  }

}

new DOMRenderer(new App())
