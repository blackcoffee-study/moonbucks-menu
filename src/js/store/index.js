import MenuList from '../components/MenuList.js';
import { CATEGORY, CATEGORY_LABEL } from '../const/index.js';
import menuTrigger from '../trigger/menuTrigger.js';
import tabTrigger from '../trigger/tabTrigger.js';
import Tab from '../components/Tab.js';
import MenuForm from '../components/MenuForm.js';
import MenuHeader from '../components/MenuHeader.js';

const storeCreator = (triggerCoupler, renderer) => (state) => {
  const trigger = triggerCoupler(renderer);

  const dispatch = ({ type, payload }) => {
    trigger[type] && trigger[type](state, payload);
  };

  return {
    dispatch,
    state,
  };
};

const menuStoreCreator = (
  (storeCreatorCurry) => (trigger, renderer) =>
    Object.values(CATEGORY).reduce((store, menu) => {
      const creator = storeCreatorCurry(trigger, renderer);

      store[menu] = creator(new Map());

      return store;
    }, {})
)(storeCreator);

const tabStoreCreator = ((storeCreatorCurry) => (trigger, renderer) => {
  const creator = storeCreatorCurry(trigger, renderer);

  const tabMap = new Map();

  const initialCurrentTab = {
    name: CATEGORY.ESPRESSO,
    label: CATEGORY_LABEL[CATEGORY.ESPRESSO],
  };

  const initialTabs = Object.values(CATEGORY).map((tab) => ({
    label: CATEGORY_LABEL[tab],
    name: tab,
  }));

  tabMap.set('currentTab', initialCurrentTab);
  tabMap.set('tabs', initialTabs);

  return creator(tabMap);
})(storeCreator);

const menuStore = menuStoreCreator(menuTrigger);

const tabStore = tabStoreCreator(tabTrigger);

let _renderer = null;
export const currentStore = (renderer) => {
  const { name, label } = tabStore.state.get('currentTab');
  _renderer = renderer ? renderer : _renderer;
  return {
    categoryName: name,
    categoryLabel: label,
    menuCommonStore: menuStore,
    menuStore: menuStore[name],
    tabStore,
    renderer: _renderer,
  };
};

export const rendererStore = () => {
  return {
    header: MenuHeader().renderer,
    form: MenuForm().renderer,
    list: MenuList().renderer,
    tab: Tab().renderer,
  };
};
