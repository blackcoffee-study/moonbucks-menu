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
    this.render();
  }

  setState(key, value) {
    this.state = { ...this.state, [key]: value };
    if (this.stateId) {
      setLocalStorageItem(this.stateId, this.state);
    }
    this.render();
  }

  getHTMLElement(template) {
    const $wrapper = document.createElement('template');
    $wrapper.innerHTML = template;
    const $targetElement = $wrapper.content.cloneNode(true);
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

  render() {}
}
