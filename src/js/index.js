//TODO 
//[X] localStorage에 데이터를 저장한다.
//[X] 화면을 새로고침하면 데이터를 읽어온다.

//TODO
//[] 에스프레소 메뉴판 관리
//[] 프라푸치노 메뉴판 관리
//[] 블렌디드 메뉴판 관리
//[] 티바나 메뉴판 관리
//[] 디저트 메뉴판 관리

//TODO
//[] 페이지에 최초로 접근할 때 에스프레소 메뉴 데이터를 읽어온다.
//[] 에스프레소 메뉴 데이터를 렌더링해준다.

//TODO
//[] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 `sold-out` class를 추가한다.
//[] 품절 버튼을 li에 추가한다.
//[] 품절 버튼을 누른 경우 가장 가까운 li태그에 'sold-out' class를 추가한다.
//[] 품절 버튼을 클릭하면 localstorage에 상태를 갱신해준다.


const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    }
}

function App() {
    this.menu = [];

    const renderMenuItem = () => {
        const template = this.menu.map((item, index) => {
            return `
                    <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                        <span class="w-100 pl-2 menu-name">${item.name}</span>
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
                    </li>
                    `
        })
        $("#espresso-menu-list").innerHTML = template.join("");
    }
    const updateMenuCount = () => {
        const menuItemCount = document.querySelectorAll(".menu-list-item");
        $(".menu-count").innerHTML = `총 ${menuItemCount.length}개`;
        $("#espresso-menu-name").value = "";
    }
    const addEspressoMenu = () => {
        const espressoMenuName = $("#espresso-menu-name").value;
        if (espressoMenuName === "") {
            return;
        }
        this.menu.push({name: espressoMenuName});
        renderMenuItem();
        store.setLocalStorage(this.menu);
        
        updateMenuCount();
    }
    const updateEspressoMenu = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const menuId = e.target.closest("li").dataset.menuId;
        const updatedMenuName = window.prompt("메뉴를 수정하세요", $menuName.innerHTML);
        if (updatedMenuName === null) {
            return;
        }
        this.menu[menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu); 
        $menuName.innerHTML = updatedMenuName;
    }
    const removeEspressoMenu = (e) => {
        const removedMenu = window.confirm("메뉴를 삭제하시겠습니까?")
        if (removedMenu) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu.splice(menuId, 1);
            console.log(this.menu);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            updateMenuCount();
        }
    }
    
    if (store.getLocalStorage() != undefined){
        this.menu = store.getLocalStorage();
        console.log(this.menu);
        renderMenuItem();
    }
    $("#espresso-menu-form").addEventListener("submit", function (e) {
        e.preventDefault();
    });
    $("#espresso-menu-name").addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
            addEspressoMenu()
        }
    });
    $("#espresso-menu-submit-button").addEventListener("click", function (e) {
        addEspressoMenu();
    });
    $("#espresso-menu-list").addEventListener("click", function (e) {
        if (e.target.classList.contains("menu-edit-button")) {
            updateEspressoMenu(e);
        }
        if (e.target.classList.contains("menu-remove-button")) {
            removeEspressoMenu(e);
        }
    });
}

const app = new App();
