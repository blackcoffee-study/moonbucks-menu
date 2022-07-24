import { CATEGORY_LIST } from '../constant/index.js';
import Component from './Component.js';

export default class MenuCategory extends Component {
  constructor(containerId) {
    const menuGroupTemplate = `<button
    id="{{id}}"
    class="cafe-category-name btn bg-white shadow mx-1"
  >
    {{name}}
  </button>`;
    super(containerId, menuGroupTemplate);
  }

  init() {
    window.location.hash = 'espresso';

    this.container.addEventListener('click', ({ target }) => {
      if (!target) return;

      if (target.classList.contains('cafe-category-name')) {
        const categoryId = target.id;
        const categoryName = target.textContent;

        this.changeHash(categoryId);
        this.updateCategoryName(categoryName);
      }
    });
  }

  changeHash(hash) {
    window.location.hash = hash;
  }

  updateCategoryName(categoryName) {
    const $categoryName = document.getElementById('category-name');
    $categoryName.textContent = `${categoryName} 메뉴 관리`;
  }

  makeHTML() {
    CATEGORY_LIST.forEach((category) => {
      this.updateTemplate('id', category.id);
      this.updateTemplate('name', category.name);

      const $templateElement = this.getHTMLElement(this.renderTemplate);

      this.htmlList.push($templateElement);
      this.resetRenderTemplate();
    });
  }

  render() {
    this.makeHTML();
    this.updateView();
  }
}
