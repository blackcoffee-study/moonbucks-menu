export default function Count() {
  this.updateCount = ({ menuCount }) => {
    const countEl = document.querySelector('.menu-count');
    countEl.innerHTML = `총 ${menuCount}개`;
  };
}
