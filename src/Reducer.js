import {
    ADD_MENUITEM,
    DELETE_MENUITEM,
    EDIT_MENUITEM,
    SOLDOUT_MENUITEM,
    UPDATE_CATEGORY,
} from './Constants.js';

export const reducer = (state, action) => {
    const stateKey = state.currentCategory;
    switch (action.type) {
        case ADD_MENUITEM:
            const newMenuItem = action.payload;
            state[stateKey].push(newMenuItem);
            return state;
        case DELETE_MENUITEM:
            state[stateKey].splice(action.payload.targetIdx, 1);
            return state;
        case EDIT_MENUITEM:
            state[stateKey][action.payload.targetIdx].name =
                action.payload.newName;
            return state;
        case SOLDOUT_MENUITEM:
            if (state[stateKey][action.payload.targetIdx].soldOut) {
                state[stateKey][action.payload.targetIdx].soldOut = false;
            } else {
                state[stateKey][action.payload.targetIdx].soldOut = true;
            }
            return state;
        case UPDATE_CATEGORY:
            state.currentCategory = action.payload.newCategory;
            return state;
        default:
            return state;
    }
};
