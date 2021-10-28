import { api } from '../api/index.js';
import {
    LOAD_MENUITEMS_SUCCESS,
    LOAD_MENUITEMS_FAIL,
    ADD_MENUITEM_FAIL,
    ADD_MENUITEM_SUCCESS,
    EDIT_MENUITEM_FAIL,
    EDIT_MENUITEM_SUCCESS,
    DELETE_MENUITEM_FAIL,
    DELETE_MENUITEM_SUCCESS,
    SOLDOUT_MENUITEM_FAIL,
    SOLDOUT_MENUITEM_SUCCESS,
} from '../constant/index.js';

export const fetchMenuItems = (currentCategory = 'espresso') => {
    return async (dispatch, getState) => {
        let menuItems;
        try {
            menuItems = await api.getMenuItems(currentCategory);
            if (!menuItems) {
                throw '';
            }
        } catch (e) {
            dispatch({
                type: LOAD_MENUITEMS_FAIL,
            });
            return;
        }
        dispatch({
            type: LOAD_MENUITEMS_SUCCESS,
            menuItems,
            currentCategory,
        });
    };
};

export const addMenuItem = (name) => {
    return async (dispatch, getState) => {
        let menuItem;
        try {
            menuItem = await api.addMenuItem(getState().currentCategory, name);
            if (!menuItem) {
                throw '';
            }
        } catch (e) {
            dispatch({
                type: ADD_MENUITEM_FAIL,
            });
            return;
        }
        dispatch({
            type: ADD_MENUITEM_SUCCESS,
            menuItem,
        });
    };
};

export const editMenuItem = (id, name) => {
    return async (dispatch, getState) => {
        let menuItem;
        try {
            menuItem = await api.editMenuItem(
                getState().currentCategory,
                id,
                name
            );
        } catch (e) {
            dispatch({
                type: EDIT_MENUITEM_FAIL,
            });
            return;
        }
        dispatch({
            type: EDIT_MENUITEM_SUCCESS,
            menuItem,
        });
    };
};

export const deleteMenuItem = (id) => {
    return (dispatch, getState) => {
        try {
            api.deleteMenuItem(getState().currentCategory, id);
        } catch (e) {
            dispatch({
                type: DELETE_MENUITEM_FAIL,
            });
            return;
        }
        dispatch({
            type: DELETE_MENUITEM_SUCCESS,
            id,
        });
    };
};

export const soldOutMenuItem = (id) => {
    let menuItem;
    return async (dispatch, getState) => {
        try {
            menuItem = await api.soldOutMenuItem(
                getState().currentCategory,
                id
            );
        } catch (e) {
            dispatch({
                type: SOLDOUT_MENUITEM_FAIL,
            });
            return;
        }
        dispatch({
            type: SOLDOUT_MENUITEM_SUCCESS,
            menuItem,
        });
    };
};
