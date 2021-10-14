import store, {
	addEspresso,
	editEspresso,
	removeEspresso,
} from '../js/store/index.js';
import { EVENTS, SELECTORS, MESSAGES } from './constants.js';
import { $, addEvent, getUUID } from './utils/index.js';

const $input = $(SELECTORS.CLASS.INPUT_FIELD);
const $form = $(SELECTORS.ID.ESPRESSO_MENU_FORM);
const $ul = $(SELECTORS.ID.ESPRESSO_MENU_LIST);
const $menuCount = $(SELECTORS.CLASS.MENU_COUNT);

const menuTotalCountTemplate = (cnt) => {
	return `총 ${cnt}개`;
};

const menuItemTemplate = (item) => {
	return `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${item.name}</span>
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
			store.dispatch(removeEspresso(id));
		}
	}
};
const onEdit = (e) => {
	const { target } = e;
	if (target.closest(SELECTORS.CLASS.MENU_EDIT_BUTTON)) {
		const id = target.dataset.id;
		const name = store.getState().espresso.find((es) => es.id === id).name;
		const newItem = prompt(MESSAGES.PROMPT_EDIT_MENU, name);
		if (newItem) {
			store.dispatch(editEspresso({ id, name: newItem }));
		}
	}
};

const onSubmit = (e) => {
	e.preventDefault();
	if ($input.value) {
		store.dispatch(addEspresso({ id: getUUID(), name: $input.value }));
		$input.value = '';
	}
};

addEvent($ul, EVENTS.click, onDelete);
addEvent($ul, EVENTS.click, onEdit);
addEvent($form, EVENTS.submit, onSubmit);

const render = () => {
	const { espresso } = store.getState();
	$ul.innerHTML = espresso.map(menuItemTemplate).join('');
	$menuCount.innerHTML = menuTotalCountTemplate(espresso.length || 0);
};

store.subscribe(render);
render();
