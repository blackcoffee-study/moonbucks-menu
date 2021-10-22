const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

function preventFormDefault(menuForm) {
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

function getLocalStorageMenu() {
    const strMenu = localStorage.getItem('menu');
    let menu = [];
    if (strMenu !== null) menu = JSON.parse(strMenu);;

    return menu;
}

function setLocalStorageMenu(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
}

function setLocalStorageCategory(target) {
    const currentCategory = target.getAttribute('data-category-name');
    localStorage.setItem('category', currentCategory);
}

function changeCategoryTitle (target) {
    const categoryTitle = $('#category-title');
    categoryTitle.innerText = `${target.innerText} 메뉴 관리`;
}

function countMenuItem() {
    const menuCount = $('.menu-count')
    const $menuItem = $All('.menu-list-item');
    menuCount.innerText = `총 ${$menuItem.length}개`
}

function menuItemTemplate(menuName, menuId, ...status) {
    return `<li data-menu-id="${menuId}" class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name ${status}">${menuName}</span>
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
    </li>`
}

function addMenuItem(InputMenuName, menuList, category) {
    if (InputMenuName.value === '') {
        alert('메뉴를 입력해주세요.');
        return;
    }
    
    const menuName = InputMenuName.value;
    const menuId = Date.now();

    menuList.insertAdjacentHTML('beforeend', menuItemTemplate(menuName, menuId));
    InputMenuName.value = '';

    let menu = getLocalStorageMenu();

    if(menu.length == 0) {
        menu = {
            espresso : [],
            frappuccino : [],
            blended : [],
            teavana : [],
            desert : [],
        }
    }
    menu[category].push({ name : menuName, id : menuId });
    setLocalStorageMenu(menu);

    return menuList;
}

function adminAddingMenuItem(menuList) {
    const menuForm = $(`#menu-form`);
    const InputMenuName = $(`#menu-name`);
    const menuSubmitButton = $(`#menu-submit-button`);
    preventFormDefault(menuForm);
    
    InputMenuName.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            const currentCategory = localStorage.getItem('category');
            addMenuItem(InputMenuName, menuList, currentCategory);
            countMenuItem();
        }
    });

    menuSubmitButton.addEventListener('click', () => {
        const currentCategory = localStorage.getItem('category');
        addMenuItem(InputMenuName, menuList, currentCategory);
        countMenuItem();
    });

}

function editMenuItem(menuEditBtn, category) {
    const menuItemSpan = menuEditBtn.closest('li').querySelector(".menu-name");
    let menuName = menuItemSpan.innerText;
    const menu = getLocalStorageMenu();
    const menuId = menuEditBtn.closest('li').getAttribute('data-menu-id');
    
    let newMenuName = prompt(`메뉴명을 수정하세요.`, menuName); 

    while (newMenuName == '')
        newMenuName = prompt('다시 입력하세요.', menuName);
        
    if (newMenuName != null){
        menuName = newMenuName;
        menuItemSpan.innerText = menuName;

        menu[category].forEach((menuItem) => {
            if (menuItem.id === Number(menuId)) {
                menuItem.name = menuName;
            }
        });
    }
    setLocalStorageMenu(menu);
}

function removeMenuItem(menuRemoveBtn, category) {
    const menuItem = menuRemoveBtn.closest('li');
    let menu = getLocalStorageMenu();
    const menuId = menuRemoveBtn.closest('li').getAttribute('data-menu-id');

    if (confirm('삭제하시겠습니까?')) menuItem.remove();
    countMenuItem();
    
    menu[category] = menu[category].filter((menuItem) => menuItem.id !== Number(menuId));
    setLocalStorageMenu(menu);
}

function showSoldOutStatus(soldOutBtn, category) {
    const menuName = soldOutBtn.closest('li').querySelector('.menu-name');
    menuName.classList.toggle('sold-out');
    
    let menu = getLocalStorageMenu();
    const menuId = soldOutBtn.closest('li').getAttribute('data-menu-id')

    if (menuName.classList.contains('sold-out')) {
        menu[category].forEach((menuItem) => {
            if (menuItem.id === Number(menuId)) {
                menuItem.status = 'sold-out';
            }
        });
    } else {
        menu[category].forEach((menuItem) => {
            if (menuItem.id === Number(menuId)) {
                delete menuItem.status;
            }
        });
    }

    setLocalStorageMenu(menu);
}

function adminMenuItemBtnEvent(menuList) {
    menuList.addEventListener('click', (e) => {
        const currentCategory = localStorage.getItem('category');

        if (e.target.classList.contains('menu-edit-button')){
            const menuEditBtn = e.target;
            editMenuItem(menuEditBtn, currentCategory);
        } else if (e.target.classList.contains('menu-remove-button')){
            const menuRemoveBtn = e.target;
            removeMenuItem(menuRemoveBtn, currentCategory);
        } else if (e.target.classList.contains('menu-sold-out-button')){
            const soldOutBtn = e.target;
            showSoldOutStatus(soldOutBtn, currentCategory);
        }
    });
}

function viewMenu (menuList) {
    const currentCategory = localStorage.getItem('category');
    let initMenu = getLocalStorageMenu();
    let $menuItem = $All('.menu-list-item');

    if ($menuItem) {
        $menuItem.forEach((menuItem) => menuList.removeChild(menuItem))
    }

    if (initMenu[currentCategory]) {
        initMenu[currentCategory].forEach((menu) => {
            const menuName = menu.name;
            const menuId = menu.id;
            const status = menu.status;
            menuList.insertAdjacentHTML('beforeend', menuItemTemplate(menuName, menuId, status));
        });
    }
}

function app() {
    const $categoryBtn = $All('.btn')
    const menuList = $(`#menu-list`);
    
    const initCategory = $('.cafe-category-name');
    setLocalStorageCategory(initCategory);

    viewMenu(menuList);
    countMenuItem();

    $categoryBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            setLocalStorageCategory(e.target)
            changeCategoryTitle(e.target);

            viewMenu(menuList);
            countMenuItem();
        });
    });

    adminAddingMenuItem(menuList);
    adminMenuItemBtnEvent(menuList);
}

app();
