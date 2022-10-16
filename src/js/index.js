import { $ } from "./utils/dom.js";
import { store } from "./store/index.js";

function App() {
	// 상태는 변하는 데이터 - 메뉴명
	this.menu = {
		espresso: [],
		frappuccino: [],
		blended: [],
		teavana: [],
		desert: [],
	};
	this.currentCategory = "espresso";
	this.init = () => {
		if (!store.getLocalStorage()) {
			return;
		}
		this.menu = store.getLocalStorage();
		render();
		initEventListeners();
	}

	const render = () => {
		const template = this.menu[this.currentCategory]
		.map((item, index) => {
			return `
			<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
				<span class="w-100 pl-2 menu-name ${
					item.soldOut ? "sold-out" : ""
				} ">${item.name}</span>
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
		})
		.join("");
		$("#menu-list").innerHTML = template;
		countMenu();
	}

	const countMenu = () => {
		const menuCount = this.menu[this.currentCategory].length;
		$(".menu-count").innerText = `총 ${menuCount}개`;
	}
	
	const addMenu = () => {
		if ($("#menu-name").value === "") {
			alert("값을 입력해주세요");
			return;
		}
		const menuName = $("#menu-name").value;
		this.menu[this.currentCategory].push({ name: menuName });
		store.setLocalStorage(this.menu);
		render();
		$("#menu-name").value = "";
	}

	const editMenu = (e) => {
		const menuId = e.target.closest("li").dataset.menuId;
		const $menuName = e.target.closest("li").querySelector(".menu-name");
		const newMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
		this.menu[this.currentCategory][menuId].name = newMenuName;
		store.setLocalStorage(this.menu);
		render();
	}

	const removeMenu = (e) => {
		if (!confirm("삭제하시겠습니까?")) {
			return;
		}
		const menuId = e.target.closest("li").dataset.menuId;
		this.menu[this.currentCategory].splice(menuId, 1);
		store.setLocalStorage(this.menu);
		render();
	}

	const soldOutMenu = (e) => {
		const menuId = e.target.closest("li").dataset.menuId;
		this.menu[this.currentCategory][menuId].soldOut =
			!this.menu[this.currentCategory][menuId].soldOut;
		store.setLocalStorage(this.menu);
		render();
	}

	const initEventListeners = () => {
		
		// form 태그가 자동으로 전송되는 것을 막아준다.
		$("#menu-form").addEventListener("submit", (e) => {
			e.preventDefault();
		});
		
		// 메뉴를 품절/수정/삭제한다.
		$("#menu-list").addEventListener("click", (e) => {
			// 품절
			if (e.target.classList.contains("menu-sold-out-button")) {
				soldOutMenu(e);
				return;
			}
			// 수정
			if (e.target.classList.contains("menu-edit-button")) {
				editMenu(e);
				return;
			}
			// 삭제
			if (e.target.classList.contains("menu-remove-button")) {
				removeMenu(e);
				return;
			}
		})
		
		// 메뉴를 추가한다.
		// 확인 버튼 클릭으로 추가
		$("#menu-submit-button").addEventListener("click", addMenu)
		// 엔터로 추가
		$("#menu-name").addEventListener("keypress", (e) => {
			if (e.key !== "Enter") {
				return;
			}
			addMenu();
		});
		
		$("nav").addEventListener("click", (e) => {
			const isCategoryButton = e.target.classList.contains("cafe-category-name");
			if (!isCategoryButton) {
				return;
			}
			const categoryName = e.target.dataset.categoryName;
			this.currentCategory = categoryName;
			$("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
			render();
		})
	}
}
	
const app = new App();
app.init();