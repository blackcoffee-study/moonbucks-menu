import {
    LOAD_MENUITEMS_SUCCESS,
    LOAD_MENUITEMS_FAIL,
    ADD_MENUITEM_SUCCESS,
    ADD_MENUITEM_FAIL,
    EDIT_MENUITEM_SUCCESS,
    EDIT_MENUITEM_FAIL,
    DELETE_MENUITEM_SUCCESS,
    DELETE_MENUITEM_FAIL,
    SOLDOUT_MENUITEM_SUCCESS,
    SOLDOUT_MENUITEM_FAIL,
} from '../constant/index.js';

const initState = {
    menuItmes: [],
    currentCategory: 'espresso',
};

export const reducer = (state = initState, action) => {
    const currentCategory = state.currentCategory;
    let newMenuItems;
    switch (action.type) {
        case LOAD_MENUITEMS_SUCCESS:
            return {
                menuItems: [...action.menuItems],
                currentCategory: action.currentCategory,
            };
        case ADD_MENUITEM_SUCCESS:
            return {
                menuItems: [...state.menuItems, action.menuItem],
                currentCategory,
            };
        case DELETE_MENUITEM_SUCCESS:
            newMenuItems = state.menuItems.filter((menuItem) => {
                return menuItem.id !== action.id;
            });
            return { menuItems: [...newMenuItems], currentCategory };
        case EDIT_MENUITEM_SUCCESS:
        case SOLDOUT_MENUITEM_SUCCESS:
            newMenuItems = state.menuItems.map((menuItem) => {
                if (menuItem.id === action.menuItem.id) {
                    return { ...action.menuItem };
                } else {
                    return { ...menuItem };
                }
            });
            return {
                menuItems: [...newMenuItems],
                currentCategory,
            };
        case LOAD_MENUITEMS_FAIL:
        case ADD_MENUITEM_FAIL:
        case EDIT_MENUITEM_FAIL:
        case DELETE_MENUITEM_FAIL:
        case SOLDOUT_MENUITEM_FAIL:
            return state;
    }
};
