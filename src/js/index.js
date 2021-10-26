const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);
const BASE_URL = "http://localhost:3000/api";

function preventFormDefault(menuForm) {
    menuForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

async function getMenuList(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    return response.json();
}

function setLocalStorageCategory(target) {
    const currentCategory = target.getAttribute("data-category-name");
    localStorage.setItem("category", currentCategory);
}

function changeCategoryTitle(target) {
    const categoryTitle = $("#category-title");
    categoryTitle.innerText = `${target.innerText} 메뉴 관리`;
}

function countMenuItem() {
    const menuCount = $(".menu-count");
    const $menuItem = $All(".menu-list-item");
    menuCount.innerText = `총 ${$menuItem.length}개`;
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
        </li>`;
}

async function addMenuItem(InputMenuName, menuList, category) {
    if (InputMenuName.value === "") {
        alert("메뉴를 입력해주세요.");
        return;
    } else if (InputMenuName.value.length < 2) {
        alert("메뉴명은 두 글자 이상입니다.");
        InputMenuName.value = "";
        return;
    }

    const menu = await getMenuList(category);
    const duplicatedMenuItem = menu.find((menuItem) => menuItem.name === InputMenuName.value);
    if (duplicatedMenuItem !== undefined && InputMenuName.value === duplicatedMenuItem.name) {
        alert("중복된 메뉴입니다.");
        InputMenuName.value = "";
        return;
    }

    const menuName = InputMenuName.value;
    fetch(`${BASE_URL}/category/${category}/menu`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: menuName }),
    }).then((response) => {
        return response.json();
    });

    menuList.insertAdjacentHTML("beforeend", menuItemTemplate(menuName));
    InputMenuName.value = "";
    countMenuItem();
}

function adminAddingMenuItem(menuList) {
    const menuForm = $(`#menu-form`);
    const InputMenuName = $(`#menu-name`);
    const menuSubmitButton = $(`#menu-submit-button`);
    preventFormDefault(menuForm);

    InputMenuName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const currentCategory = localStorage.getItem("category");
            addMenuItem(InputMenuName, menuList, currentCategory);
        }
    });

    menuSubmitButton.addEventListener("click", () => {
        const currentCategory = localStorage.getItem("category");
        addMenuItem(InputMenuName, menuList, currentCategory);
    });
}

async function editMenuItem(menuEditBtn, category) {
    const menuItemSpan = menuEditBtn.closest("li").querySelector(".menu-name");
    let menuName = menuItemSpan.innerText;
    const menuId = menuEditBtn.closest("li").getAttribute("data-menu-id");

    let newMenuName = prompt(`메뉴명을 수정하세요.`, menuName);

    await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newMenuName }),
    }).then((response) => {
        return response.json();
    });

    const menu = await getMenuList(category);

    while (newMenuName == "") newMenuName = prompt("다시 입력하세요.", menuName);

    if (newMenuName != null) {
        menuName = newMenuName;
        menuItemSpan.innerText = menuName;

        menu.forEach((menuItem) => {
            if (menuItem.id === Number(menuId)) {
                menuItem.name = menuName;
            }
        });
    }
}

async function removeMenuItem(menuRemoveBtn, category) {
    const menuItem = menuRemoveBtn.closest("li");
    const menuId = menuRemoveBtn.closest("li").getAttribute("data-menu-id");

    await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
        method: "DELETE",
    });

    const menu = await getMenuList(category);

    if (confirm("삭제하시겠습니까?")) menuItem.remove();
    countMenuItem();
}

async function toggleSoldOutStatus(soldOutBtn, category) {
    const menuName = soldOutBtn.closest("li").querySelector(".menu-name");
    const menuId = soldOutBtn.closest("li").getAttribute("data-menu-id");

    await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, {
        method: "PUT",
    });

    const menu = await getMenuList(category);

    menu.forEach((menuItem) => {
        if (menuItem.isSoldOut) {
            if (menuId === menuItem.id) menuName.classList.add("sold-out");
        } else {
            if (menuId === menuItem.id) menuName.classList.remove("sold-out");
        }
    });
}

function adminMenuItemBtnEvent(menuList) {
    menuList.addEventListener("click", (e) => {
        const currentCategory = localStorage.getItem("category");

        if (e.target.classList.contains("menu-edit-button")) {
            const menuEditBtn = e.target;
            editMenuItem(menuEditBtn, currentCategory);
        } else if (e.target.classList.contains("menu-remove-button")) {
            const menuRemoveBtn = e.target;
            removeMenuItem(menuRemoveBtn, currentCategory);
        } else if (e.target.classList.contains("menu-sold-out-button")) {
            const soldOutBtn = e.target;
            toggleSoldOutStatus(soldOutBtn, currentCategory);
        }
    });
}

async function viewMenu(menuList) {
    const currentCategory = localStorage.getItem("category");
    let $menuItem = $All(".menu-list-item");
    const menu = await getMenuList(currentCategory);

    if ($menuItem) {
        $menuItem.forEach((menuItem) => menuList.removeChild(menuItem));
    }

    if (menu) {
        menu.forEach((menuItem) => {
            const menuName = menuItem.name;
            const menuId = menuItem.id;
            let status = "";
            if (menuItem.isSoldOut) {
                status = "sold-out";
            }
            menuList.insertAdjacentHTML("beforeend", menuItemTemplate(menuName, menuId, status));
        });
    }
    countMenuItem();
}

function app() {
    const $categoryBtn = $All(".btn");
    const menuList = $("#menu-list");

    const initCategory = $(".cafe-category-name");
    setLocalStorageCategory(initCategory);
    viewMenu(menuList);

    $categoryBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            setLocalStorageCategory(e.target);

            changeCategoryTitle(e.target);
            viewMenu(menuList);
        });
    });

    adminAddingMenuItem(menuList);
    adminMenuItemBtnEvent(menuList);
}

app();
