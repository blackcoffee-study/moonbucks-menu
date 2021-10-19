const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

 
function getLocalStorage() {
    const strMenu = localStorage.getItem('menu');
    let menu = [];
    if (strMenu !== null) menu = JSON.parse(strMenu);;

    return menu;
}

function setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
}

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

function addMenuItem(InputMenuName, menuList, category) {
    if (InputMenuName.value === '') {
        alert('메뉴를 입력해주세요.');
        return;
    }
    
    const menuName = InputMenuName.value;
    const menuId = Date.now();
    const menuItemTemplate  = (menuName, menuId) => {
        return `<li data-menu-id="${menuId}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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

    menuList.insertAdjacentHTML('beforeend', menuItemTemplate(menuName, menuId));
    InputMenuName.value = '';

    let menu = getLocalStorage();

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
    setLocalStorage(menu);

    return menuList;
}

function adminAddingMenuItem(category, menuList) {
    const menuForm = $(`#menu-form`);
    const InputMenuName = $(`#menu-name`);
    const menuSubmitButton = $(`#menu-submit-button`);
    preventFormDefault(menuForm);

    InputMenuName.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            addMenuItem(InputMenuName, menuList, category);
            countMenuItem();
        }
    });

    menuSubmitButton.addEventListener('click', () => {
        addMenuItem(InputMenuName, menuList, category);
        countMenuItem();
    });
}

function editMenuItem(menuEditBtn, category) {
    const menuItemSpan = menuEditBtn.closest('li').querySelector(".menu-name");
    let menuName = menuItemSpan.innerText;
    const menu = getLocalStorage();
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
    setLocalStorage(menu);
}

function removeMenuItem(menuRemoveBtn, category) {
    const menuItem = menuRemoveBtn.closest('li');
    let menu = getLocalStorage();
    const menuId = menuRemoveBtn.closest('li').getAttribute('data-menu-id');

    if (confirm('삭제하시겠습니까?')) menuItem.remove();

    countMenuItem();
    menu[category] = menu[category].filter((menuItem) => menuItem.id !== Number(menuId));
    setLocalStorage(menu);
}

function viewMenu (menuList, currentCategory = 'espresso') {
    let initMenu = getLocalStorage();

    const menuItemTemplate  = (menuName, menuId, status) => {
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

    if (initMenu[currentCategory]) {
        initMenu[currentCategory].forEach((menu) => {
            const menuName = menu.name;
            const menuId = menu.id;
            const status = menu.status;
            menuList.insertAdjacentHTML('beforeend', menuItemTemplate(menuName, menuId, status));
        });
    }
}

function showSoldOutStatus(soldOutBtn, category) {
    const menuName = soldOutBtn.closest('li').querySelector('.menu-name');
    menuName.classList.toggle('sold-out');
    
    let menu = getLocalStorage();
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
                menuItem.status = '';
            }
        });
    }

    setLocalStorage(menu);
}

function app(currentCategory = 'espresso') {
    const $categoryBtn = $All('.btn')
    const menuList = $(`#menu-list`);

    viewMenu(menuList, currentCategory);
    countMenuItem();

    adminAddingMenuItem(currentCategory, menuList);

    menuList.addEventListener('click', (e) => {
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

    $categoryBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.getAttribute('data-category-name')

            const categoryTitle = $('#category-title');
            categoryTitle.innerText = `${e.target.innerText} 메뉴 관리`;

            viewMenu(menuList, currentCategory);
        });
    });
}

app();
