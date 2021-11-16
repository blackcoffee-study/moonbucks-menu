export default class Menu {
  constructor(name, price, isSoldOut = false) {
    this.name = name;
    this.price = price;
    this.isSoldOut = isSoldOut;
  }

  // setter, getter

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }

  setIsSoldOut(boolean) {
    this.isSoldOut = !this.isSoldOut;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getIsSoldOut() {
    return this.isSoldOut
  }
}
