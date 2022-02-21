(() => {
  // 2차
  const $nav = document.querySelector('.nav-menu');
  const $heading = document.querySelector('.heading > h2');
  const $menu_count = document.querySelector('.menu-count');
  const $input = document.getElementById('espresso-menu-name');
  const $button = document.getElementById('espresso-menu-submit-button');
  const $espresso_menu_list = document.getElementById('espresso-menu-list');
  const menu_title = {
    espresso: '에스프레소',
    frappuccino: '프라프치노',
    blended: '블렌디드',
    teavana: '티바나',
    desert: '디저트',
  };
  const input_menu_list = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
    count: 0,
    menu_type: 'espresso',
    pushItem(item) {
      this[this.menu_type] = this[this.menu_type].concat(item);
      this.increaseCount();
      localStorage.setItem(`${this.menu_type}`, JSON.stringify(this[this.menu_type]));
    },
    getMenuList() {
      const menu_list = JSON.parse(localStorage.getItem(`${this.menu_type}`));
      createMenuList(menu_list);
    },
    setMenuItem(list) {
      this[this.menu_type] = [...list];
    },
    setMenuType(type) {
      this.menu_type = type;
      $heading.textContent = `${menu_title[type]} 메뉴 관리`;
      localStorage.setItem('menu_type', this.menu_type);
    },
    getMenuItemsCount() {
      return this.count;
    },
    setCount(number) {
      this.count = number;
      $menu_count.textContent = `총 ${number}개`;
    },
    increaseCount() {
      $menu_count.textContent = `총 ${++this.count}개`;
    },
    decreaseCount() {
      $menu_count.textContent = `총 ${--this.count}개`;
    },
    editItem(value, id, field) {
      this[this.menu_type] = this[this.menu_type].map(item =>
        item.id !== id ? item : { ...item, [field]: value },
      );
      if (field === 'value') {
        document.getElementById(id).firstChild.textContent = value;
      }
      this.setMenuItem(this[this.menu_type]);
    },
    removeItem(id) {
      this[this.menu_type] = this[this.menu_type].filter(item => item.id !== id);
      document.getElementById(id).remove();
      this.decreaseCount();
      this.setMenuItem();
    },
  };

  const buttonList = {
    sold_out: {
      name: '품절',
      className: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button',
      handler({ target }) {
        const menu_item = target.previousSibling;
        const { id } = target.parentNode;
        const isSoldOut = ![...menu_item.classList].includes('sold-out');
        if (isSoldOut) {
          menu_item.classList.add('sold-out');
        } else {
          menu_item.classList.remove('sold-out');
        }
        input_menu_list.editItem(isSoldOut, id, 'sold_out');
      },
    },
    edit: {
      name: '수정',
      className: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button',
      handler({ target }) {
        const { id } = target.parentNode;
        const newValue = window.prompt('수정할 텍스트를 입력해주세요');
        input_menu_list.editItem(newValue, id, 'value');
      },
    },
    remove: {
      name: '삭제',
      className: 'bg-gray-50 text-gray-500 text-sm menu-remove-button',
      handler({ target }) {
        const result = window.confirm('정말 삭제하시겠습니까?');
        if (result) {
          const { id } = target.parentNode;
          input_menu_list.removeItem(id);
        }
      },
    },
  };

  const buttonElements = () => {
    const $fragment = document.createDocumentFragment();

    Object.keys(buttonList).forEach(key => {
      const $button = document.createElement('button');
      const { name: buttonName, className, handler } = buttonList[key];
      $button.className = className;
      $button.textContent = buttonName;
      $button.addEventListener('click', handler);
      $fragment.append($button);
    });
    return $fragment;
  };

  const createInnerElement = item => {
    const buttonGroup = buttonElements();
    const $fragment = document.createDocumentFragment();
    const $li = document.createElement('li');
    const $span = document.createElement('span');

    $li.className = 'menu-list-item d-flex items-center py-2';
    $li.id = item.id;
    $span.className = item.sold_out ? 'w-100 pl-2 menu-name sold-out' : 'w-100 pl-2 menu-name';
    $span.textContent = item.value;
    $fragment.append($span, buttonGroup);
    $li.append($fragment);
    return $li;
  };
  const createMenuList = menu_type => {
    [...$espresso_menu_list.children].forEach(node => {
      $espresso_menu_list.removeChild(node);
    });
    input_menu_list.setMenuType(menu_type);

    const res = localStorage.getItem(`${menu_type}`);
    if (res) {
      const $fragment = document.createDocumentFragment();
      const menu_list = JSON.parse(res);
      menu_list.forEach(item => {
        const new_menu_item = createInnerElement(item);
        $fragment.append(new_menu_item);
      });
      $espresso_menu_list.append($fragment);
      input_menu_list.setCount(menu_list.length);
      input_menu_list.setMenuItem(menu_list);
    }
  };
  $button.addEventListener('click', () => {
    if (!$input.value) return;
    const { count } = input_menu_list;
    const item = { value: $input.value, sold_out: false, id: `menu_item${count}` };
    input_menu_list.pushItem(item);

    const new_menu_item = createInnerElement(item);
    $espresso_menu_list.append(new_menu_item);

    $input.value = '';
  });
  window.addEventListener('DOMContentLoaded', () => {
    const menu_type = localStorage.getItem('menu_type') || input_menu_list.menu_type;
    createMenuList(menu_type);
  });
  $nav.addEventListener('click', ({ target }) => {
    if (!target.matches('button')) return;

    [...$espresso_menu_list.children].forEach(node => {
      $espresso_menu_list.removeChild(node);
    });
    const menu_type = target.dataset.categoryName;
    createMenuList(menu_type);
  });
})();
