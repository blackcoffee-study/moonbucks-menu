import { currentStore } from './store/index.js';
import MenuList from './components/MenuList.js';
import Tab from './components/Tab.js';
import * as Action from './action/index.js';
import * as Api from './api/query/index.js';
import MenuHeader from './components/MenuHeader.js';
import MenuForm from './components/MenuForm.js';
import { CATEGORY } from './const/index.js';

const App = () => {
  const initTab = () => {
    const currentTab = Api.getCurrentTab();
    const { tabStore } = currentStore();

    tabStore.dispatch(Action.addTabs(Api.getTabs().data));
    tabStore.dispatch(Action.toggleTab(currentTab));
  };

  const initMenu = () => {
    const { menuStore, menuCommonStore } = currentStore();

    menuStore.dispatch(
      Action.addMenus({
        store: menuCommonStore,
        data: Api.getMenus({
          pathParams: {
            categoryName: Object.values(CATEGORY).join(','),
          },
        }),
      })
    );
  };

  const initRender = () => {
    const { renderer } = currentStore({
      header: MenuHeader().renderer,
      form: MenuForm().renderer,
      list: MenuList().renderer,
      tab: Tab().renderer,
    });

    Object.values(renderer).forEach((rd) => rd());
  };

  const init = () => {
    initTab();
    initMenu();
    initRender();
  };

  init();
};

window.requestAnimationFrame(App);
