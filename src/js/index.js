// elem
const $espressoMenuForm = document.getElementById('espresso-menu-form');
const $espressoMenuList = document.getElementById('espresso-menu-list');

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
const makeMenuTemplate = menuName => {
  const $li = document.createElement('li');

  $li.classList.add('menu-list-item', 'd-flex', 'items-center', 'py-2');
  $li.innerHTML = `
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

const addMenuToLocalStorage = menuName => {
  let selectedMenuList =
    JSON.parse(localStorage.getItem('menu'))?.[selectedMenu] ||
    menuObj[selectedMenu];
  selectedMenuList.push({
    name: menuName,
    soldOut: false,
  });
  menuObj[selectedMenu] = selectedMenuList;
  localStorage.setItem('menu', JSON.stringify(menuObj));
};

// 메뉴 추가
const addNewMenu = () => {
  const $input = document.getElementById('espresso-menu-name');
  const menuName = $input.value;

  if ($input.value.trim() === '') {
    $input.value = '';
    return;
  }

  makeMenuTemplate(menuName);
  addMenuToLocalStorage(menuName);
  $input.value = '';
  updateTotalMenuNum();
};

// 메뉴 품절 여부 토글
const toggleSoldOut = ($li, idx, selectedMenuList) => {
  const $menuName = $li.firstElementChild;
  $menuName.classList.toggle('sold-out');

  // localStorage
  selectedMenuList[idx]['soldOut'] = !selectedMenuList[idx]['soldOut'];
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
  menuObj[selectedMenu] = selectedMenuList;
  localStorage.setItem('menu', JSON.stringify(menuObj));
};

// 메뉴 삭제
const deleteMenu = ($li, idx, selectedMenuList) => {
  const $selectedMenu = $li;
  const result = window.confirm('정말 삭제하시겠습니까?');

  if (!result) return;

  $espressoMenuList.removeChild($selectedMenu);

  // localStorage
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
    updateTotalMenuNum();
    return;
  }
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
  }
});
