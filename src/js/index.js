const $ = (selector) => document.querySelector(selector);
const menuForm = $('#espresso-menu-form');
const menuInput = $('#espresso-menu-name');
const menuBtn = $('#espresso-menu-submit-button');
const menuList = $('#espresso-menu-list');

const setMenuLength = () => {
    const menuLength = menuList.querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuLength}개`;
}

const addMenu = () => {
    const menuName = menuInput.value;
    if(menuInput.value === ''){
        alert('메뉴명을 입력해주세요.');
        menuInput.focus();
        return;
    }
    const menuTemplate = (menuName) => {
        return `
            <li class="menu-list-item d-flex items-center py-2">
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
    }

        menuList.insertAdjacentHTML('beforeend', menuTemplate(menuName));
        menuInput.value = '';
        setMenuLength();
}

const menuEdit = (e) => {
    const currentName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt('변경할 메뉴명을 입력해주세요.', currentName.innerText);
    if(newMenuName === '' || newMenuName === null){
        return;
    }
    currentName.innerText = newMenuName;
}

const menuRemove = (e) => {
    if(!confirm('해당 메뉴를 삭제하시겠습니까?')){
        return;
    }
    e.target.closest('li').remove();
    setMenuLength();
}

$('#espresso-menu-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-edit-button')){
        menuEdit(e);
    }else if(e.target.classList.contains('menu-remove-button')){
        menuRemove(e);
    }
});

menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

menuBtn.addEventListener('click', addMenu);
menuInput.addEventListener('keydown', (e) => {
    if(e.keyCode !== 13){
        return;
    }
    addMenu();
});