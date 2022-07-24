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

  setState(key, value) {
    this.state = { ...this.state, [key]: value };
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
