import $ from '../utils/getDomElement';
import manageMenuList from '../utils/manageMenuList';

const edit = key => {
    manageMenuList({ type: 'EDIT', key });
};

const del = key => {
    if (confirm('정말 삭제하시겠습니까?')) {
        manageMenuList({ type: 'DELETE', key });
    }
};

export default function handleEditList() {
    const coffeeMenuList = $('#espresso-menu-list');

    coffeeMenuList.addEventListener('click', e => {
        const key = e.target.closest('li').getAttribute('key');

        if (e.target.classList.contains('menu-edit-button')) edit(key);
        else del(key);
    });
}
