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

  toJSON(){
    return this.getInfo();
  }

  updateName (newName) {
    this.name = newName
  }

  getInfo () {
    return this
  }
}

export default Menu
