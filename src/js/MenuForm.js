import { $ } from './utils.js'

export default function MenuForm({ $target, onAdd }) {
  this.$target = $target
  this.$button = $('#espresso-menu-submit-button')

  this.$target.addEventListener('submit', (e) => onAdd(e))
  this.$button.addEventListener('click', (e) => onAdd(e))
}
