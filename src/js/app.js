import Component from './core/Component';
import Header from './uiComponents/Header';
import Main from './uiComponents/Main';

export default class App extends Component {
	template() {
		return `
    <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4" data-component="header">
      {{header}}
      </header>
      <main class="mt-10 d-flex justify-center" data-component="main">
        {{main}}
      </main>
    </div>
  </div>
    `;
	}
	mount() {
		new Header('header', this.store, this.$component);
		new Main('main', this.store, this.$component);
	}
}
