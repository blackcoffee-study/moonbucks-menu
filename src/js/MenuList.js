import { $ } from './utils.js'

export default function MenuList({
  $target,
  initialState,
}) {
  this.$target = $target
  this.state = initialState

  this.render = () => {
    const { menuList } = this.state

    this.$target.innerHTML = menuList.map((menu, index) =>
      `<li>
        ${menu}
        <button data-index=${index} class="espresso-menu-update-btn">수정</button>
        <button class="espresso-menu-delete-btn">삭제</button>
      </li>`)
      .join('')
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render()
}