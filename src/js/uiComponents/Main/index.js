import Component from '../../core/Component';
import MenuInput from './MenuInput';
import MenuList from './menuList';
import MenuTitle from './MenuTitle';

export default class Main extends Component {
	template() {
		return `
    <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between" data-component="menu-title">
            {{menu-title}}
          </div>
          <form id="espresso-menu-form" data-component="menu-input">
            {{menu-input}}
          </form>
          <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list">
            {{menu-list}}
          </ul>
        </div>
    `;
	}
	mount() {
		new MenuTitle('menu-title', this.store, this.$component);
		new MenuInput('menu-input', this.store, this.$component);
		new MenuList('menu-list', this.store, this.$component);
	}
}
