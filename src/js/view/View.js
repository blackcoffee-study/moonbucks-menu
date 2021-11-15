export default class View {
  constructor(document) {
    this.document = document;
  }

  addMenuItem(menuName) {
    this.$('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      this._menuItemTemplate(menuName),
    );
  }

  getNewMenuName(e) {
    return prompt('수정할 메뉴 이름', this.getCurrentMenuName(e));
  }

  getCurrentMenuName(e) {
    const $menuItem = e.target.closest('li');
    const $menuNameSpan = $menuItem.querySelector('.menu-name');
    const currentMenuName = $menuNameSpan.innerText;
    return currentMenuName;
  }

  updateMenuName(e, newMenuName) {
    const $menuItem = e.target.closest('li');
    const $menuNameSpan = $menuItem.querySelector('.menu-name');
    $menuNameSpan.innerText = newMenuName;
  }

  removeMenuItem(e) {
    const $menuItem = e.target.closest('li');
    const currentMenuName = $menuItem.querySelector('.menu-name').innerText;

    const removeConfirmResult = confirm(
      `"${currentMenuName}" 메뉴를 삭제하시겠습니까?`,
    );
    if (removeConfirmResult) {
      $menuItem.remove();
      alert('삭제되었습니다.');
    }
  }

  updateMenuCount(menuCount) {
    this.$('.menu-count').innerText = `총 ${menuCount}개`;
  }

  getMenuInput() {
    return this.$('#espresso-menu-name').value;
  }

  clearMenuInput() {
    this.$('#espresso-menu-name').value = '';
  }

  showAlert(message) {
    alert(message);
  }

  $(id) {
    return this.document.querySelector(id);
  }

  _menuItemTemplate(menuName) {
    return `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`;
  }
}
