import { CATEGORY_LABEL, SELECTOR } from '../const/index.js';
import { $, targetElementWrapper } from '../utils/dom.js';
import { currentStore } from '../store/index.js';
import { toggleTab } from '../action/index.js';
import * as Api from '../api/query/index.js';

const tabItem = ({ name, label }) => `
  <button
    data-category-name="${name}"
    class="cafe-category-name btn bg-white shadow mx-1"
  >
    ${label}
  </button>
`;
const Tab = () => {
  const $tab = $(SELECTOR.TAB);

  $tab.addEventListener('click', (event) => {
    event.stopPropagation();

    const { tabStore } = currentStore();
    const target = targetElementWrapper(event.target);
    const name = target.dataset('categoryName');

    const payload = { name, label: CATEGORY_LABEL[name] };

    Api.postCurrentTab(payload);
    tabStore.dispatch(toggleTab(payload));
  });

  const renderer = () => {
    const { tabStore } = currentStore();
    $tab.innerHTML = tabStore.state.get('tabs').map(tabItem).join('');
  };
  return {
    renderer,
  };
};

export default Tab;
