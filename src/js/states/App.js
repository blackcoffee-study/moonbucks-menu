import Menu from './Menu.js'

const App = class extends Set {
  constructor () {
    super()
  }

  static get () {
    return new App()
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
    return Array.from(super.values())
  }

}

export default App

