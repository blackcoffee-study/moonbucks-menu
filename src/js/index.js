
const $ = (selector) => document.querySelector(selector);

function App() {
    const submitMenu = (event) => {
        event.preventDefault();
        const keyword = $('#espresso-menu-name').value.trim();
        if(keyword.length === 0){
            return;
        }
        addMenu(keyword);
        $('#espresso-menu-name').value = '';
        updateTotalCount();
    }
    const addMenu = (menu) => {
        $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuTemplate(menu));
    }
    
    const menuTemplate = (item) => {
        return  `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${item}</span>
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
    const updateTotalCount = () => {
        const menuCount = $('#espresso-menu-list').childElementCount;
        $('.menu-count').innerText = `총 ${menuCount}개`
    }
    const updateMenu = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updateMenu = prompt('메뉴명을 수정하세요.', $menuName.innerText) ?? '';
        $menuName.innerText = updateMenu.trim().length > 0 ? updateMenu : $menuName.innerText; 
    }
    const removeMenu = (e) => {
        const wantDelete = confirm('정말 삭제하시겠습니까?');
        if(wantDelete){
            e.target.closest('li').remove();
            updateTotalCount();
        }
    }

    $('#espresso-menu-form').addEventListener('submit', submitMenu);
    $('#espresso-menu-list').addEventListener('click', (e)=> {
        if(e.target.classList.contains('menu-edit-button')){
            updateMenu(e);
        }
        if(e.target.classList.contains('menu-remove-button')){
            removeMenu(e);
        }
    })
}

App();
