import { BASE_URL, POST, PUT, DELETE } from '../constant/index.js';

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
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw await response.json().then((e) => new Error(e.message));
        }
        return await (!options || options.method !== DELETE
            ? response.json()
            : '');
    } catch (e) {
        alert(e.message);
    }
};

export const api = {
    getMenuItems: async (category) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu`;
        try {
            return await request(requestUrl);
        } catch (e) {
            alert(e.message);
        }
    },
    addMenuItem: async (category, menuName) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu`;
        try {
            return await request(requestUrl, options.post(menuName));
        } catch (e) {
            alert(e.message);
        }
    },
    editMenuItem: async (category, menuId, newMenuName) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu/${menuId}`;
        try {
            return await request(requestUrl, options.put(newMenuName));
        } catch (e) {
            alert(e.message);
        }
    },
    soldOutMenuItem: async (category, menuId) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu/${menuId}/soldOut`;
        try {
            return await request(requestUrl, options.put());
        } catch (e) {
            alert(e.message);
        }
    },
    deleteMenuItem: (category, menuId) => {
        const requestUrl = `${BASE_URL}/api/category/${category}/menu/${menuId}`;
        request(requestUrl, options.delete()).catch((e) => {
            alert(e.message);
        });
    },
};
