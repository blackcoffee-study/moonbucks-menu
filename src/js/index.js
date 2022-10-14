const $ = (selector) => document.querySelector(selector);

function App() {

	function countMenu() {
		const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
		$(".menu-count").innerText = `총 ${menuCount}개`;
		$("#espresso-menu-name").value = null;
	}
	
	function addMenu() {
		if ($("#espresso-menu-name").value === "") {
			alert("값을 입력해주세요");
			return;
		}
		const espressoMenuName = $("#espresso-menu-name").value;
		const menuItemTemplate = (espressoMenuName) => {
			return `
			<li class="menu-list-item d-flex items-center py-2">
				<span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
		$("#espresso-menu-list").insertAdjacentHTML(
			"afterbegin",
			menuItemTemplate(espressoMenuName)
		);
		//<!-- beforebegin -->
		// <ul>
		// <!-- afterbegin -->
		// <li></li>
		// <!-- beforeend -->
		// </ul>
		// <!-- afterend -->
		countMenu();
	}

	function editMenu(e) {
		const $menuName = e.target.closest("li").querySelector(".menu-name");
		const menuName = $menuName.innerText;
		const newMenuName = prompt("메뉴명을 수정하세요", menuName);
		$menuName.innerText = newMenuName;
	}

	function removeMenu(e) {
		if (!confirm("삭제하시겠습니까?")) {
			return;
		}
		e.target.closest("li").remove();
		countMenu();
	}

	// form 태그가 자동으로 전송되는 것을 막아준다.
	$("#espresso-menu-form").addEventListener("submit", (e) => {
		e.preventDefault();
	});
	
	// 메뉴를 수정/삭제한다.
	$("#espresso-menu-list").addEventListener("click", (e) => {
		// 수정
		if (e.target.classList.contains("menu-edit-button")) {
			editMenu(e);
		}

		// 삭제
		if (e.target.classList.contains("menu-remove-button")) {
			removeMenu(e);
		}
	})

	// 메뉴를 추가한다.
	// 확인 버튼 클릭으로 추가
	$("#espresso-menu-submit-button").addEventListener("click", addMenu)
	// 엔터로 추가
	$("#espresso-menu-name").addEventListener("keypress", (e) => {
		if (e.key !== "Enter") {
			return;
		}
		addMenu();
	});

}

App();