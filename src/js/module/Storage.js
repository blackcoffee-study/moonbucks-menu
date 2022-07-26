export class Storage {
  constructor(key) {
    this.key = key
    this.item = {}
  }

  createStorage(item) {
    const storageItem = localStorage.getItem(this.key)
    if (!storageItem) {
      localStorage.setItem(this.key, JSON.stringify(item))
      this.item = item
    } else {
      this.item = JSON.parse(storageItem)
    }
    return this
  }

  getItem() {
    return JSON.parse(localStorage.getItem(this.key))
  }

  setItem(item) {
    localStorage.setItem(this.key, JSON.stringify(item))
    return this
  }

  #getCategoryItemList(categoryName) {
    return this.item.menu[categoryName]
  }

  #findCategoryItemIdx(categoryName, itemName) {
    const currIdx = this.#getCategoryItemList(categoryName).findIndex((item) => item.name === itemName)
    return currIdx
  }

  #updateStorage(newData) {
    localStorage.removeItem(this.key)
    this.item = newData
    this.setItem(newData)
  }

  createItem(categoryName, itemName) {
    const idx = this.#findCategoryItemIdx(categoryName, itemName)
    if (idx > -1) return window.alert('이미 존재하는 메뉴입니다.')
    else {
      this.#getCategoryItemList(categoryName).push({ name: itemName, isSold: false })
      const newData = { menu: { ...this.item.menu, [categoryName]: this.#getCategoryItemList(categoryName) } }
      this.#updateStorage(newData)
    }
    return this
  }

  updateItem(categoryName, prevName, updateName) {
    const idx = this.#findCategoryItemIdx(categoryName, prevName)
    const prevItemList = this.#getCategoryItemList(categoryName)
    prevItemList[idx] = { name: updateName, isSold: false }
    const newData = { menu: { ...this.item.menu, [categoryName]: prevItemList } }

    this.#updateStorage(newData)
    return this
  }

  deleteItem(categoryName, itemName) {
    const prevItemList = this.#getCategoryItemList(categoryName)
    const currItemList = prevItemList.filter((item) => item.name !== itemName)
    const newData = { menu: { ...this.item.menu, [categoryName]: currItemList } }
    this.#updateStorage(newData)
    return this
  }

  updateSoldOut(categoryName, itemName) {
    const idx = this.#findCategoryItemIdx(categoryName, itemName)
    const prevItemList = this.#getCategoryItemList(categoryName)
    prevItemList[idx] = { name: itemName, isSold: !prevItemList[idx].isSold }
    const newData = { menu: { ...this.item.menu, [categoryName]: prevItemList } }

    this.#updateStorage(newData)
    return this
  }
}
