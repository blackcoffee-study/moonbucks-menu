export default class Component {
  constructor(containerId, template) {
    const $container = document.getElementById(containerId);

    if (!$container) {
      throw "container doesn't exists";
    }

    this.state = {};
    this.container = $container;
    this.baseTemplate = template;
    this.renderTemplate = template;
    this.htmlList = [];
    this.init();
    this.render();
  }

  addEvent($element, eventName, func) {
    $element.addEventListener(eventName, func);
  }

  setState(key, value) {
    this.state = { ...this.state, [key]: value };
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
    this.renderTemplate = this.renderTemplate.replace(key, value);
  }

  resetRenderTemplate() {
    this.renderTemplate = this.baseTemplate;
  }

  clearHtmlList() {
    this.htmlList = [];
  }

  resetContainer() {
    this.container.innerHTML = '';
  }

  makeConfirmAlert(msg) {
    return confirm(msg);
  }

  updateView() {
    this.resetContainer();
    this.htmlList.forEach((html) => this.container.appendChild(html));
    this.clearHtmlList();
  }

  makePrompt(msg) {
    return prompt(msg);
  }

  makeHTML() {}

  init() {}

  render() {}
}
