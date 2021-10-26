import { EVENTS } from '../../constants';
import Component from '../../core/Component';
import { actions } from '../../store';
import Category from './Category';

export default class Header extends Component {
	template() {
		return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav
      class="d-flex justify-center flex-wrap nav-category-tab"
      data-component="category"
    >
		{{category}}
    </nav>
    `;
	}
	mount() {
		new Category('category', this.store, this.$parent);
	}
	bindEvents() {
		return [
			{
				eventType: EVENTS.click,
				callback: (e) => {
					const { target } = e;
					if (target.closest('[data-category-name]')) {
						const clickedTab = target.dataset['categoryName'];
						actions.changeTabAct(clickedTab);
					}
				},
			},
		];
	}
}
