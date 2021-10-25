import MenuList from './MenuList.js'

const App = class extends Set {
  constructor () {
    super()
  }

  static load (json) {
    const app = new App()
    json.forEach(f => {
      app.addMenuList(MenuList.load(f))
    })
    return app
  }

  addMenuList (menuList) {
    if (!menuList instanceof MenuList) return console.log('invalid menuList')
    super.add(menuList)
  }

  #getTargetMenu(category){
    return this.getInfo().find(({ title }) => title === category)
  }

  getCurrentMenuList (category = 'espresso') {
    const currentMenuList = this.#getTargetMenu(category)
    if (currentMenuList) {
      return currentMenuList
    }
    super.add(MenuList.get(category))
    return this.#getTargetMenu(category)

  }

  getInfo () {
    return Array.from(super.values())
  }
}

export default App

