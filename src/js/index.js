import fetchData from './request.js';

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
    },
    getMenuList() {
      const menu_list = this[this.menu_type];
      createMenuList(menu_list);
    },

    setMenuType(type) {
      this.menu_type = type;
      $heading.textContent = `${menu_title[type]} 메뉴 관리`;
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
    },
    removeItem(id) {
      this[this.menu_type] = this[this.menu_type].filter(item => item.id !== id);
      document.getElementById(id).remove();
      this.decreaseCount();
    },
  };

  const buttonList = {
    sold_out: {
      name: '품절',
      className: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button',
      async handler({ target }) {
        const { id } = target.parentNode;
        const menu_item = document.getElementById(id).firstChild;
        const menu_type = input_menu_list.menu_type;

        const data = await fetchData('put', menu_type, id);

        if (data.isSoldOut) {
          menu_item.classList.add('sold-out');
        } else {
          menu_item.classList.remove('sold-out');
        }
        input_menu_list.editItem(data.isSoldOut, id, 'isSoldOut');
      },
    },
    edit: {
      name: '수정',
      className: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button',
      async handler({ target }) {
        const { id } = target.parentNode;
        const name = window.prompt('수정할 텍스트를 입력해주세요');
        const menu_type = input_menu_list.menu_type;
        const data = await fetchData('put', menu_type, id, name);

        if (data.name) {
          document.getElementById(id).firstChild.textContent = data.name;
        }
      },
    },
    remove: {
      name: '삭제',
      className: 'bg-gray-50 text-gray-500 text-sm menu-remove-button',
      handler({ target }) {
        const result = window.confirm('정말 삭제하시겠습니까?');

        if (result) {
          const { id } = target.parentNode;
          const menu_type = input_menu_list.menu_type;

          fetchData('delete', menu_type, id);

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
    $span.className = item.isSoldOut ? 'w-100 pl-2 menu-name sold-out' : 'w-100 pl-2 menu-name';
    $span.textContent = item.name;
    $fragment.append($span, buttonGroup);
    $li.append($fragment);
    return $li;
  };
  const createMenuList = async menu_type => {
    [...$espresso_menu_list.children].forEach(node => {
      $espresso_menu_list.removeChild(node);
    });
    input_menu_list.setMenuType(menu_type);

    const menu_list = (await fetchData('get', menu_type)) || [];
    const $fragment = document.createDocumentFragment();

    menu_list?.forEach(item => {
      const new_menu_item = createInnerElement(item);
      $fragment.append(new_menu_item);
    });
    $espresso_menu_list.append($fragment);
    input_menu_list.setCount(menu_list.length);
    input_menu_list[menu_type] = [...menu_list];
  };

  $button.addEventListener('click', async () => {
    if (!$input.value) return;

    const category = input_menu_list.menu_type;
    const item = await fetchData('post', category, $input.value);
    if (item) {
      input_menu_list.pushItem(item);

      const new_menu_item = createInnerElement(item);
      $espresso_menu_list.append(new_menu_item);
    }
    $input.value = '';
  });

  window.addEventListener('DOMContentLoaded', () => {
    const menu_type = input_menu_list.menu_type;
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
