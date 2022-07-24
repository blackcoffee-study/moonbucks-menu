import { fetchMenu, storeMenu, removeStoreMenu, updateStoreMenu } from './store/index.js';

const $ = (selector) => document.querySelector(selector);

function App() {
    let currentCategory;

    const submitMenu = (event) => {
        event.preventDefault();
        const keyword = $('#espresso-menu-name').value.trim();
        if(keyword.length === 0) return;
        addMenu({name : keyword});
        storeMenu(keyword, currentCategory);

        updateTotalCount();
        $('#espresso-menu-name').value = '';
    }

    const addMenu = (menu) => {
        $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuTemplate(menu));
    }
    
    const menuTemplate = (item) => {
        return  `<li class="menu-list-item d-flex items-center py-2">
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
    }
    const updateTotalCount = () => {
        const menuCount = $('#espresso-menu-list').childElementCount;
        $('.menu-count').innerText = `총 ${menuCount}개`
    }
    const updateMenu = (e) => {
        const $targetList = e.target.closest('li');

        const $menuName = $targetList.querySelector(".menu-name");
        let updatedMenu = prompt('메뉴명을 수정하세요.', $menuName.innerText) ?? '';
        updatedMenu = updatedMenu.trim().length > 0 ? updatedMenu : $menuName.innerText;
        $menuName.innerText = updatedMenu;
        
        //localStorage변경 
        updateStoreMenu(getTargetIndex($targetList),{name : updatedMenu}, currentCategory);
        
    }
    const removeMenu = (e) => {
        const wantDelete = confirm('정말 삭제하시겠습니까?');
        if(wantDelete){
            const $targetList = e.target.closest('li');

            removeStoreMenu(getTargetIndex($targetList), currentCategory);

            $targetList.remove();
            updateTotalCount();
        }
    }
    const soldOutMenu = (e) => {
        const $targetList = e.target.closest('li');
        const index = getTargetIndex($targetList);
        const menu = fetchMenu();
        const targetItem = menu[currentCategory][index];
        
        let soldOut = !targetItem.hasOwnProperty('soldOut') ? true : targetItem.soldOut ?  false : true;

        soldOut ? $targetList.children[0].classList.add('sold-out') : $targetList.children[0].classList.remove('sold-out');

        const storeTemplate = {...targetItem, soldOut};
        updateStoreMenu(index, storeTemplate, currentCategory);

    }
    const getTargetIndex = (selectedItem) => {
            const $menuItems = Array.from(selectedItem.closest('ul').children);
            return $menuItems.indexOf(selectedItem);
    }
    const setSavedMenu = (category) => {
        currentCategory = category;
        const menu = fetchMenu();
        menu[currentCategory].forEach(menu => {
            addMenu(menu);
        });
        updateTotalCount();
    }
    const handleCategory = (e) => {
        clearListMenu();
        setSavedMenu(e.target.dataset.categoryName)
        const categoryName = e.target.innerText;
        const $headingChild = $('.heading').children;
        
        for(let index = 0; index < $headingChild.length; index++ ){
            if($headingChild[index].classList.contains('heading-title')){
                $headingChild[index].innerText = `${categoryName} 메뉴 관리`;
                $('.input-label').innerText =  `${categoryName.substring(2)} 메뉴 이름`;
            }
        }
    };
    const clearListMenu = () => {
        while($('#espresso-menu-list').hasChildNodes()){
            $('#espresso-menu-list').removeChild($('#espresso-menu-list').firstChild);
        }
    }

    const setCategoryEvent = () => {
        const $categorys = document.querySelectorAll('.cafe-category-name');
        $categorys.forEach(category => {
            category.addEventListener('click', handleCategory);
        });
    }

    setSavedMenu('espresso');
    setCategoryEvent();
    
    $('#espresso-menu-form').addEventListener('submit', submitMenu);
    $('#espresso-menu-list').addEventListener('click', (e)=> {
        if(e.target.classList.contains('menu-edit-button')){
            updateMenu(e);
        }
        if(e.target.classList.contains('menu-remove-button')){
            removeMenu(e);
        }
        if(e.target.classList.contains('menu-sold-out-button')){
            soldOutMenu(e);
        }
    });

}

App();
