function EspressoMenuApp() {
  this.espressoMenuItems = [];

  this.setState = (espressoMenuItems) => {
    this.espressoMenuItems = espressoMenuItems;
    this.EspressoMenuList.setState(this.espressoMenuItems);
    this.EspressoMenuItemCounter.updateCount(this.espressoMenuItems.length);
  };

  this.onMenuItemAdd = (name) => {
    const espressoMenuItem = new EspressoMenuItem({ name });
    this.espressoMenuItems.push(espressoMenuItem);
    this.setState(this.espressoMenuItems);
  };

  // Initialize
  (function () {
    this.EspressoMenuForm = new EspressoMenuForm({
      onMenuItemAdd: this.onMenuItemAdd,
    });
    this.EspressoMenuItemCounter = new EspressoMenuItemCounter();
    this.EspressoMenuList = new EspressoMenuList();

    this.setState([]);
  }.bind(this)());
}

function EspressoMenuForm({ onMenuItemAdd }) {
  this.espressoMenuInput = new EspressoMenuInput();

  const $espressoMenuForm = document.querySelector("#espresso-menu-form");
  const $espressoMenuSubmitButton = document.querySelector(
    "#espresso-menu-submit-button"
  );

  $espressoMenuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleEspressoMenuSubmit.bind(this)();

    // for Customized submit event
    return false;
  });
  $espressoMenuSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    handleEspressoMenuSubmit.bind(this)();
  });

  function handleEspressoMenuSubmit() {
    if (this.espressoMenuInput.isValidValue()) {
      return;
    }

    const typedValue = this.espressoMenuInput.getValue();
    onMenuItemAdd(typedValue);

    this.espressoMenuInput.resetInput();
    this.espressoMenuInput.focusOnInput();
  }
}

function EspressoMenuInput() {
  const $espressoMenuNameInput = document.querySelector("#espresso-menu-name");

  this.isValidValue = () => {
    const inputValue = $espressoMenuNameInput.value;

    // Check if false, falsy value ('', undefined, null)
    return !inputValue;
  };

  this.getValue = () => {
    return $espressoMenuNameInput.value;
  };

  this.resetInput = () => {
    $espressoMenuNameInput.value = "";
  };

  this.focusOnInput = () => {
    $espressoMenuNameInput.focus();
  };
}

function EspressoMenuItemCounter() {
  this.count = 0;

  const $espressoMenuItemCounter = document.querySelector(".menu-count");

  this.updateCount = (count) => {
    this.count = count;
    this.render();
  };

  this.render = () => {
    $espressoMenuItemCounter.innerHTML = `총 ${this.count}개`;
  };

  this.render();
}

function EspressoMenuItem({ name }) {
  this.name = name;

  this.getTemplateString = (key) => {
    return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${this.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          data-menu-key="${key}"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          data-menu-key="${key}"
        >
          삭제
        </button>
      </li>`;
  };
}

function EspressoMenuList() {
  const $menuList = document.querySelector("#espresso-menu-list");

  this.setState = (menuItems) => {
    this.menuItems = menuItems;
    this.render(this.menuItems);
  };

  this.render = (menuItems) => {
    const templateTagStringArray = menuItems.map((item, key) => {
      return item.getTemplateString(key);
    });
    $menuList.innerHTML = templateTagStringArray.join("");
  };
}

new EspressoMenuApp();
