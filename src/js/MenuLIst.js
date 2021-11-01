export default function MenuList({ initialState, updateMenuItems, editMenuItems, deleteMenuItems, checkSoldOut }) {
  this.state = initialState;
  this.updateMenuItems = updateMenuItems;
  this.editMenuItems = editMenuItems;
  this.deleteMenuItems = deleteMenuItems;
  this.checkSoldOut = checkSoldOut;

  this.$menuList = document.createElement('ul');
  this.$menuList.id = 'espresso-menu-list';
  this.$menuList.classList = 'mt-3 pl-0';

  this.getLocalStorage = (category) => {
    const strMenu = localStorage.getItem(category);
    let menu = [];
    if (strMenu !== null) menu = JSON.parse(strMenu);
    return menu;
  }


  this.addMenuItem = (value) => {
    this.updateMenuItems(value);
  }


  this.editMenuItem = (target) => {
    const elementId = target.dataset.id;
    for (const child of target.childNodes) {
      if (child.classList && child.classList.contains('menu-name')) {
        const originMenu = child.innerText;
        const editedMenu = window.prompt('메뉴명을 수정하세요', child.innerText);

        if (editedMenu === originMenu) return;
        this.editMenuItems(elementId, editedMenu);
        break;
      }
    }
  };


  this.removeMenuItem = (target) => {
    const elementId = target.dataset.id;
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    this.deleteMenuItems(elementId);
  };


  this.checkSoldOutItem = (target) => {
    const elementId = target.dataset.id;
    this.checkSoldOut(elementId);
  }


  this.listClickListener = (event) => {
    event.stopPropagation();
    const target = event.target;
    if (target.tagName !== 'BUTTON') return;

    const targetListItem = target.closest('li');
    if (target.classList.contains('menu-edit-button')) {
      this.editMenuItem(targetListItem)

    } else if (target.classList.contains('menu-remove-button')) {
      this.removeMenuItem(targetListItem);

    } else if (target.classList.contains('menu-sold-out-button')) {
      this.checkSoldOutItem(targetListItem);

    }
  }


  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }


  this.render = () => {
    this.$parent = document.querySelector('.wrapper');
    this.$parent.appendChild(this.$menuList);
    this.$menuList.innerHTML = `
    ${this.state.currentCategoryMenuItems.map((item, index) => {
      return `
      <li class="menu-list-item d-flex items-center py-2" data-id=${item.id}>
      <span class="w-100 pl-2 menu-name ${item.isSoldOut ? 'sold-out' : ''}">${item.name}</span>
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
    </li>
      `;
    }).join('')}
    
    `;
    this.$menuList.addEventListener('click', this.listClickListener)
  }
}
