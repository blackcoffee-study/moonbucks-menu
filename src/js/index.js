const $ = (selector) => document.querySelector(selector);

const espressoMenuList = $('#espresso-menu-list');
const espressoMenuName = $('#espresso-menu-name');
const espressoMenuSubmitButton = $('#espresso-menu-submit-button');
const countState = new CountState();

espressoMenuSubmitButton.addEventListener('click', () => {
    if (espressoMenuName.value) {
        addMenuList(espressoMenuName.value);
        espressoMenuName.value = null;
        countState.setCount(countState.getCount() + 1);
    }
});


espressoMenuName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (espressoMenuName.value) {
            addMenuList(espressoMenuName.value);
            espressoMenuName.value = null;
            countState.setCount(countState.getCount() + 1);
        }

        e.preventDefault();
    }
});

espressoMenuList.addEventListener('click', (e) => {
    const classList = e.target.classList;

    if (classList.contains('menu-edit-button')) {
        const newMenuName = window.prompt('바꿀 메뉴이름은?');
        e.target.parentNode.querySelector('.menu-name').textContent = newMenuName;
    }

    if (classList.contains('menu-remove-button')) {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            espressoMenuList.removeChild(e.target.parentNode);
            countState.setCount(countState.getCount() - 1);
        }
    }
});

const addMenuList = (name) => {
    espressoMenuList.innerHTML += /*html*/`
        <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${name}</span>
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
};

function CountState() {
    this.count = 0;
    this.targetElement = $(".menu-count");
    this.getCount = () => {
        return this.count;
    }

    this.setCount = (count) => {
        console.log("hello");
        this.count = count;
        this.countReRender();
    }

    this.countReRender = () => {
        this.targetElement.innerHTML = `총 ${this.count}개`;
    }
};