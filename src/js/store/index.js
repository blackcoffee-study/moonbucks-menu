import { ACTION, CATEGORY } from '../const/index.js';

export const store = {
  [CATEGORY.ESPRESSO]: new Map(),
};

const addMenu = (state, payload) => {
  const id = `${Date.now()}`;
  state.set(id, {
    id,
    ...payload,
  });
};
const editMenu = (state, { id, ...rest }) => {
  const oldValue = state.get(id);
  state.set(id, {
    ...oldValue,
    ...rest,
  });
};
const removeMenu = (state, { id }) => state.has(id) && state.delete(id);

const getMenus = (state) => [...state.values()];
const getMenuById = (state, { id }) => state.get(id);
const getSize = (state) => state.size;
const hasMenuById = (state, { id }) => state.has(id);
const hasMenuByName = (state, { name }) =>
  getMenus(state).some(({ name: _n }) => _n === name);

const menuRendererState = (state) => ({
  menus: getMenus(state),
  size: getSize(state),
});

const triggerCoupler = (renderer) => ({
  [ACTION.ADD_MENU](state, payload) {
    addMenu(state, payload);
    renderer(menuRendererState(state));
  },
  [ACTION.EDIT_MENU](state, payload) {
    editMenu(state, payload);
    renderer(menuRendererState(state));
  },
  [ACTION.REMOVE_MENU](state, payload) {
    removeMenu(state, payload);
    renderer(menuRendererState(state));
  },
  [ACTION.GET_MENUS](state) {
    return getMenus(state);
  },
  [ACTION.GET_MENU_BY_ID](state, payload) {
    return getMenuById(state, payload);
  },
  [ACTION.GET_SIZE](state) {
    return getSize(state);
  },
  [ACTION.HAS_MENU_BY_ID](state, payload) {
    return hasMenuById(state, payload);
  },
  [ACTION.HAS_MENU_BY_NAME](state, payload) {
    return hasMenuByName(state, payload);
  },
});

export const storeHandler = (
  (triggerCoupler) =>
  (state, renderer) =>
  (action, payload = null) => {
    const trigger = triggerCoupler(renderer);
    return trigger[action](state, payload);
  }
)(triggerCoupler);
