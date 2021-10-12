// 요소들을 가져오는 부분
const $menuNameInput = document.getElementById('espresso-menu-name');
const $menuSubmitButton = document.getElementById('espresso-menu-submit-button');
const $menuList = document.getElementById('espresso-menu-list');
const $menuForm = document.getElementById('espresso-menu-form');


// 함수를 정의하는 부분
function addMenu(event) {
    event.preventDefault();
    if ($menuNameInput.value === "") { 
        return
    }
    else {
        addItem();
    }
}

function addItem() {
    const $menuItem = document.createElement('li');
    $menuItem.setAttribute("class", "espresso-menu-item d-flex items-center py-2");
    $menuItem.innerHTML = `
        <span class="w-100 pl-2 menu-name">${$menuNameInput.value}</span>
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
    $menuList.appendChild($menuItem);

    $menuNameInput.value = "";
}

// 메뉴 추가 이벤트(click, submit)
function init() {
    $menuSubmitButton.addEventListener('click', addMenu);
    $menuForm.addEventListener('submit', addMenu);
}

init();