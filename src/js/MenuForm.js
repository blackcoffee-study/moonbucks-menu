import { $ } from './utils.js'

export default function MenuForm({ $target, onSubmit }) {
  this.$target = $target
  this.$button = $('#espresso-menu-submit-button')

  this.$target.addEventListener('submit', (e) => onSubmit(e))
  this.$button.addEventListener('click', (e) => onSubmit(e))
}
