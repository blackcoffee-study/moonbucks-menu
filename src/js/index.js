function MenuApp() {
	this.menuItems = [];
	this.menuList = new MenuList();
	this._id = 0;

	this.setState = updatedItems => {
		this.menuItems = updatedItems;
		this.menuList.setState(this.menuItems);
		this.handleEditClick();
		this.handleRemoveClick();
		this.handleSoldOutClick();
	};


	new MenuInput({
		onAdd: contents => {
			this._id++;
			const template = menuTemplate(contents, this._id);
			this.menuItems.push({
				id : this._id,
				template : template,
				contents : contents
			});
			this.setState(this.menuItems);
		},
	});

	this.handleSoldOutClick = () => {
		const soldOutBtns = this.menuList.$menuList.querySelectorAll(".menu-sold-out-button")
		soldOutBtns.forEach((el) => el.addEventListener('click', () => {
			
		}));
	}

	this.handleEditClick = () => {
		const editBtns = this.menuList.$menuList.querySelectorAll(".menu-edit-button")
		editBtns.forEach((el) => el.addEventListener('click', () => {
			const prompt = window.prompt('수정할 내용을 입력하세요');
			const newMenuItems = this.menuItems.map((v) => {
				if(v.id === Number(el.parentElement.dataset.id)) {
					v.contents = prompt;
					v.template = menuTemplate(v.contents, v.id);
				}
				return v;
			})
			this.setState(newMenuItems);
		}));
	}

	this.handleRemoveClick = () => {
		const removeBtns = this.menuList.$menuList.querySelectorAll(".menu-remove-button")
		removeBtns.forEach((el) => el.addEventListener('click', () => {
			const confirm = window.confirm("정말 삭제하시겠습니까?")
			if(!confirm) return;
			const newMenuItems = this.menuItems.filter((v) => v.id !== Number(el.parentElement.dataset.id))
			this.setState(newMenuItems);
		}));
	}
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
		const template = items.reduce((acc, cur) => acc + cur.template, '');
		this.$menuList.innerHTML = template;
	};
}

function menuTemplate(contents, id) {
	return `<li class="menu-list-item d-flex items-center py-2" data-id=${id}>
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
