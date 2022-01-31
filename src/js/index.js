const $ = selector => document.querySelector(selector);

const App = () => {
  const $menuForm = document.getElementById('menu-form');
  const $menuList = document.getElementById('menu-list');
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
  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;

    $('.menu-count').textContent = `총 ${menuCount}개`;
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

    $menuList.appendChild($li);
  };

  // 메뉴 리스트 렌더링
  const renderMenu = () => {
    if (!localStorage.getItem('menu')) return;

    const selectedMenuList = JSON.parse(localStorage.getItem('menu'))[
      selectedMenu
    ];

    $menuList.innerHTML = '';
    selectedMenuList.map(({ name, soldOut }) =>
      makeMenuTemplate(name, soldOut),
    );
    updateMenuCount();
  };

  // 메뉴 추가
  const addMenuName = () => {
    const $input = document.getElementById('menu-name');
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

  // 메뉴 변경에 따른 localStorage 업데이트
  const updateLocalStorageMenu = updatedMenuList => {
    menuObj = JSON.parse(localStorage.getItem('menu'));
    menuObj[selectedMenu] = updatedMenuList;
    localStorage.setItem('menu', JSON.stringify(menuObj));
  };

  // 메뉴 품절 여부 토글
  const toggleSoldOut = ($li, idx, selectedMenuList) => {
    const $menuName = $li.firstElementChild;
    $menuName.classList.toggle('sold-out');

    // localStorage
    const isSoldOut = selectedMenuList[idx]['soldOut'];
    selectedMenuList[idx]['soldOut'] = isSoldOut ? false : true;
    updateLocalStorageMenu(selectedMenuList);
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
    updateLocalStorageMenu(selectedMenuList);
  };

  // 메뉴 삭제
  const deleteMenu = ($li, idx, selectedMenuList) => {
    const $selectedMenu = $li;
    const result = window.confirm('정말 삭제하시겠습니까?');

    if (!result) return;

    $menuList.removeChild($selectedMenu);
    updateMenuCount();

    // localStorage
    selectedMenuList = selectedMenuList.filter((_, index) => index !== idx);
    updateLocalStorageMenu(selectedMenuList);
  };

  // event
  // form의 submit default 이벤트 막기
  $menuForm.addEventListener('submit', e => {
    e.preventDefault();
  });

  // 확인 버튼 클릭 시, 메뉴 추가
  $menuForm.addEventListener('click', e => {
    if (e.target.id !== 'menu-submit-button') return;

    addNewMenu();
  });

  // Enter 키 입력 시, 메뉴 추가
  $menuForm.addEventListener('keyup', e => {
    if (e.key !== 'Enter') return;

    addNewMenu();
  });

  // 메뉴별 품절, 수정, 삭제 버튼 클릭 이벤트
  $menuList.addEventListener('click', e => {
    const $li = e.target.closest('li');
    const idxOfLi = [...$menuList.children].findIndex(li => li === $li);
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
};
App();
