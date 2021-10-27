export default function MenuInput({ onAdd, $menuSubmitButton, $menuName }) {
  $menuSubmitButton.addEventListener('click', e => this.addMenu(e));

  this.addMenu = e => {
    if ($menuName.value.trim() == '') {
      alert('값을 입력해주세요.');
      $menuName.value = '';
      return;
    }
    onAdd($menuName.value);
    $menuName.value = '';
  };
}
