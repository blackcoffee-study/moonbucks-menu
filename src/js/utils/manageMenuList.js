import { getLocalState, setLocalState } from '../features/handleLocalStorage';
import setMenuCount from './setMenuCount';
import applyMenuList from './applyMenuList';

const manageMenuList = action => {
    const menuList = getLocalState('store');
    const category = getLocalState('category');

    switch (action.type) {
        case 'LOADING':
            break;
        case 'ADD':
            menuList[category].push(action.text);
            break;
        case 'EDIT':
            const edit = prompt('메뉴명을 수정하세요', menuList[category][action.key]);

            menuList[category][action.key] = edit ? edit : menuList[category][action.key];
            break;
        case 'DELETE':
            menuList[category].splice(action.key, 1);
            break;
        default:
            console.error('type error');
    }

    setLocalState('store', menuList);
    applyMenuList(menuList[category]);
    setMenuCount(menuList[category]);
};

export default manageMenuList;
