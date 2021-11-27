import '../css/index.css';
import $ from './utils/getDomElement';
import handleSubmit from './features/handleSubmit';
import preventAction from './utils/preventAction';
import handleEditList from './features/handleEditList';
import handleLocalStorage, { setLocalState } from './features/handleLocalStorage';
import manageMenuList from './utils/manageMenuList';

preventAction('#espresso-menu-form');

function App(category = 'espresso') {
    setLocalState('category', category);

    handleLocalStorage();

    manageMenuList({ type: 'LOADING' });

    handleSubmit();

    handleEditList();
}

App();

$('header > nav').addEventListener('click', e => {
    const category = e.target.getAttribute('data-category-name');
    const menuName = e.target.innerText;
    const placeholder = menuName.substr(2);

    $('main h2').innerText = `${menuName} 메뉴 관리`;
    $('#espresso-menu-form  label').innerText = `${placeholder} 메뉴 이름`;
    $('#espresso-menu-form  input').setAttribute('placeholder', `${placeholder} 메뉴 이름`);

    App(category);
});
