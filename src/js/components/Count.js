import { $ } from '../utils/dom.js';

export default function Count() {
  this.updateCount = function ({ menuCount }) {
    const countEl = $('.menu-count');
    countEl.textContent = `총 ${menuCount}개`;
  };
}
