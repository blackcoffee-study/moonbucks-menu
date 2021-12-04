// elem
const $espressoMenuForm = document.getElementById('espresso-menu-form');
const $espressoMenuList = document.getElementById('espresso-menu-list');
const $nav = document.querySelector('nav');

let selectedMenu = 'espresso';
let menuObj = {
  blended: [],
  desert: [],
  espresso: [],
  frappuccino: [],
  teavana: [],
};

// 총 메뉴갯수 count
const updateTotalMenuNum = () => {
  const $menuCount = document.querySelector('.menu-count');

  const totalMenuNum = $espressoMenuList.children.length;
  $menuCount.textContent = `총 ${totalMenuNum}개`;
};

// 메뉴 li 만들기
const makeMenuTemplate = (menuName, soldOut) => {
  const $li = document.createElement('li');

  $li.classList.add('menu-list-item', 'd-flex', 'items-center', 'py-2');
  $li.innerHTML = soldOut
    ? `
      <span class="w-100 pl-2 menu-name sold-out">${menuName}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
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
    `
    : `
    <span class="w-100 pl-2 menu-name">${menuName}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
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

// 메뉴 리스트 렌더링
const renderMenu = () => {
  if (!localStorage.getItem('menu')) return;

  const selectedMenuList = JSON.parse(localStorage.getItem('menu'))[
    selectedMenu
  ];

  $espressoMenuList.innerHTML = '';
  selectedMenuList.map(({ name, soldOut }) => makeMenuTemplate(name, soldOut));
  updateTotalMenuNum();
};

// 메뉴 추가
const addNewMenu = () => {
  const $input = document.getElementById('espresso-menu-name');
  const menuName = $input.value;
  let selectedMenuList = [];

  if ($input.value.trim() === '') {
    $input.value = '';
    return;
  }

  // localStorage
  if (localStorage.getItem('menu')) {
    menuObj = JSON.parse(localStorage.getItem('menu'));
    selectedMenuList = menuObj[selectedMenu];
  }
  selectedMenuList.push({
    name: menuName,
    soldOut: false,
  });
  menuObj[selectedMenu] = selectedMenuList;
  localStorage.setItem('menu', JSON.stringify(menuObj));

  renderMenu();
  $input.value = '';
};

// 메뉴 품절 여부 토글
const toggleSoldOut = ($li, idx, selectedMenuList) => {
  const $menuName = $li.firstElementChild;
  $menuName.classList.toggle('sold-out');

  // localStorage
  const isSoldOut = selectedMenuList[idx]['soldOut'];
  selectedMenuList[idx]['soldOut'] = isSoldOut ? false : true;
  menuObj = JSON.parse(localStorage.getItem('menu'));
  menuObj[selectedMenu] = selectedMenuList;
  localStorage.setItem('menu', JSON.stringify(menuObj));
};

// 메뉴 수정
const editMenu = ($li, idx, selectedMenuList) => {
  const $menuName = $li.firstElementChild;
  const editedName = window.prompt(
    '메뉴명을 수정하세요',
    $menuName.textContent,
  );

  if (editedName === null) return;

  $menuName.textContent = editedName;

  // localStorage
  selectedMenuList[idx]['name'] = editedName;
  menuObj = JSON.parse(localStorage.getItem('menu'));
  menuObj[selectedMenu] = selectedMenuList;
  localStorage.setItem('menu', JSON.stringify(menuObj));
};

// 메뉴 삭제
const deleteMenu = ($li, idx, selectedMenuList) => {
  const $selectedMenu = $li;
  const result = window.confirm('정말 삭제하시겠습니까?');

  if (!result) return;

  $espressoMenuList.removeChild($selectedMenu);
  updateTotalMenuNum();

  // localStorage
  menuObj = JSON.parse(localStorage.getItem('menu'));
  menuObj[selectedMenu] = selectedMenuList.filter((_, index) => index !== idx);
  localStorage.setItem('menu', JSON.stringify(menuObj));
};

// event
// form의 submit default 이벤트 막기
$espressoMenuForm.addEventListener('submit', e => {
  e.preventDefault();
});

// 확인 버튼 클릭 시, 메뉴 추가
$espressoMenuForm.addEventListener('click', e => {
  if (e.target.id !== 'espresso-menu-submit-button') return;

  addNewMenu();
});

// Enter 키 입력 시, 메뉴 추가
$espressoMenuForm.addEventListener('keyup', e => {
  if (e.key !== 'Enter') return;

  addNewMenu();
});

// 메뉴별 품절, 수정, 삭제 버튼 클릭 이벤트
$espressoMenuList.addEventListener('click', e => {
  const $li = e.target.closest('li');
  const idxOfLi = [...$espressoMenuList.children].findIndex(li => li === $li);
  const selectedMenuList = JSON.parse(localStorage.getItem('menu'))[
    selectedMenu
  ];

  // 품절 버튼 클릭 시, 메뉴 품절 상태 토글
  if (e.target.matches('.menu-sold-out-button')) {
    toggleSoldOut($li, idxOfLi, selectedMenuList);
    return;
  }
  // 수정 버튼 클릭 시, 메뉴 이름 수정
  if (e.target.matches('.menu-edit-button')) {
    editMenu($li, idxOfLi, selectedMenuList);
    return;
  }
  // 삭제 버튼 클릭 시, 메뉴 삭제
  if (e.target.matches('.menu-remove-button')) {
    deleteMenu($li, idxOfLi, selectedMenuList);
    return;
  }
});

// nav 메뉴 클릭 시, 해당 메뉴 관리 보이기
$nav.addEventListener('click', e => {
  if (!e.target.classList.contains('cafe-category-name')) return;

  const categoryName = e.target.dataset.categoryName;
  const nameWithIcon = e.target.textContent;
  selectedMenu = categoryName;
  renderMenu();

  const $h2 = document.querySelector('main h2');
  $h2.textContent = `${nameWithIcon} 메뉴 관리`;
});

// 초기 렌더 및 새로고침 시, localStorage에 저장된 메뉴 렌더링
window.addEventListener('DOMContentLoaded', () => {
  renderMenu();
});
