export default function MenuCount({ $menuCount }) {
  this.setState = menuCount => {
    this.render(menuCount);
  };

  this.render = count => {
    $menuCount.innerText = `총 ${count}개`;
  };
}
