const $input = document.getElementById("espresso-menu-name");
const $submitBtn = document.getElementById("espresso-menu-submit-button");
const $menuList = document.getElementById("espresso-menu-list");

const $ = (selector) => document.querySelector(selector);
const $all = (selectors) => document.querySelectorAll(selectors);

var menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
}

$input.addEventListener("keydown", event => {
    if(event.key === 'Enter') {
        event.preventDefault(); 
        addMenu();
    }
});

$submitBtn.addEventListener("click", addMenu);
    
$all(".cafe-category-name").forEach((btn) => btn.addEventListener("click", pickMenu));


window.onload = function() {
    initialize();
}

function initialize() {
    getJsonLocalStorage();

    render();
}

function render() {
    let children = "";

    menu[info.category].forEach((obj, index) => {
        children += 
            `<li class="menu-list-item d-flex items-center py-2" data-menu-idx="${index}">
                <span class="w-100 pl-2 menu-name ${obj.soldoutClass}" >${obj.menuName}</span>
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
    });

    $menuList.innerHTML = children;
    
    setMenuCount();
}

function addMenu() {
    const name = $input.value;

    if(name.trim() === '') {
        alert("값을 입력해주세요");
        return;
    }

    menu[info.category].push(new menuInfo(name));
    setItemLocalStorage();
    render();

    $input.value = "";
}

function setItemLocalStorage() {
    localStorage.setItem("menu", JSON.stringify(menu));
}

function getJsonLocalStorage() {
    menu = JSON.parse(localStorage.getItem("menu"));
    return menu;
}

function pickMenu() {
    const categoryName = this.dataset.categoryName;
    $("h2").innerHTML = `${CATEGORYNAME[categoryName]} 메뉴 관리`;

    info.category = categoryName;

    render();
}

function setMenuCount() {
    const $menuCount = document.getElementsByClassName("menu-count")[0];
    const count = $menuList.childElementCount;
    $menuCount.innerHTML = `총 ${count}개`;
}

$menuList.addEventListener("click", event => {
    const $target = event.target;
    const $li = $target.parentNode;
    const $menuName = $li.children[0];
    const menuIndex = $li.dataset.menuIdx;
    const classList = $target.classList;

    if(classList.contains(BUTTON.EDIT)) {
        const menuName = prompt("메뉴명을 수정하세요");
        $menuName.innerHTML = menuName;
        menu[info.category][menuIndex].menuName = menuName;

    } else if(classList.contains(BUTTON.REMOVE)) {
        if(confirm("정말 삭제하시겠습니까?")) {
            $menuList.removeChild($li);
            menu[info.category].splice(menuIndex, 1);
        }

    } else if(classList.contains(BUTTON.SOLDOUT)) {
        const toggleState = $menuName.classList.toggle("sold-out");

        menu[info.category][menuIndex].soldoutClass = (toggleState === true ? "sold-out" : "");
    }

    setItemLocalStorage();

    render();
});

function isJson(str) {
    try {
        let json = JSON.parse(str);
        return (json && typeof json === "object");
    } catch(e) {
        return false;
    }
}
