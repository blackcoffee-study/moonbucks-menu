function MenuApp() {
	this.menuItems = [];
	this.menuList = new MenuList();

	this.setState = updatedItems => {
		this.menuItems = updatedItems;
		this.menuList.setState(this.menuItems);
	};

	new MenuInput({
		onAdd: contents => {
			const newMenuItem = menuItem(contents);
			this.menuItems.push(newMenuItem);
			// this.menuItems = [ <li>...</li> ,  <li>...</li>, ... ]
			this.setState(this.menuItems);
		},
	});
}

// 입력 받는 컴포넌트
function MenuInput({ onAdd }) {
  const $menuForm = document.querySelector("#espresso-menu-form");
	const $menuInput = document.querySelector("#espresso-menu-name");
	const $menuSubmitBtn = document.querySelector("#espresso-menu-submit-button");

	$menuSubmitBtn.addEventListener("click", event => this.addMenuItem(event));
  $menuForm.addEventListener('submit', event => this.addMenuItem(event));

	this.addMenuItem = event => {
    event.preventDefault();
    if(this.isValid($menuInput.value)) {
      onAdd($menuInput.value);
      $menuInput.value = "";
    } else {
      alert("잘못된 입력입니다");
    }
	};

	this.isValid = (newValue) => {
		if (newValue !== "") return true;
	};
}

// menuList 보여주는 컴포넌트
function MenuList() {
	this.$menuList = document.querySelector("#espresso-menu-list");

	this.setState = updatedMenuItems => {
		this.menuItems = updatedMenuItems;
		this.render(this.menuItems);
	};

	this.render = items => {
		const template = items.reduce((acc, cur) => acc + cur);
		this.$menuList.innerHTML = template;
	};
}

function menuItem(contents) {
	return `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name sold-out">${contents}</span>
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
</li>`;
}

new MenuApp();
