import store, {
	addEspresso,
	editEspresso,
	removeEspresso,
} from '../js/store/index.js';
import { getUUID } from './utils/index.js';

const $input = document.querySelector('.input-field');
const $form = document.querySelector('#espresso-menu-form');
const ul = document.querySelector('#espresso-menu-list');
const menuCount = document.querySelector('.menu-count');

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
	if (target.closest('.menu-remove-button')) {
		const answer = confirm(`정말로 삭제하시겠습니까?`);
		if (answer) {
			const id = target.dataset.id;
			store.dispatch(removeEspresso(id));
		}
	}
};
const onEdit = (e) => {
	const { target } = e;
	if (target.closest('.menu-edit-button')) {
		const id = target.dataset.id;
		const newItem = prompt('새로운 입력.');
		if (newItem) {
			store.dispatch(editEspresso({ id, name: newItem }));
		}
	}
};
ul.addEventListener('click', onDelete);
ul.addEventListener('click', onEdit);

const onSubmit = (e) => {
	e.preventDefault();
	if ($input.value) {
		store.dispatch(addEspresso({ id: getUUID(), name: $input.value }));
		$input.value = '';
	}
};
$form.addEventListener('submit', onSubmit);

const render = () => {
	const { espresso } = store.getState();
	ul.innerHTML = '';
	ul.innerHTML = espresso.map(liTemplate).join('');
	menuCount.innerHTML = countTemplate(espresso.length || 0);
};

store.subscribe(render);
render();
