export default class Component {
  constructor(containerId, template) {
    const $container = document.getElementById(containerId);

    if (!$container) {
      throw "container doen't exists";
    }

    this.container = $container;
    this.baseTemplate = template;
    this.renderTemplate = template;
    this.htmlList = [];
    this.state = {};
    this.initFunc();
    this.render();
  }

  addEvent($element, evnetName, func) {
    $element.addEventListener(evnetName, func);
  }

  setState(key, value) {
    this.state = { ...this.state, [key]: value };
    this.render();
  }

  getHTMLElement(template) {
    const $warpper = document.createElement('div');
    $warpper.innerHTML = template;
    const $targetElement = $warpper.firstChild.cloneNode(true);
    $warpper.remove();
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

  initFunc() {}

  render() {}
}
