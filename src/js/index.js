const $menuForm = document.querySelector('#espresso-menu-form');
const $menuSubmitBtn = document.querySelector('#espresso-menu-submit-button');
const $menuList = document.querySelector('#espresso-menu-list');
const $menuName = document.querySelector('#espresso-menu-name');

const changeCounter = () => {
    const $menuCount = document.querySelector('.menu-count')
    $menuCount.innerText = `총 ${$menuList.children.length}개`
}

const createNewMenu = (menuName) => {
    const $espressoMenu = document.createElement('li');
    $espressoMenu.setAttribute('class', 'menu-list');
    $espressoMenu.innerHTML = `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuName}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
    </li>`;
    return $espressoMenu;
}

const clearInput = (input) => {
    input.value = '';
}

const addMenu = () => {
    const trimmedMenu = $menuName.value.trim();
    if (trimmedMenu.length === 0) {
        alert('값을 입력해주세요.');
        clearInput($menuName);
        return;
    }
    const menuItem = createNewMenu(trimmedMenu);
    $menuList.append(menuItem);
    changeCounter();
}

const editMenu = (targetMenu) => {
    const newMenu = window.prompt('메뉴명을 수정하세요', targetMenu.innerText);
    if (newMenu === null) return;
    if (newMenu.trim().length === 0) {
        alert('값을 입력해주세요.')
        return;
    }
    targetMenu.innerText = newMenu;
}

const deleteMenu = (targetMenu) => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
        targetMenu.closest('li').remove();
        changeCounter();
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    addMenu($menuName.value);
    clearInput($menuName)
}
const handleSubmitBtnClick = () => {
    addMenu($menuName);
    clearInput($menuName);
}
const handleMenuListClick = (e) => {
    const target = e.target;
    if (e.target.matches('.menu-edit-button')) {
        editMenu(target.parentElement.children[0]);
    }
    if (e.target.matches('.menu-remove-button')) {
        deleteMenu(target.parentNode);
    }
}

$menuForm.addEventListener('submit', e => {
    handleSubmit(e);
})
$menuSubmitBtn.addEventListener('click', () => {
    handleSubmitBtnClick();
})
$menuList.addEventListener('click', (e) => {
    handleMenuListClick(e);
})
