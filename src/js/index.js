import { menuItemTemplate } from './template/menu.js';

const BASE_URL = 'http://localhost:3000/api';

const $addMenuBtn = document.getElementById('espresso-menu-submit-button');
const $menuList = document.getElementById('espresso-menu-list');
const $inputMenu = document.getElementById('espresso-menu-name');
const $totalNum = document.querySelector('.menu-count');
const $categoryNav = document.querySelector('nav');

const store = {
	setLocalStorage(menuArrs) {
		localStorage.setItem('menu', JSON.stringify(menuArrs));
	},
	getLocalStorage() {
		return JSON.parse(localStorage.getItem('menu'));
	},
};

const MenuApi = {
	async getAllMenuByCategory(category) {
		const response = await fetch(`${BASE_URL}/category/${category}/menu`);
		return response.json();
	},
	async createMenu(category, name) {
		const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			console.error('error');
		}
		return response.json();
	},
	async updateMenu(category, menu, menuId) {
		const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ menu }),
		});
		if (!response.ok) {
			console.error('error');
		}
		return response.json();
	},
};

function App() {
	this.menuArrs = {
		espresso: [],
		frappuccino: [],
		blended: [],
		desert: [],
		teavana: [],
	};
	this.currentCategory = 'espresso';

	this.init = async () => {
		this.menuArrs[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
		renderMenuList();
	};

	const renderMenuList = () => {
		$menuList.innerText = '';
		const template = this.menuArrs[this.currentCategory]
			.map((menuItem) => {
				return menuItemTemplate(menuItem);
			})
			.join('');
		$menuList.innerHTML = template;
		undateMenuCount();
	};

	const isMenuInputEmpty = (e) => {
		const inputMenuName = document.getElementById('espresso-menu-name').value;
		if (inputMenuName == '') {
			return;
		} else {
			addMenuList(inputMenuName);
			$inputMenu.value = '';
		}
	};

	const addMenuList = async (inputMenuName) => {
		this.menuArrs[this.currentCategory] = MenuApi.getAllMenuByCategory(this.currentCategory);
		console.log('메뉴' + this.menuArrs[this.currentCategory]);
		console.log('할당' + MenuApi.getAllMenuByCategory(this.currentCategory));
		await MenuApi.createMenu(this.currentCategory, inputMenuName);
		renderMenuList();
		// console.log(this.menuArrs[this.currentCategory]);
		// 먼저 작성한 코드가 먼저 작동되지 않을 수 있다. 비동기 통신의 순서를 보장하기 위해서 async await을 사용한다.
	};

	const removeItemFromArray = ($targetMenuName, event) => {
		const targetId = $targetMenuName.dataset.menuId;
		this.menuArrs[this.currentCategory].splice(targetId, 1);
		store.setLocalStorage(this.menuArrs);
	};

	const undateMenuCount = () => {
		const totalNum = this.menuArrs[this.currentCategory].length;
		$totalNum.innerText = `총 ${totalNum}개`;
	};

	const updateMenu = async (e) => {
		const menuId = e.target.closest('li').dataset.menuId;
		const $targetMenuName = e.target.closest('li').querySelector('span');
		const newMenuName = prompt('수정하고 싶은 메뉴명을 입력해주세요!');
		if (newMenuName === '') {
			return;
		}
		await MenuApi.updateMenu(this.currentCategory, newMenuName, menuId);
		$targetMenuName.innerText = newMenuName;
		// this.menuArrs[this.currentCategory].menuName = newMenuName;
		renderMenuList();
	};

	const deleteMenu = (e) => {
		const $targetMenuLi = e.target.closest('li');
		if (confirm('선택하신 메뉴를 삭제하시겠습니까?')) {
			removeItemFromArray($targetMenuLi);
			renderMenuList(this.menuArrs);
			undateMenuCount(this.menuArrs);
			return;
		}
	};

	const soldOutMenu = (e) => {
		const $targetMenuLi = e.target.closest('li');
		const menuId = $targetMenuLi.dataset.menuId;
		this.menuArrs[this.currentCategory][menuId].soldOut = !this.menuArrs[this.currentCategory][menuId].soldOut;
		store.setLocalStorage(this.menuArrs);
		renderMenuList(this.menuArrs);
	};

	$menuList.addEventListener('click', (e) => {
		if (e.target.classList.contains('menu-edit-button')) {
			updateMenu(e);
			return;
		}
		if (e.target.classList.contains('menu-remove-button')) {
			deleteMenu(e);
			return;
		}
		if (e.target.classList.contains('menu-sold-out-button')) {
			soldOutMenu(e);
			return;
		}
	});

	$addMenuBtn.addEventListener('click', isMenuInputEmpty);
	$addMenuBtn.addEventListener('keypress', isMenuInputEmpty);
	$categoryNav.addEventListener('click', (e) => {
		const isCategoryBtn = e.target.classList.contains('cafe-category-name');
		if (isCategoryBtn) {
			const categoryName = e.target.dataset.categoryName;
			this.currentCategory = categoryName;
			const targetCategoryTitle = document.querySelector('#category-title');
			const targetCategoryLabel = document.querySelector('#espresso-menu-name');
			targetCategoryTitle.innerText = `${e.target.innerText} 메뉴관리`;
			targetCategoryLabel.innerText = `${e.target.innerText} 메뉴 이름`;
			renderMenuList(renderMenuList(this.menuArrs[this.currentCategory]));
		}
	});
}
const app = new App();
app.init();
