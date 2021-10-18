const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

function preventFormDefault(menuForm) {
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

function countMenuItem() {
    const menuCount = $('.menu-count')
    const $menuItem = $All('.menu-list-item');
    menuCount.innerText = `총 ${$menuItem.length}개`
}

function addingMenuItem(InputMenuName, menuList) {
    if (InputMenuName.value === '') alert('메뉴를 입력해주세요.');
    else {
        const menuName = InputMenuName.value;
        const menuItemTemplate  = (menuName) => {
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
        }

        menuList.insertAdjacentHTML('beforeend', menuItemTemplate(menuName));
        InputMenuName.value = '';

        return menuList;
    }
}

function adminAddingMenuItem(category, menuList) {
    const menuForm = $(`#${category}-menu-form`);
    const InputMenuName = $(`#${category}-menu-name`);
    const menuSubmitButton = $(`#${category}-menu-submit-button`);

    preventFormDefault(menuForm);

    InputMenuName.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            addingMenuItem(InputMenuName, menuList);
            countMenuItem();
        }
    });

    menuSubmitButton.addEventListener('click', () => {
        addingMenuItem(InputMenuName, menuList);
        countMenuItem();
    });
}

function editMenuItem(menuEditBtn) {
    const menuItemSpan = menuEditBtn.previousElementSibling;
    let menuName = menuItemSpan.innerText

    let newMenuName = prompt(`메뉴명을 수정하세요.`, menuName); 

    while (newMenuName == '')
        newMenuName = prompt('다시 입력하세요.', menuName);
    
    if (newMenuName != null){
        menuName = newMenuName;
        menuItemSpan.innerText = menuName;
    }
}

function removeMenuItem(menuRemoveBtn) {
    const menuItem = menuRemoveBtn.parentElement;
    if (confirm('삭제하시겠습니까?')) menuItem.remove();
    countMenuItem()
}

function app() {
    const category = $All('.cafe-category-name')[0].getAttribute('data-category-name');
    const menuList = $(`#${category}-menu-list`);
    
    adminAddingMenuItem(category, menuList);

    menuList.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu-edit-button')){
            const menuEditBtn = e.target;
            editMenuItem(menuEditBtn);
        } else if (e.target.classList.contains('menu-remove-button')){
            const menuRemoveBtn = e.target;
            removeMenuItem(menuRemoveBtn);
        }
    });



}

app();
