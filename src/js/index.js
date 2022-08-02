const menuName = document.querySelector('#espresso-menu-name');
const menuList = document.querySelector('#espresso-menu-list');
const menuCountText = document.querySelector('.menu-count');
const submitButton = document.querySelector('#espresso-menu-submit-button');

const menuItemTemplate = (menuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
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
    </li>`
};

const updateMenuCount = () => {
    const menuCount = menuList.querySelectorAll('li').length;
    menuCountText.innerText = `총 ${menuCount} 개`
};

const addMenuName = () => {
    if (menuName.value === '') {
        alert("에스프레소 메뉴 이름을 입력해주세요.");
        return;
    }

    const espressoMenuName = menuName.value;

    menuList.insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
    updateMenuCount();
    menuName.value = "";
}

const updateMenuName = (event) => {
    const menuName = event.target.closest('li').querySelector('.menu-name');
    const updateMenuName = prompt("수정 값을 입력하세요", menuName.innerText);

    menuName.innerText = updateMenuName;
}

const removeMenuName = (event) => {
    if (window.confirm("이 메뉴를 삭제하시겠습니까?")) {
        event.target.closest('li').remove();
        updateMenuCount();
    }
}

submitButton.addEventListener('click', addMenuName)

menuName.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
        return
    }

    addMenuName();
})

menuList.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-edit-button')) {
        updateMenuName(event);
    }

    if (event.target.classList.contains('menu-remove-button')) {
        removeMenuName(event);
    }
})

menuList.addEventListener('submit', (event) => {
    event.preventDefault();
})
