export default function MenuList({ onAction, $menuList }) {
    this.setState = updatedItems => {
        this.menuItems = updatedItems;
        this.render(this.menuItems);
    };

    this.render = items => {
        const template = items.map(menuItemTemplate);
        $menuList.innerHTML = template.join('');
    };

    $menuList.addEventListener('click', e => this.handleButtonEvent(e));

    this.handleButtonEvent = e => {
        console.log('e는 어떻게 될까?', e);
        if (e.target.classList.contains('menu-edit-button')) {
            this.updateMenu(e);
        } else if (e.target.classList.contains('menu-remove-button')) {
            this.deleteMenu(e);
        } else if (e.target.classList.contains('menu-sold-out-button')) {
            this.soldOutMenu(e);
        }
    };

    this.updateMenu = e => {
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const newMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
        if (newMenuName == null) {
            return;
        } else if (newMenuName.trim() == '') {
            alert('값을 입력해주세요.');
            return;
        }
        onAction('update', e.target, newMenuName);
    };

    this.deleteMenu = e => {
        if (confirm('정말 삭제하시겠습니까?')) {
            onAction('delete', e.target);
        }
    };

    this.soldOutMenu = e => {
        onAction('soldout', e.target);
    };

    const menuItemTemplate = (menu) => {
        return `<li data-menu-id=${menu.id} class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${
                menu.isSoldOut ? 'sold-out' : ''
            }">${menu.name}</span>
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
    };
}
