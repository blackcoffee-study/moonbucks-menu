import Component from './Component.js';

const categoryList = [
  { id: 'espresso', name: '☕ 에스프레소' },
  { id: 'frappuccino', name: '🥤 프라푸치노' },
  { id: 'blended', name: '🍹 블렌디드' },
  { id: 'teavana', name: '🫖 티바나' },
  { id: 'dessert', name: '🍰 디저트' },
];

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
    categoryList.forEach((category) => {
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
