const $ = selector => document.querySelector(selector);

$('#espresso-menu-submit-button').addEventListener('click', addMenu);

$('#espresso-menu-name').addEventListener('keypress', function (event) {
    if (event.key != 'Enter') {
        return;
    }
    event.preventDefault();
    addMenu();
});

$('#espresso-menu-list').addEventListener('click', function (event) {
    if (
        event.target.nodeName == 'BUTTON' &&
        event.target.classList.contains('menu-edit-button')
    ) {
        event.target.previousElementSibling.innerText = prompt(
            '메뉴명을 수정하세요',
            event.target.previousElementSibling.innerText,
        );
    } else if (
        event.target.nodeName == 'BUTTON' &&
        event.target.classList.contains('menu-remove-button')
    ) {
        if (confirm('정말 삭제하시겠습니까?')) {
            event.target.parentElement.remove();
            showMenuCount();
        }
    }
});

function addMenu() {
    const $menuName = $('#espresso-menu-name');
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

    $('#espresso-menu-list').innerHTML += menuItem;
    $menuName.value = '';
    showMenuCount();
}

function showMenuCount() {
    const menuCount = $('#espresso-menu-list').childElementCount;
    $('.menu-count').innerText = `총 ${menuCount}개`;
}
