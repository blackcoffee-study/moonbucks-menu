export default class MenuList {
  constructor(element, props) {
    this.$element = element;
    this.items = props?.items || [];
    this.render();
  }

  template() {
    return `
    ${this.items
      .map((item, index) => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name" key=${index}>${item}</span>
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
        </li>
        `;
      })
      .join('')}
    `;
  }

  getItems() {
    return this.items;
  }

  get itemCount() {
    return this.items.length;
  }

  addItem(item, callback) {
    this.items = [item, ...this.items];
    this.render();
    if (callback) callback(this.itemCount);
  }

  editedItem(index, text, callback) {
    let editedItem = prompt('메뉴 이름을 수정하시겠어요?', text) ?? text;
    this.items[index] = editedItem;
    this.render();
    if (callback) callback(this.itemCount);
  }

  deletedItem(index, callback) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    this.items = this.items.filter((item, i) => i !== index);
    this.render();
    if (callback) callback(this.itemCount);
  }

  render() {
    this.$element.innerHTML = this.template();
  }
}
