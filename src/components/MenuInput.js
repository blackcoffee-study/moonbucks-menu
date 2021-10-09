function MenuInput({ $target, onAddMenu }) {
  this.$target = $target;
  this.onAddMenu = onAddMenu;

  this.keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (e.key !== 'Enter') return;

    if (e.target.value.trim() === '') {
      alert('메뉴를 입력하세요');
      return;
    }

    this.onAddMenu(e.target.value);
    e.target.value = '';
    e.target.cursor;
  };

  this.$target.addEventListener('keypress', this.keyPressHandler);
}

export default MenuInput;
