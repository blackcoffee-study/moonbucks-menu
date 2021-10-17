const $ = selector => document.querySelector(selector);

let currentCategoryName = '';
const currentMenuList = {
    espressoMenu: [],
    frappuccinoMenu: [],
    blendedMenu: [],
    teavanaMenu: [],
    desertMenu: [],
};
init();

const getFromLocalStorage = item => JSON.parse(localStorage.getItem(item));

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
            event.target.previousElementSibling.innerText = prompt(
                '메뉴명을 수정하세요',
                event.target.previousElementSibling.innerText,
            );
        } else if (event.target.classList.contains('menu-remove-button')) {
            if (confirm('정말 삭제하시겠습니까?')) {
                event.target.parentElement.remove();
                showMenuCount();
            }
        }
    });

    $('nav').addEventListener('click', e => {
        if (e.target.classList.contains('cafe-category-name')) {
            $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
            currentCategoryName = e.target.dataset.categoryName;
            showMenu();
        }
    });
}

function showMenu() {}

function addMenu() {
    const $menuName = $('#menu-name');
    if ($menuName.value.trim() == '') {
        alert('값을 입력해주세요.');
        $menuName.value = '';
        return;
    }

    const menuItem = `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${$menuName.value}</span>
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
    $menuName.value = '';
    showMenuCount();
}

function showMenuCount() {
    const menuCount = $('#menu-list').childElementCount;
    $('.menu-count').innerText = `총 ${menuCount}개`;
}
