import store, { stateFunctions, actions } from '../js/store/index.js';
import { EVENTS, SELECTORS, MESSAGES } from './constants.js';
import { $, addEvent } from './utils/index.js';

const $menuTitle = $('.menu-title');
const $inputLabel = $('.input-label');
const $input = $(SELECTORS.CLASS.INPUT_FIELD);
const $form = $(SELECTORS.ID.ESPRESSO_MENU_FORM);
const $ul = $(SELECTORS.ID.ESPRESSO_MENU_LIST);
const $menuCount = $(SELECTORS.CLASS.MENU_COUNT);
const $categoryTab = $('.nav-category-tab');

addEvent($categoryTab, EVENTS.click, (e) => {
	const { target } = e;
	if (target.closest('[data-category-name]')) {
		const clickedTab = target.dataset['categoryName'];
		actions.changeTabAct(clickedTab);
	}
});

const menuTitleTemplate = (tab) => {
	return `${tab} 메뉴 관리`;
};
const inputLabelTemplate = (tab) => {
	return `${tab} 메뉴 이름`;
};

const menuTotalCountTemplate = (cnt) => {
	return `총 ${cnt}개`;
};

const menuItemTemplate = (item) => {
	return `
  <li class="menu-list-item d-flex items-center py-2 ">
    <span class="w-100 pl-2 menu-name ${item.isSoldOut ? 'sold-out' : ''}">${
		item.name
	}</span>
    <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
		data-id="${item.id}"
		>
			${item.isSoldOut ? '입고' : '품절'}
		</button>
		<button
      type="button"
      class="
        bg-gray-50
        text-gray-500 text-sm
        mr-1
        menu-edit-button
      "
      data-id="${item.id}"
      >
      수정
      </button>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      data-id="${item.id}"
    >
      삭제
    </button>
  </li>
  `;
};

const onDelete = (e) => {
	const { target } = e;
	if (target.closest(SELECTORS.CLASS.MENU_REMOVE_BUTTON)) {
		const answer = confirm(MESSAGES.CONFIRM_REMOVE);
		if (answer) {
			const id = target.dataset.id;
			actions.deleteMenuAct(id);
		}
	}
};

const onToggleSoldOut = (e) => {
	const { target } = e;
	if (target.closest('.menu-sold-out-button')) {
		const id = target.dataset.id;
		actions.toggleSoldOutByCurrentMenuIdAct(id);
	}
};
const onEdit = (e) => {
	const { target } = e;
	if (target.closest(SELECTORS.CLASS.MENU_EDIT_BUTTON)) {
		const id = target.dataset.id;
		const menu = stateFunctions.findCurrentMenuById(id);
		const newName = prompt(MESSAGES.PROMPT_EDIT_MENU, menu.name);
		if (newName) {
			actions.editMenuAct(id, newName);
		}
	}
};

const onSubmit = (e) => {
	e.preventDefault();
	if ($input.value) {
		actions.addMenuAct($input.value);
		$input.value = '';
	}
};

addEvent($ul, EVENTS.click, onToggleSoldOut);
addEvent($ul, EVENTS.click, onDelete);
addEvent($ul, EVENTS.click, onEdit);
addEvent($form, EVENTS.submit, onSubmit);

const render = () => {
	const currentTab = stateFunctions.getCurrentTab();
	const currentMenuList = stateFunctions.getCurrentMenuList();
	$ul.innerHTML = currentMenuList.map(menuItemTemplate).join('');
	$input.setAttribute('placeholder', `${currentTab} 메뉴 이름`);
	$input.focus();
	$menuCount.innerHTML = menuTotalCountTemplate(currentMenuList.length || 0);
	$menuTitle.innerText = menuTitleTemplate(currentTab);
	$inputLabel.innerText = inputLabelTemplate(currentTab);
};

store.subscribe(render);
render();
