import { $ } from '../util/selector.js'

export const renderMenuCount = (menuCount) => {
  const $menuCount = $("#espresso-menu-count");
  $menuCount.innerText = `총 ${menuCount}개`
}
