import { isNodeNameButton, isIncludesClass } from '../utils/checkCondition.js';

function MenuList({ $target, state, onEditMenu, onRemoveMenu }) {
  this.$target = $target;
  this.state = state;
  this.onEditMenu = onEditMenu;
  this.onRemoveMenu = onRemoveMenu;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.buttonClickHandler = (e) => {
    if (!isNodeNameButton) return;

    const menuId = e.target.parentNode.id;
    const classList = e.target.className;

    if (isIncludesClass(classList, 'menu-edit-button')) {
      this.onEditMenu(menuId);
    }

    if (isIncludesClass(classList, 'menu-remove-button')) {
      this.onRemoveMenu(menuId);
    }
  };

  this.render = () => {
    if (this.state.menu.length < 1) {
      this.$target.innerHTML = `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">메뉴를 입력해 주세요</span> 
      </li>`;
      return;
    }
    const menuListHtml = this.state.menu
      .map(
        (menuItem) => `
          <li class="menu-list-item d-flex items-center py-2" id=${menuItem.id}>
            <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
          </li>`
      )
      .join('');

    this.$target.innerHTML = menuListHtml;

    this.$target.addEventListener('click', this.buttonClickHandler);
    this.$target.addEventListener('click', this.buttonClickHandler);
  };
}
export default MenuList;
