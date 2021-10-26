import Menu from './Menu.js'

const MenuList = class extends Set {
  constructor (title = 'espresso') {
    super()
    this.title = title
  }

  static get (title) {
    return new MenuList(title)
  }

  static load(json){
    const menuList = new MenuList(json.title);
    json.menuList.forEach(t => {
      menuList.addMenu(Menu.load(t))
    })
    return menuList;
  }

  addMenu (menu) {
    if (!menu instanceof Menu) return console.log('invalid menu')
    super.add(menu)
  }

  removeMenu (menu) {
    if (!menu instanceof Menu) return console.log('invalid menu')
    super.delete(menu)
  }

  getInfo () {
    return { title : this.title, menuList: Array.from(super.values())}
  }
}

export default MenuList
