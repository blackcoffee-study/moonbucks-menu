import utils from '../../utils/index.js';
import store from '../../store/index.js';
import changeToDiff from './index.js';

export default class Component {
  constructor(element, props) {
    this.$element = element;
    this._props = props;
    this._utils = utils;
    this._store = store;
    this.initialized();
    this.render();
  }

  initialized() {}

  template() {
    return '';
  }

  render() {
    changeToDiff(this.$element, this.template());
    this.mount();
  }

  mount() {}
}
