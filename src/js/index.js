const submitBtn = document.getElementById('espresso-menu-submit-button');
submitBtn.addEventListener('click', addMenu);

const inputMenu = document.getElementById('espresso-menu-name');
inputMenu.addEventListener('keypress', function(event) {
    if (event.key != 'Enter') {
        return;
    }
    event.preventDefault();
    addMenu();
});

const menuList = document.getElementById('espresso-menu-list');
menuList.addEventListener('click', function(event) {
    if (event.target && event.target.nodeName == 'BUTTON' && event.target.classList.contains('menu-edit-button')) {
        event.target.previousElementSibling.innerText = prompt('메뉴명을 수정하세요');
    }
})

function addMenu() {
    const menuName = document.getElementById('espresso-menu-name');
    if (menuName.value.trim() == '') {
        alert('값을 입력해주세요.');
        menuName.value = '';
        return;
    }
    
    const menuList = document.getElementById('espresso-menu-list');
    const menuItem = '<li class="menu-list-item d-flex items-center py-2">'
        + '<span class="w-100 pl-2 menu-name">'+ menuName.value +'</span>'
        + '<button '
        + 'type="button" '
        + 'class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"'
        + '>'
        + '수정'
        + '</button>'
        + '<button '
        + 'type="button" '
        + 'class="bg-gray-50 text-gray-500 text-sm menu-remove-button"'
        + '>'
        + '삭제'
        + '</button>'
        + '</li>';
    menuList.innerHTML += menuItem;
    menuName.value = '';
}