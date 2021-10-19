export default function MenuList(categoryName) {
  this.state = [];

  this.$menuList = document.createElement('ul');
  this.$menuList.id = 'espresso-menu-list';
  this.$menuList.classList = 'mt-3 pl-0';

  this.getLocalStorage = (category) => {
    const strMenu = localStorage.getItem(category);
    let menu = [];
    if (strMenu !== null) menu = JSON.parse(strMenu);

    return menu;
  }

  this.setLocalStorage = (category, state) => {
    localStorage.setItem(category, JSON.stringify(state));
  }

  this.addItem = (value) => {
    this.setState([value, ...this.state]);
    this.setLocalStorage(categoryName, this.state);
  }
  this.setState = (nextState) => {
    this.state = nextState;
    this.render()
  }
  this.removeMenu = (target) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    this.state.splice(target, 1);
    this.render();
    // menuCounter -= 1;
    // updateMenuCount();
  }
  this.editMenuItem = (target) => {
    for (const child of target.childNodes) {
      if (child.classList && child.classList.contains('menu-name')) {
        const string = window.prompt('메뉴명을 수정하세요', child.innerText);

        if (string === '') return;

        child.innerText = string;
        break;
      }
    }
  };
  this.listClickListener = (event) => {
    const target = event.target;

    if (target.tagName !== 'BUTTON') return;

    const targetListItem = target.closest('li');

    if (target.classList.contains('menu-edit-button')) {
      this.editMenuItem(targetListItem)
    } else if (target.classList.contains('menu-remove-button')) {
      this.removeMenu(targetListItem.innerText)
    }

  }
  this.render = () => {

    this.$parent = document.querySelector('.wrapper');
    this.$parent.appendChild(this.$menuList);

    this.$menuList.innerHTML = `
    ${this.state.map(item => {
      return `
      <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item}</span>
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
    }).join('')}
    
    `;
    this.$menuList.addEventListener('click', this.listClickListener)
  }
  this.init = () => {
    const getState = this.getLocalStorage(categoryName);
    this.setState(getState);
  }
  this.init();
  this.render();
}