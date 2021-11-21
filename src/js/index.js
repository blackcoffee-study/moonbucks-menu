import { $ } from "./utils/dom.js";
import { menuItemTemplate } from "./template/menu.js";

function MoonBucksMenuApp() {
	const $menuForm = $("#espresso-menu-form");
	const $menuList = $("#espresso-menu-list");
	const $menuCount = $(".menu-count");
	const $menuName = $("#espresso-menu-name");
	const $menuSubmitButton = $("#espresso-menu-submit-button");

	const updateMenuCount = () => {
		const menuCount = $menuList.querySelectorAll("li").length;
		$menuCount.innerText = `총 ${menuCount}개`;
	};

	const addMenuName = () => {
		const espressoMenuName = $menuName.value;
		if (espressoMenuName === "") return alert("메뉴를 입력해주세요!");
		$menuList.insertAdjacentHTML(
			"beforeend",
			menuItemTemplate(espressoMenuName)
		);
		updateMenuCount();
		$menuName.value = "";
	};

	const updateMenuName = (e) => {
		const $targetMenuName = e.target.closest("li").querySelector(".menu-name");
		const updatedMenuName = prompt(
			"수정하고 싶은 메뉴명을 입력해주세요!",
			$targetMenuName.innerText
		);
		if (updatedMenuName === null) return;
		$targetMenuName.innerText = updatedMenuName;
	};

	const removeMenuName = (e) => {
		if (confirm("선택하신 메뉴를 삭제하시겠습니까?")) {
			e.target.closest("li").remove();
			updateMenuCount();
		}
	};

	$menuForm.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	$menuSubmitButton.addEventListener("click", addMenuName);

	$menuName.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return;
		addMenuName();
	});

	$menuList.addEventListener("click", (e) => {
		if (e.target.classList.contains("menu-edit-button")) {
			updateMenuName(e);
		}

		if (e.target.classList.contains("menu-remove-button")) {
			removeMenuName(e);
		}
	});
}

MoonBucksMenuApp();
