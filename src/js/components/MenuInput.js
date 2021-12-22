import { $ } from '../utils/querySelector.js'

export default function MenuInput({
  onAddMenu
}) {
  this.menuInput = $('.input-field')
  this.menuSubmit = $('.input-submit')
  this.menuForm = $('#category-menu-form')

  this.onAddMenu = onAddMenu

  this.handleAddMenu = () => {
    if(this.menuInput.value === '') {
      alert('메뉴 이름을 입력해주세요.')
    } else {
      this.onAddMenu(this.menuInput.value)
      this.menuInput.value = ''
      this.menuInput.focus()
    }
  }

  this.handleEvents = () => {
    this.menuSubmit.addEventListener("click", (e) => {
      this.handleAddMenu()
    })
    this.menuForm.addEventListener("keydown", (event) => {
      if(event.keyCode === 13) {
        event.preventDefault()
        this.handleAddMenu()
      }
    })
  }

  this.render = () => {
    this.handleEvents()
  }

  this.render()
}