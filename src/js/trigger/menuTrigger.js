import { ACTION } from '../const/index.js';
import { isEmpty } from '../utils/index.js';
import { currentStore } from '../store/index.js';

const addMenu = (state, payload) => {
  state.set(payload.id, payload);
};

const editMenu = (state, { id, ...rest }) => {
  const oldValue = state.get(id);
  state.set(id, {
    ...oldValue,
    ...rest,
  });
};

const removeMenu = (state, { id }) => {
  return state.has(id) && state.delete(id);
};

const getMenus = (state) => [...state.values()];

const triggerCoupler = () => {
  const menuRenderer = () => {
    const { renderer } = currentStore();
    if (!renderer) return;

    renderer.header();
    renderer.form();
    renderer.list();
  };
  return {
    [ACTION.ADD_MENUS](state, payload) {
      if (isEmpty(payload.data)) return;
      payload.data.forEach((info) => {
        info.data.forEach((data) =>
          payload.store[info.tag].state.set(data.id, data)
        );
      });
      menuRenderer(state);
    },
    [ACTION.ADD_MENU](state, payload) {
      addMenu(state, payload);
      menuRenderer();
    },
    [ACTION.EDIT_MENU](state, payload) {
      editMenu(state, payload);
      menuRenderer();
    },
    [ACTION.REMOVE_MENU](state, payload) {
      removeMenu(state, payload);
      menuRenderer();
    },
    [ACTION.GET_MENUS](state) {
      return getMenus(state);
    },
  };
};

export default triggerCoupler;
