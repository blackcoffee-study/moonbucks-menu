export default function MenuList({ initialState, updateMenuItems, editMenuItems, deleteMenuItems }) {
  this.state = initialState;
  this.updateMenuItems = updateMenuItems;
  this.editMenuItems = editMenuItems;
  this.deleteMenuItems = deleteMenuItems;

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

  this.addMenuItem = (value) => {
    this.updateMenuItems(this.state.currentCategory, this.state.currentCategoryMenuItems, value);
    // this.setState({ ...this.state, currentCategoryMenuItems: [, ...this.state.currentCategoryMenuItems, { name: value }] });
    this.render();
  }


  this.editMenuItem = (target) => {
    const elementId = target.dataset.id;
    for (const child of target.childNodes) {
      if (child.classList && child.classList.contains('menu-name')) {
        const originMenu = child.innerText;
        const editedMenu = window.prompt('메뉴명을 수정하세요', child.innerText);
        if (editedMenu === originMenu) return;
        this.editMenuItems(originMenu, editedMenu)
        // child.innerText = editedMenu;
        // this.state.menuItems[elementId] = editedMenu;
        // this.setState(this.state);
        // this.updateMenuItems(this.state.categoryName, this.state);
        // this.render();
        break;
      }
    }
  };

  this.removeMenuItem = (target) => {

    const elementId = target.dataset.id;
    for (const child of target.childNodes) {
      if (child.classList && child.classList.contains('menu-name')) {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
          return;
        }
        const menuName = child.innerText;

        this.deleteMenuItems(menuName)
        // child.innerText = editedMenu;
        // this.state.menuItems[elementId] = editedMenu;
        // this.setState(this.state);
        // this.updateMenuItems(this.state.categoryName, this.state);
        // this.render();
        break;
      }
    }
    // this.state.currentCategoryMenuItems.splice(targetIndex, 1);

    // this.setState(this.state);
    // this.updateMenuItems(this.state.categoryName, this.state);
    // this.updateMenuItems(this.state.currentCategory, this.state.currentCategoryMenuItems, value);
    // this.render()

  };

  this.listClickListener = (event) => {
    const target = event.target;

    if (target.tagName !== 'BUTTON') return;

    const targetListItem = target.closest('li');

    if (target.classList.contains('menu-edit-button')) {
      this.editMenuItem(targetListItem)
    } else if (target.classList.contains('menu-remove-button')) {
      this.removeMenuItem(targetListItem);
    }

  }

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;
    console.log(this.state)
    this.render();
  }

  this.render = () => {
    this.$parent = document.querySelector('.wrapper');
    this.$parent.appendChild(this.$menuList);
    this.$menuList.innerHTML = `
    ${this.state.currentCategoryMenuItems.map((item, index) => {
      return `
      <li class="menu-list-item d-flex items-center py-2" data-id=${index}>
      <span class="w-100 pl-2 menu-name">${item.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button sold-out"
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
  // this.init = () => {
  //   console.log(this.categoryName)

  //   const getState = this.getLocalStorage(this.categoryName);
  //   this.setState(getState);
  // }
  // this.init();
}
