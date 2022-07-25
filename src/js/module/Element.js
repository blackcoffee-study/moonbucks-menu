export class Element {
  constructor(tag, classList) {
    this.tag = tag
    this.classList = classList
    this.element = ''
  }

  setElement() {
    const element = document.createElement(this.tag)
    this.classList.forEach((className) => element.classList.add(className))
    this.element = element

    return this
  }

  getElement() {
    return this.element
  }

  setType(type) {
    this.element.type = type
    return this
  }

  setText(text) {
    this.element.innerHTML = text
    return this
  }

  setChild(child) {
    this.element.insertAdjacentElement('beforeend', child)
    return this
  }
}
