import { MOONBUCKS } from '../constants.js';
import { MENU_CATEGORIES } from '../constants.js';

export const getAllMenus = () => {
    const allMenus = JSON.parse(localStorage.getItem(MOONBUCKS));
    const categories = MENU_CATEGORIES.map(
        (categoryConst) => categoryConst.category,
    );
    const storageTemplate = categories.map((category) => ({
        category,
        menus: [],
    }));
    if (!allMenus) setAllMenus(storageTemplate);
    return allMenus;
};

export const setAllMenus = (menus) =>
    localStorage.setItem(MOONBUCKS, JSON.stringify(menus));

export const getMenus = (category) => {
    const allMenus = getAllMenus();
    console.log(allMenus);
    const foundMenus = allMenus.find(
        (storedMenus) => storedMenus.category === category,
    );
    return foundMenus;
};

// export const setMenus = () => {

// }
