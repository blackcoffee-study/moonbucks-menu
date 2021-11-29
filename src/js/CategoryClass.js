import PubSub from '../utils/observer.js';
import categorys from '../constants/categorys.js';

export default class CategoryClass {
  constructor({ target }) {
    this.$target = target
    this.render()
    this.evnetHandler()
    this.pubsub = PubSub;
  }

  evnetHandler() {
    this.$target.addEventListener('click', (e) => {
      const categoryName = e.target.dataset.categoryName
      this.pubsub.pub('currentCategory', categoryName)
    })
  }

  render() {
    this.$target.innerHTML = categorys.map(menu => (
      `
        <button
          data-category-name="${menu.category}"
          class="cafe-category-name btn bg-white shadow mx-1"
        >
          ${menu.name}
        </button>
      `
    )).join('')
  }
}