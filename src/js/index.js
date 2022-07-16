import { $ } from './utils/dom.js';

let orderedMenuCount = 0;
const espressoMenuCount = $('.menu-count');
const espressoMenuForm = $('#espresso-menu-form');
const espressoMenuInput = $('#espresso-menu-name');
const espressoMenuList = $('#espresso-menu-list');

const updateEspressoMenuCount = (number) => {
  orderedMenuCount += number;
  espressoMenuCount.innerText = `총 ${orderedMenuCount}개`;
};

espressoMenuForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const menuName = espressoMenuInput.value;

  if (menuName) {
    const content = `
      <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuName}</span>
      <button
        type="button"
        data-action="edit"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        data-action="delete"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>
    `;

    espressoMenuList.insertAdjacentHTML('beforeend', content);
    espressoMenuForm.reset();
    updateEspressoMenuCount(+1);
  }
});

espressoMenuList.addEventListener('click', (event) => {
  const currentTarget = event.target;
  switch (currentTarget?.dataset.action) {
    case 'edit':
      const newMenuName = prompt('메뉴명을 수정하세요.');
      currentTarget.previousElementSibling.innerText = newMenuName;
      break;
    case 'delete':
      const deleteFlag = confirm('정말 삭제하시겠습니까?');
      if (deleteFlag) {
        const deleteMenu = currentTarget.closest('.menu-list-item');
        deleteMenu.remove();
      }
      updateEspressoMenuCount(-1);
      break;
  }
});
