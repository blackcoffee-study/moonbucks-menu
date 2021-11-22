'use strict';
import { menuItemTemplate } from "./template/memuList.js";
const $ = (selector) => document.querySelector(selector);


function AppMenu(){

    const $submitMenu = $('#espresso-menu-submit-button');
    const $menuForm = $("#espresso-menu-form");
    const $menuName = $('#espresso-menu-name');
    const $menuList = $("#espresso-menu-list");
    const $menuCount = $(".menu-count");

    const addMenu = () => {

        const item = $menuName.value;
        if (item){
            $menuList.insertAdjacentHTML(
                "beforeend",
                menuItemTemplate(item)
            );
            $menuName.focus();
            $menuName.value = null;
            sumMenu();
        }
    }

    const sumMenu = () => {
        const itemNumber = $menuList.querySelectorAll("li").length;
        $menuCount.innerText = `총${itemNumber}개`;
    }

    const editMenu = (e) => {
        const $targetMenuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt(
			"수정하고 싶은 메뉴명을 입력해주세요!",
			$targetMenuName.innerText
		);
		if (updatedMenuName === null) return;
		$targetMenuName.innerText = updatedMenuName;
    }

    const removeMenu = (e) => {
		if (confirm("선택하신 메뉴를 삭제하시겠습니까?")) {
			e.target.closest("li").remove();
            sumMenu();
		}
	};

    $menuForm.addEventListener("submit", (e) => {
		e.preventDefault();
	});
    $submitMenu.addEventListener("click", () => {addMenu()});
    $menuName.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return;
		addMenu();
	});
    $menuList.addEventListener("click", (e) => {
		if (e.target.classList.contains("menu-edit-button")) {
			editMenu(e);
		}

		if (e.target.classList.contains("menu-remove-button")) {
			removeMenu(e);
		}
	});
};

AppMenu();
