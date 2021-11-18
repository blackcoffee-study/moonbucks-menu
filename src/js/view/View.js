export default class View {
  constructor(document) {
    this.document = document;
  }

  selectCategory(e) {
    const categoryName = e.target.dataset.categoryName;
    const categoryDescription = e.target.innerText;
    const categoryNameKor = categoryDescription.split(' ')[1];

    this.renderCategory(categoryName, categoryNameKor, categoryDescription);
    return categoryName;
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

  getMenuId(e) {
    const $menuItem = e.target.closest('li');
    const menuId = parseInt($menuItem.dataset.menuId);
    return menuId;
  }

  getWillRemoveMenuItem(e) {
    const $menuItem = e.target.closest('li');
    const currentMenuName = $menuItem.querySelector('.menu-name').innerText;

    return confirm(`"${currentMenuName}" 메뉴를 삭제하시겠습니까?`);
  }

  // render

  render(menuList) {
    this.renderMenuItemList(menuList);
    this.renderMenuCount(menuList.length);
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

  renderMenuCount(count) {
    this.$('.menu-count').innerText = `총 ${count}개`;
  }

  renderCategory(name, nameKor, description) {
    this.$('.category-title').innerText = `${description} 메뉴 관리`;
    this.$('#menu-name').placeholder = `${nameKor} 메뉴 이름`;
    this.$('#menu-price').placeholder = `${nameKor} 메뉴 가격`;
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
