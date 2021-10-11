import Menu from './Menu.js'
import MenuList from './MenuList.js'

const App = class extends Set {
  constructor () {
    super()
  }

  static load(json){
    const app = new App();
    json.forEach(f => {
      app.addMenuList(MenuList.load(f))
    })
    return app;
  }

  toJSON () {
    return this.getInfo();
  }

  addMenuList (menuList) {
    if (!menuList instanceof MenuList) return console.log('invalid menuList')
    super.add(menuList)
  }

  getInfo () {
    return Array.from(super.values())
  }

}

export default App

