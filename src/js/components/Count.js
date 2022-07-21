import { $ } from '../utils/index.js';

export default function Count() {
  this.updateCount = function ({ menuCount }) {
    const countEl = $('.menu-count');
    countEl.innerHTML = `총 ${menuCount}개`;
  };
}
