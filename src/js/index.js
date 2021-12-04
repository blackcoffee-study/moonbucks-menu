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

// 메뉴 수정
const editMenu = target => {
  const $menuName = target.previousElementSibling;
  const editedName = window.prompt(
    '메뉴명을 수정하세요',
    $menuName.textContent,
  );

  if (editedName === null) return;

  $menuName.textContent = editedName;
};

// 메뉴 삭제
const deleteMenu = target => {
  const $selectedMenu = target.parentNode;
  const result = window.confirm('정말 삭제하시겠습니까?');

  if (!result) return;

  $espressoMenuList.removeChild($selectedMenu);
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

// 품절 버튼 클릭 시, 메뉴 품절 상태 토글
$espressoMenuList.addEventListener('click', e => {
  const $li = e.target.closest('li');
  const numOfLi = [...$espressoMenuList.children].findIndex(li => li === $li);

  if (!e.target.matches('.menu-sold-out-button')) return;

  const $menuName = e.target.previousElementSibling;
  $menuName.classList.toggle('sold-out');

  const selectedMenuList = JSON.parse(localStorage.getItem('menu'))[
    selectedMenu
  ];
  selectedMenuList[numOfLi]['soldOut'] = !selectedMenuList[numOfLi]['soldOut'];
  menuObj[selectedMenu] = selectedMenuList;
  localStorage.setItem('menu', JSON.stringify(menuObj));
});

// 수정 버튼 클릭 시, 메뉴 이름 수정
$espressoMenuList.addEventListener('click', e => {
  if (!e.target.matches('.menu-edit-button')) return;

  editMenu(e.target);
});

// 삭제 버튼 클릭 시, 메뉴 삭제
$espressoMenuList.addEventListener('click', e => {
  if (!e.target.matches('.menu-remove-button')) return;

  deleteMenu(e.target);
  updateTotalMenuNum();
});
