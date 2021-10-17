const $ = selector => document.querySelector(selector);

let currentCategoryName = 'espresso';
let currentMenuList = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
};

const getFromLocalStorage = item => JSON.parse(localStorage.getItem(item));
const setToLocalStorage = menu =>
    localStorage.setItem('menu', JSON.stringify(menu));

function init() {
    if (localStorage.getItem('menu')) {
        currentMenuList = getFromLocalStorage('menu');
    }

    $('#menu-submit-button').addEventListener('click', addMenu);

    $('#menu-name').addEventListener('keypress', function (event) {
        if (event.key != 'Enter') {
            return;
        }
        event.preventDefault();
        addMenu();
    });

    $('#menu-list').addEventListener('click', function (event) {
        if (event.target.classList.contains('menu-edit-button')) {
            updateMenu(event);
        } else if (event.target.classList.contains('menu-remove-button')) {
            deleteMenu(event);
        }
    });

    $('nav').addEventListener('click', e => {
        if (e.target.classList.contains('cafe-category-name')) {
            $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
            currentCategoryName = e.target.dataset.categoryName;
            showMenu();
        }
    });

    showMenu();
}

function showMenu() {
    const currentMenu = currentMenuList[currentCategoryName];
    $('#menu-list').innerHTML = '';
    currentMenu.forEach((menuName, idx) => {
        const menuItem = `<li data-menu-idx=${idx} class="menu-list-item d-flex items-center py-2">
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
        </li>`;

        $('#menu-list').innerHTML += menuItem;
    });
}

function addMenu() {
    const $menuName = $('#menu-name');
    if ($menuName.value.trim() == '') {
        alert('값을 입력해주세요.');
        $menuName.value = '';
        return;
    }

    currentMenuList[currentCategoryName].push($menuName.value);
    setToLocalStorage(currentMenuList);
    $menuName.value = '';
    showMenu();
    showMenuCount();
}

function updateMenu(e) {
    const $menuName = e.target.previousElementSibling;
    const newMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    if (newMenuName == null) {
        return;
    } else if (newMenuName.trim() == '') {
        alert('값을 입력해주세요.');
        return;
    }

    const $menuItem = e.target.closest('.menu-list-item');
    const idx = $menuItem.dataset.menuIdx;
    currentMenuList[currentCategoryName][idx] = newMenuName;
    setToLocalStorage(currentMenuList);
    showMenu();
}

function deleteMenu(e) {
    if (confirm('정말 삭제하시겠습니까?')) {
        const $menuItem = e.target.closest('.menu-list-item');
        const idx = $menuItem.dataset.menuIdx;
        currentMenuList[currentCategoryName].splice(idx, 1);
        setToLocalStorage(currentMenuList);

        $menuItem.remove();
        showMenu();
        showMenuCount();
    }
}

function showMenuCount() {
    const menuCount = $('#menu-list').childElementCount;
    $('.menu-count').innerText = `총 ${menuCount}개`;
}

init();
