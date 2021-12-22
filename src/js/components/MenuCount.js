import { $ } from '../utils/querySelector.js'

export default function MenuCount({
  menus
}){
  this.menus = menus
  
  this.menuCount = $('.menu-count')

  this.handleCountMenus = () => {
    this.menuCount.textContent = `총 ${this.menus.length}개`
  }

  this.render = () => {
    this.handleCountMenus()
  }

  this.setState = (nextState) => {
    this.menus = nextState
    this.render()
  }

  this.render()
}