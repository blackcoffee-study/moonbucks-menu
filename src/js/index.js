const menu = document.querySelector('#espresso-menu-name');
const menuCount = document.querySelector('.menu-count');
const menuList = document.querySelector('#espresso-menu-list');
const submitButton = document.querySelector('#espresso-menu-submit-button');

let list = []

function getMenuCount() {
    const totalCount = list.length;
    menuCount.textContent = `총 ${totalCount}개`;
}

function render() {
    const li = list.map(({ title }) => (
        `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${title}</span>
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
        </li>`
    ));

    menuList.innerHTML = li.join('');
}

render();

function addMenu() {
    if (menu.value === '') {
        alert("에스프레소 메뉴 이름을 입력해주세요.");
        return false;
    }

    list = [
        ...list,
        { title: menu.value }
    ]

    menu.value = '';

    render();

    getMenuCount();
}

menu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addMenu();
    }
})

submitButton.addEventListener('click', addMenu)

menuList.addEventListener('click', function (event) {
    if (event.target.classList.contains('menu-edit-button')) {
        const value = prompt("수정 값을 입력하세요", "");

        event.target.closest('li').querySelector('.menu-name').innerText = value;
    }

    if (event.target.classList.contains('menu-remove-button')) {
        if (window.confirm("이 메뉴를 삭제하시겠습니까?")) {
            event.target.closest('li').remove();
            getMenuCount();
        }
    }
})

