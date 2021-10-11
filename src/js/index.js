const $form = document.querySelector('#espresso-menu-form');
const $input = document.querySelector('#espresso-menu-name');
const $submitButton = document.querySelector('#espresso-menu-submit-button');
const $list = document.querySelector('#espresso-menu-list');


const addMenu = (meunValue) => {
  const newMenu = document.createElement('li');
  newMenu.className = 'menu-list-item d-flex items-center py-2';

  newMenu.innerHTML = `
  <span class="w-100 pl-2 menu-name">${meunValue}</span>
  <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
    수정
  </button>
  <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
    삭제
  </button>
  `;

  $list.appendChild(newMenu);
}

const submitMenu = (event) => {
  event.preventDefault();
  const inputValue = $input.value;

  if (inputValue === '') {
    alert('값을 입력해주세요.');
    return;
  }

  addMenu(inputValue);
  $input.value = '';
};

const editMenu = (target) => {
  for (const child of target.childNodes) {
    if (child.classList && child.classList.contains('menu-name')) {
      const string = window.prompt('메뉴명을 수정하세요', child.innerText);

      if (string === '') return;

      child.innerText = string;
      break;
    }
  }
};

const listClickListener = (event) => {
  const target = event.target;

  if (target.tagName !== 'BUTTON') return;

  const targetListItem = target.closest('li');

  if (target.classList.contains('menu-edit-button')) {
    editMenu(targetListItem)
  }

}

$submitButton.addEventListener('click', submitMenu);
$form.addEventListener('submit', submitMenu);

$list.addEventListener('click', listClickListener)