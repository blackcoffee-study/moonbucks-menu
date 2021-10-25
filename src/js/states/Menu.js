const Menu = class {
  constructor (id, name, isSoldOut = false) {
    this.id = id
    this.name = name
    this.isSoldOut = isSoldOut
  }

  static get (id, name) {
    return new Menu(id, name)
  }

  static load ({ id, name, isSoldOut}) {
    return new Menu(id, name, isSoldOut)
  }

  updateName (newName) {
    this.name = newName
  }

  toggleSoldOut(){
    this.isSoldOut = !this.isSoldOut
  }

  getInfo () {
    return this
  }
}

export default Menu
