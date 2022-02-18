(() => {
  // 2차
  // const $nav = document.querySelector('.nav-menu')
  const $menu_count = document.querySelector('.menu-count');
  const $input = document.getElementById('espresso-menu-name');
  const $button = document.getElementById('espresso-menu-submit-button');
  const $espresso_menu_list = document.getElementById('espresso-menu-list');
  const input_menu_list = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
    count: 0,
    menu_type: 'espresso',
    getMenuItemsCount() {
      return this.count;
    },
    increaseCount() {
      $menu_count.textContent = `총 ${++this.count}개`;
    },
    decreaseCount() {
      $menu_count.textContent = `총 ${--this.count}개`;
    },
    pushItem(value) {
      this[this.menu_type] = this[this.menu_type].concat(value);
    },
    editItem(value, id) {
      this[this.menu_type] = this[this.menu_type].map((item, idx) =>
        idx !== +id.replace('menu_item', '') ? item : value,
      );
      document.getElementById(id).firstChild.textContent = value;
    },
    removeItem(id) {
      this[this.menu_type] = this[this.menu_type].filter(
        (item, idx) => idx !== +id.replace('menu_item', ''),
      );
      document.getElementById(id).remove();
      this.decreaseCount();
    },
  };

  const buttonList = {
    edit: {
      name: '수정',
      className: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button',
      handler({ target }) {
        const { id } = target.parentNode;
        const newValue = window.prompt();
        input_menu_list.editItem(newValue, id);
      },
    },
    remove: {
      name: '삭제',
      className: 'bg-gray-50 text-gray-500 text-sm menu-remove-button',
      handler({ target }) {
        const result = window.confirm();
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

  const createInnerElement = (value, index) => buttons => {
    const $fragment = document.createDocumentFragment();
    const $li = document.createElement('li');
    $li.className = 'menu-list-item d-flex items-center py-2';
    $li.id = `menue_item${index}`;
    const $span = document.createElement('span');
    $span.className = 'w-100 pl-2 menu-name';
    $span.textContent = value;
    $fragment.append($span, buttons);
    $li.append($fragment);

    return $li;
  };

  $button.addEventListener('click', () => {
    if (!$input.value) return;

    const buttonGroup = buttonElements();

    input_menu_list.pushItem($input.value);
    input_menu_list.increaseCount();

    const { count } = input_menu_list;
    const new_menu_item = createInnerElement($input.value, count)(buttonGroup);
    $espresso_menu_list.append(new_menu_item);

    $input.value = '';
  });
})();
