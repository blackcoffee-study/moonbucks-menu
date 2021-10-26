import {
    BASE_URL,
    POST,
    PUT,
    DELETE,
    LOAD_MENUITEMS_SUCCESS,
    ADD_MENUITEM,
    EDIT_MENUITEM,
    SOLDOUT_MENUITEM,
    DELETE_MENUITEM,
} from '../constant/index.js';
import { store } from '../store/index.js';

const options = {
    post: (content) => ({
        method: POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: content,
        }),
    }),
    put: (content = '') => ({
        method: PUT,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: content,
        }),
    }),
    delete: () => ({
        method: DELETE,
    }),
};

const request = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw response.json();
    }
    return await (!options || options.method !== DELETE ? response.json() : '');
};

export const api = {
    loadMenuItems: (category = 'espresso') => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu`;
        request(requestUrl).then((menuItems) => {
            store.dispatch({
                type: LOAD_MENUITEMS_SUCCESS,
                payload: { menuItems, currentCategory: category },
            });
        });
    },
    addMenuItem: async (category, menuName) => {
        try {
            const requestUrl = `${BASE_URL}/api/category/${category}/menu`;
            const menuItem = await request(requestUrl, options.post(menuName));
            store.dispatch({
                type: ADD_MENUITEM,
                payload: { menuItem },
            });
        } catch (error) {
            error.then((e) => {
                alert(e.message);
            });
        }
    },
    editMenuItem: (category, menuId, newMenuName) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu/${menuId}`;
        request(requestUrl, options.put(newMenuName)).then((menuItem) => {
            store.dispatch({
                type: EDIT_MENUITEM,
                payload: { menuItem },
            });
        });
    },
    soldOutMenuItem: (category, menuId) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu/${menuId}/soldOut`;
        request(requestUrl, options.put()).then((menuItem) => {
            store.dispatch({
                type: SOLDOUT_MENUITEM,
                payload: { menuItem },
            });
        });
    },
    deleteMenuItem: (category, menuId) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu/${menuId}`;
        request(requestUrl, options.delete()).then(() => {
            store.dispatch({
                type: DELETE_MENUITEM,
                payload: { targetId: menuId },
            });
        });
    },
};
