import { ACTION } from '../const/index.js';
import { currentStore } from '../store/index.js';

const toggleTab = (state, payload) => state.set('currentTab', payload);

const addTabs = (state, payload) => {
  state.set('tabs', payload);
};

const getTabs = (state) => {
  return [...state.get('tabs').values()];
};

const getCurrentTab = (state) => state.get('currentTab');

const triggerCoupler = () => {
  const tabRenderer = () => {
    const { renderer } = currentStore();
    if (!renderer) return;

    renderer.header();
    renderer.form();
    renderer.list();
  };
  return {
    [ACTION.TOGGLE_TAB](state, payload) {
      toggleTab(state, payload);
      tabRenderer();
    },
    [ACTION.ADD_TABS](state, payload) {
      addTabs(state, payload);
    },
    [ACTION.GET_TABS](state, payload) {
      getTabs(state, payload);
    },
    [ACTION.GET_CURRENT_TAB](state) {
      getCurrentTab(state);
    },
  };
};

export default triggerCoupler;
