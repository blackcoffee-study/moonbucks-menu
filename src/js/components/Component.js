import { setLocalStorageItem } from '../utils/index.js';

export default class Component {
  constructor(containerId, template, stateId) {
    const $container = document.getElementById(containerId);

    if (!$container) {
      throw "container doesn't exists";
    }

    if (stateId) this.stateId = stateId;
    this.state = {};
    this.container = $container;
    this.baseTemplate = template;
    this.renderTemplate = template;
    this.htmlList = [];
    this.init();
    if (!stateId) this.render();
  }

  setState(key, value) {
    if (typeof key === 'string') {
      this.state = { ...this.state, [key]: value };
    } else if (typeof key === 'object' && !Array.isArray(key) && key !== null) {
      this.state = key;
    } else {
      throw ': unexpected argument';
    }

    if (this.stateId) {
      setLocalStorageItem(this.stateId, this.state);

      if (this.stateId === location.hash.substring(1)) {
        this.render();
      }

      return;
    }
    this.render();
  }

  getHTMLElement(template) {
    const $wrapper = document.createElement('div');
    $wrapper.innerHTML = template;
    const $targetElement = $wrapper.firstChild.cloneNode(true);
    $wrapper.remove();
    return $targetElement;
  }

  updateTemplate(key, value) {
    this.renderTemplate = this.renderTemplate.replace(`{{${key}}}`, value);
  }

  resetRenderTemplate() {
    this.renderTemplate = this.baseTemplate;
  }

  clearHtmlList() {
    this.htmlList = [];
  }

  resetContainer() {
    while (this.container.firstChild) this.container.firstChild.remove();
  }

  updateView() {
    this.resetContainer();
    this.htmlList.forEach((html) => this.container.appendChild(html));
    this.clearHtmlList();
  }

  makeHTML() {}

  init() {}

  clearEvents() {}

  render() {}
}
