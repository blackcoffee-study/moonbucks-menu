const Menu = class {
  constructor (id, name) {
    this.id = id
    this.name = name
  }

  static get(id, name) {
    return new Menu(id, name)
  }

  updateName(newName) {
    this.name = newName;
  }

  getInfo() {
    return this
  }
}

export default Menu
