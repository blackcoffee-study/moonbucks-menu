import App from './states/App.js'
import Menu from './states/Menu.js'
import { menuTemplate } from './template/menu.js'
import { $ } from './utils/DOM.js'
import MenuList from './states/MenuList.js'

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
    if(!localStorage['menus']){
      localStorage['menus'] = JSON.stringify([]);
      this.app.addMenuList(MenuList.get())
    } else {
      this.app = App.load(JSON.parse(localStorage['menus']))
    }
    this.currentFolder = this.app.getCurrentMenuList()
    this._addMenuEvent().render()
    this.prev = null;
  }

  _addMenuEvent () {
    this.$menuList = $('#espresso-menu-list')
    this.$menuCount = $('span.menu-count');

    const $inputMenu = $('#espresso-menu-form')
    const $navMenu = $('#category-name');

    $inputMenu.addEventListener('submit', this._handleAddMenu)
    $navMenu.addEventListener('click', this._handleMenuChange)
    return this;
  }

  _handleMenuChange = ({target: { dataset }}) => {
    const category = dataset['categoryName']
    if(category) {
      this.currentFolder = this.app.getCurrentMenuList(category)
    }
    this.render()
  }

  _handleAddMenu = (e) => {
    e.preventDefault()
    const $input =  e.target.elements['espressoMenuName'];
    const name = $input.value.trim()

    if (!name.length) return
    this.currentFolder.addMenu(Menu.get(this.currentFolder.size, name))

    $input.value = '';

    this.render()
  }

  _updateMenu = (menu) => {
    const newName = window.prompt('메뉴를 수정해주세요');
    if(!newName.trim()) return;
    menu.updateName(newName);
    this.render()
  }

  _deleteMenu = (menu) => {
    const isDelete = window.confirm('메뉴를 삭제하시겠습니까?');
    if(!isDelete) return;
    this.currentFolder.removeMenu(menu);
    this.render()
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
          return;
        }
        if (target.classList.contains('menu-remove-button')) {
          this._deleteMenu(menu)
        }
      }
    )
    li.innerHTML = menuTemplate(name)
    this.$menuList.appendChild(li)
  }

  _render () {
    const menuList = this.currentFolder.getInfo();

    // if(this.prev === JSON.stringify(menuList)) return;

    console.log('render list')
    this.$menuList.innerHTML = '';
    menuList.forEach(this._createMenu)
    this.$menuCount.innerHTML = `총 ${menuList.length}개`;
    this.prev = JSON.stringify(menuList);
    localStorage['menus'] = JSON.stringify(this.app);
  }

}

new DOMRenderer(new App())
