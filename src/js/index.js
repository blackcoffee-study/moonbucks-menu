// elem
const $espressoMenuForm = document.getElementById('espresso-menu-form');
const $input = document.getElementById('espresso-menu-name');

// 메뉴 추가
const addNewMenu = menuName => {
  const $espressoMenuList = document.getElementById('espresso-menu-list');

  const $li = document.createElement('li');
  $li.classList.add('menu-list-item', 'd-flex', 'items-center', 'py-2');
  $li.innerHTML = `
    <span class="w-100 pl-2 menu-name">${menuName}</span>
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
  `;

  $espressoMenuList.appendChild($li);
};

// 총 메뉴갯수 count
const getTotalMenuNum = () => {
  const $espressoMenuList = document.getElementById('espresso-menu-list');
  const $menuCount = document.querySelector('.menu-count');

  const totalMenuNum = $espressoMenuList.children.length;
  $menuCount.textContent = `총 ${totalMenuNum}개`;
};

// event
// form의 submit default 이벤트 막기
$espressoMenuForm.addEventListener('submit', e => {
  e.preventDefault();
});

// 확인 버튼 클릭 시, 메뉴 추가
$espressoMenuForm.addEventListener('click', e => {
  if (e.target.id !== 'espresso-menu-submit-button') return;
  if ($input.value.trim() === '') {
    $input.value = '';
    return;
  }
  const menuName = $input.value;
  addNewMenu(menuName);
  $input.value = '';
  getTotalMenuNum();
});

// Enter 키 입력 시, 메뉴 추가
$input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    if ($input.value.trim() === '') {
      $input.value = '';
      return;
    }

    const menuName = $input.value;
    addNewMenu(menuName);
    $input.value = '';
    getTotalMenuNum();
  }
});
