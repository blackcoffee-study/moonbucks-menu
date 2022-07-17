const menu = document.querySelector('#espresso-menu-name');
const menuCount = document.querySelector('.menu-count');
const menuList = document.querySelector('#espresso-menu-list');
const submitButton = document.querySelector('#espresso-menu-submit-button');

let list = []

function render() {
    const totalCount = list.length;
    menuCount.textContent = totalCount;

    const li = list.map(({ title }, index) => (
        `<li class="menu-list-item d-flex items-center py-2" key=${index}>
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
}

function editMenu(index) {
    let value = prompt("수정 값을 입력하세요", "");

    list[index].title = value

    render();
}

function removeMenu(index) {
    if (window.confirm("이 메뉴를 삭제하시겠습니까?")) {
        const filteredMenu = list.filter((_, i) => i !== index);

        list = filteredMenu
    }

    render();
}

menu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addMenu();
    }
})

submitButton.addEventListener('click', addMenu)

const editButton = document.querySelectorAll('.menu-edit-button');
const removeButton = document.querySelectorAll('.menu-remove-button');

if (list.length > 0) {
    editButton.forEach((button, index) => {
        button.addEventListener('click', function () {
            editMenu(index)
        })
    })

    removeButton.forEach((button, index) => {
        button.addEventListener('click', function () {
            removeMenu(index);
        })
    })
}



