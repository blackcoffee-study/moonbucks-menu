export default function MenuList({
  initialState,
  toggleSoldOut,
  editMenu,
  removeMenu,
}) {
  this.$menuList = document.querySelector('#menu-list');
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$menuList.innerHTML = Array.isArray(this.state)
      ? `${this.state
          .map(
            (menu) => `<li class="menu-list-item d-flex items-center py-2" id=${
              menu.id
            }>
            <span class="w-100 pl-2 menu-name">${
              menu.isSoldOut ? `<s>${menu.name}</s>` : `${menu.name}`
            }</span>
            <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
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
          .join('')}`
      : '';
  };

  this.setEvent = () => {
    this.$menuList.addEventListener('click', (e) => {
      // Event delegate
      if (e.target.classList.contains('menu-sold-out-button')) {
        toggleSoldOut(Number(e.target.closest('li').getAttribute('id')));
      }

      if (e.target.classList.contains('menu-edit-button')) {
        const editedMenu = prompt('수정할 메뉴 이름을 입력해주세요.');
        if (editedMenu !== null && editedMenu !== '') {
          editMenu(e.target.closest('li').getAttribute('id'), editedMenu);
        }
      }
      if (e.target.classList.contains('menu-remove-button')) {
        if (confirm('메뉴를 삭제하시겠습니까?')) {
          removeMenu(Number(e.target.closest('li').getAttribute('id')));
        }
      }
    });
  };

  this.render();
  this.setEvent();
}
