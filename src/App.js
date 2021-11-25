import Component from './core/Component.js';
import Header from './components/Header.js';
import Main from './components/Main.js';

export default class App extends Component {
  template() {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
            <header class="my-4" data-component="header"></header>
            <main class="mt-10 d-flex justify-center" data-component="main"></main>
        </div>
      </div>  
      `;
  }
  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $main = this.$target.querySelector('[data-component="main"]');

    new Header($header);
    new Main($main);
  }
}
