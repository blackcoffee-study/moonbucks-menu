function MenuAddButton({ $target, $menuInput, onAddMenu }) {
  this.$target = $target;
  this.$menuInput = $menuInput;
  this.onAddMenu = onAddMenu;

  this.clickHandler = () => {
    if (this.$menuInput.value.trim() === '') {
      alert('메뉴를 입력하세요');
      return;
    }

    this.onAddMenu(this.$menuInput.value);
    this.$menuInput.value = '';
    this.$menuInput.cursor;
  };

  this.$target.addEventListener('click', this.clickHandler);
}
export default MenuAddButton;
