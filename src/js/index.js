import  { menuItemTemplate } from "./template/menu.js"

const $addMenuBtn = document.getElementById("espresso-menu-submit-button");
const $menuList = document.getElementById("espresso-menu-list");
const $inputMenu = document.getElementById("espresso-menu-name");
const $totalNum = document.querySelector(".menu-count");
const $categoryNav = document.querySelector('nav');

const store = {
	setLocalStorage(menuArrs) {
		localStorage.setItem('menu', JSON.stringify(menuArrs));
	},
	getLocalStorage() {
		return JSON.parse(localStorage.getItem('menu'));
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

	this.init = () => {
		if (store.getLocalStorage()) {
			this.menuArrs = store.getLocalStorage();
		}
		renderMenuList(this.menuArrs);
	};
	const renderMenuList = () => {
		$menuList.innerText = '';
		const template = this.menuArrs[this.currentCategory]
			.map((menuArr, index) => {
				return menuItemTemplate(menuArr, index);
			})
			.join('');
		$menuList.innerHTML = template;
		undateCount();
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

	const addMenuList = (inputMenuName) => {
		this.menuArrs[this.currentCategory].push({ menuName: inputMenuName });
		store.setLocalStorage(this.menuArrs);
		renderMenuList(this.menuArrs);
		undateCount(this.menuArrs);
	};

	const removeItemFromArray = ($targetMenuName, event) => {
		const targetId = $targetMenuName.dataset.menuId;
		this.menuArrs[this.currentCategory].splice(targetId, 1);
		store.setLocalStorage(this.menuArrs);
	};

	const undateCount = () => {
		const totalNum = this.menuArrs[this.currentCategory].length;
		$totalNum.innerText = `총 ${totalNum}개`;
	};

	$menuList.addEventListener('click', function updateMenu(event) {
		const $targetMenuName = event.target.closest('li');
		const menuId = $targetMenuName.dataset.menuId;

		if (event.target.classList.contains('menu-edit-button')) {
			const newMenuName = prompt('수정하고 싶은 메뉴명을 입력해주세요!');
			if (newMenuName === '') {
				return;
			}
			$targetMenuName.innerText = newMenuName;
			this.menuArrs[this.currentCategory.menuId].menuName = newMenuName;
			store.setLocalStorage(this.menuArrs);
		}
		if (event.target.classList.contains('menu-remove-button')) {
			if (confirm('선택하신 메뉴를 삭제하시겠습니까?')) {
				removeItemFromArray($targetMenuName);
				renderMenuList(this.menuArrs);
				undateCount(this.menuArrs);
			}
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
			targetCategoryTitle.innerText = `${e.target.innerText} 메뉴관리`;
			renderMenuList(renderMenuList(this.menuArrs[this.currentCategory]));
		}
	});
}
const app = new App();
app.init();