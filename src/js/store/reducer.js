import {
    LOAD_MENUITEMS_SUCCESS,
    ADD_MENUITEM,
    DELETE_MENUITEM,
    EDIT_MENUITEM,
    SOLDOUT_MENUITEM,
} from '../constant/index.js';

export const reducer = (state = '', action) => {
    switch (action.type) {
        case LOAD_MENUITEMS_SUCCESS:
            state = {
                ...action.payload,
            };
            return state;
        case ADD_MENUITEM:
            state.menuItems.push(action.payload.menuItem);
            return state;
        case DELETE_MENUITEM:
            state.menuItems = state.menuItems.filter((menuItem) => {
                return menuItem.id !== action.payload.targetId;
            });
            return state;
        case EDIT_MENUITEM:
        case SOLDOUT_MENUITEM:
            const newMenuItem = action.payload.menuItem;
            state.menuItems = state.menuItems.map((menuItem) => {
                if (menuItem.id === newMenuItem.id) {
                    return { ...newMenuItem };
                } else {
                    return { ...menuItem };
                }
            });
            return state;
        default:
            return state;
    }
};
