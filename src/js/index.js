const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    }
}

const BASE_URL = 'http://localhost:3000/api'

function App() {
    const menuName = document.querySelector("#menu-name"),
    menuForm = document.querySelector("#menu-form"),
    menuList = document.querySelector("#menu-list"),
    menuCount = document.querySelector(".menu-count"),
    menuSubmitButton = document.querySelector("#menu-submit-button"),
    nav = document.querySelector("nav"),
    categoryTitle = document.querySelector("#category-title");
    // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
    let menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: [],
    };
    this.currentCategory = 'espresso';
    this.init = () => {
        if(store.getLocalStorage()) {
            menu = store.getLocalStorage();
        }
        render();
        initEventListeners();
    }
    
    // 수정, 삭제, 품절버튼 이벤트핸들링 처리
    menuList.addEventListener("click", (e) => {
        // 수정
        if(e.target.classList.contains("menu-edit-button")) {
            const menuId = e.target.closest("li").dataset.menuId;
            const reMenuName = e.target.closest("li").querySelector(".menu-name"),
            updatedMenu = prompt("메뉴명을 수정하세요", reMenuName.innerText);
            menu[this.currentCategory][menuId].name = updatedMenu;
            store.setLocalStorage(menu);
            render();
        }

        // 삭제
        if(e.target.classList.contains("menu-remove-button")) {
            if(confirm("정말 삭제하시겠습니까?")) {
                const menuId = e.target.closest("li").dataset.menuId;
                menu[this.currentCategory].splice(menuId, 1);
                store.setLocalStorage(menu);
                render();
            }
        }

        // 품절
        if(e.target.classList.contains("menu-sold-out-button")) {
            const menuId = e.target.closest("li").dataset.menuId;
            menu[this.currentCategory][menuId].soldOut = 
                !menu[this.currentCategory][menuId].soldOut;
            store.setLocalStorage(menu);
            render();
        }
    })

    // form 태그가 자동으로 전송되는 것을 방지
    menuForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    
    // 메뉴 추가함수
    const addMenu = () => {
        if(menuName === "") {
            alert("값을 입력해주세요");
            return;
        }
        const MenuName = menuName.value;
        
        fetch(`${BASE_URL}/category/${this.currentCategory}/menu`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({ name: MenuName}),
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
        });

        // menu[this.currentCategory].push({ name: MenuName });
        // store.setLocalStorage(menu);
        // render();
        // menuName.value = "";
    }

    const render = () => {
        const template = menu[this.currentCategory].map((item, idx) => {
            return `
                <li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name ${item.soldOut ? 'sold-out' : ''}">${item.name}</span>
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
        })
        .join("");
        menuList.innerHTML = template;
        countMenu();
    }

    // 갯수 카운팅 함수
    const countMenu = () => {
        const menuCnt = menu[this.currentCategory].length;
        menuCount.innerText = `총 ${menuCnt} 개`;
    }

    const initEventListeners = () => {
        // 확인 버튼에 대한 이벤트 핸들링
        menuSubmitButton.addEventListener("click", () => {
            addMenu();
        });
    
        // 메뉴 입력받기
        menuName.addEventListener("keypress", (e) => {
            if(e.key !== "Enter") return;
            addMenu();
        });
    
        nav.addEventListener("click", (e) => {
            const isCategoryBtn = e.target.classList.contains("cafe-category-name")
            if(isCategoryBtn) {
                const categoryName = e.target.dataset.categoryName;
                this.currentCategory = categoryName;
                categoryTitle.innerText = `${e.target.innerText} 메뉴 관리`;
                render();
            }
        })
    }
}



const app = new App();
app.init();