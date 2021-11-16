export default class View {
  constructor(document) {
    this.document = document;
  }

  selectCategory(e) {
    const category = e.target.dataset.categoryName;
    const description = e.target.innerText;
    const categoryKor = description.split(' ')[1];

    this.$('.category-title').innerText = `${description} 메뉴 관리`;
    this.$('#menu-name').placeholder = `${categoryKor} 메뉴 이름`;
    this.$('#menu-price').placeholder = `${categoryKor} 메뉴 가격`;
    return category;
  }

  getNewMenuName(e) {
    return prompt('수정할 메뉴 이름', this.getCurrentMenuName(e)) || '';
  }

  getNewMenuPrice(e) {
    return prompt('수정할 메뉴 가격', this.getCurrentMenuPrice(e)) || '';
  }

  getCurrentMenuName(e) {
    const $menuItem = e.target.closest('li');
    const $menuNameSpan = $menuItem.querySelector('.menu-name');
    const currentMenuName = $menuNameSpan.innerText;
    return currentMenuName;
  }

  getCurrentMenuPrice(e) {
    const $menuItem = e.target.closest('li');
    const $menuPriceSpan = $menuItem.querySelector('.menu-price');
    const currentMenuPrice = $menuPriceSpan.innerText;
    return currentMenuPrice;
  }

  addMenuItem(index, name, price) {
    this.$('#menu-list').insertAdjacentHTML(
      'beforeend',
      this._menuItemTemplate(index, name, price),
    );
  }

  updateMenuItem(e, name, price) {
    const $menuItem = e.target.closest('li');
    const $menuNameSpan = $menuItem.querySelector('.menu-name');
    const $menuPriceSpan = $menuItem.querySelector('.menu-price');
    $menuNameSpan.innerText = name;
    $menuPriceSpan.innerText = price;
  }

  getMenuId(e) {
    const $menuItem = e.target.closest('li');
    const menuId = parseInt($menuItem.dataset.menuId);
    return menuId;
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
    return {
      name: this.$('#menu-name').value,
      price: this.$('#menu-price').value,
    };
  }

  clearMenuInput() {
    this.$('#menu-name').value = '';
    this.$('#menu-price').value = '';
  }

  showAlert(message) {
    alert(message);
  }

  renderMenuItemList(menuList) {
    let result = '';
    let index = -1;

    if (menuList) {
      const template = menuList.map((menuItem) => {
        index++;
        return this._menuItemTemplate(
          index,
          menuItem.name,
          menuItem.price,
          menuItem.isSoldOut,
        );
      });
      result = template.join('');
    }

    this.$('#menu-list').innerHTML = result;
  }

  // private method

  $(id) {
    return this.document.querySelector(id);
  }

  _menuItemTemplate(index, menuName, price, isSoldOut) {
    const soldOutClass = isSoldOut ? ' sold-out' : '';

    return `
      <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2${soldOutClass}">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
        <span class="w-100 pl-2 menu-price">${price}</span>
        <div class="w-100 d-flex">
          <button
            type="button"
            class="w-100 bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
            type="button"
            class="w-100 bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="w-100 bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </div>
      </li>`;
  }
}
