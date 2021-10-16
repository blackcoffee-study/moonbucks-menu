import store, {
	addEspresso,
	editEspresso,
	removeEspresso,
} from '../js/store/index.js';
import { EVENTS, SELECTORS, MESSAGES } from './constants.js';
import { getUUID } from './utils/index.js';

const $input = document.querySelector(SELECTORS.CLASS.INPUT_FIELD);
const $form = document.querySelector(SELECTORS.ID.ESPRESSO_MENU_FORM);
const $ul = document.querySelector(SELECTORS.ID.ESPRESSO_MENU_LIST);
const $menuCount = document.querySelector(SELECTORS.CLASS.MENU_COUNT);

const countTemplate = (cnt) => {
	return `총 ${cnt}개`;
};

const liTemplate = (item) => {
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
	// 삭제
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
$ul.addEventListener(EVENTS.click, onDelete);
$ul.addEventListener(EVENTS.click, onEdit);

const onSubmit = (e) => {
	e.preventDefault();
	if ($input.value) {
		store.dispatch(addEspresso({ id: getUUID(), name: $input.value }));
		$input.value = '';
	}
};
$form.addEventListener(EVENTS.submit, onSubmit);

const render = () => {
	const { espresso } = store.getState();
	$ul.innerHTML = espresso.map(liTemplate).join('');
	$menuCount.innerHTML = countTemplate(espresso.length || 0);
};

store.subscribe(render);
render();
