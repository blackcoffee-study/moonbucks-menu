import { KEY, CATEGORIES } from '../constants/constants.js';
import { $ } from '../common/DOM.js';
import { getLocalStorage, setLocalStroage } from '../common/localStorage.js';
import { LOCALSTORAGE } from '../constants/constants.js';

export default class Controller {
  constructor(model, view) {
    this.Model = model;
    this.View = view;

    this.$ = {
      nav: $('nav'),
      menuForm: $('#menu-form'),
      submitBtn: $('#menu-submit-button'),
      menuTitle: $('#category-title'),
      menuList: $('#menu-list'),
      menuCount: $('.menu-count'),
      menuInput: $('#menu-name'),
      menuManange: $('ul'),
    };

    this.currentCategory = CATEGORIES.ESPRESSO.EN;
  }

  initApp() {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);

    if (storage === null) {
      setLocalStroage(LOCALSTORAGE.ITEM, this.Model.menu);
    }
    this.View.render(CATEGORIES.ESPRESSO.EN);
    this.View.clearInputValue(this.$.menuInput);
    this.View.updateMenuCount(this.$.menuCount, this.currentCategory);
  }

  // 메소드명 수정 필요 ?
  updateApp(input, count, category) {
    this.View.render(category);
    this.View.clearInputValue(input);
    this.View.updateMenuCount(count, category);
  }

  bindEvent() {
    this.$.menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.$.menuInput.addEventListener('keyup', ({ key }) => {
      if (key === KEY.ENTER) {
        this.Model.updateStorage(this.currentCategory);

        if (this.$.menuList.dataset.categoryName === this.currentCategory) {
          this.updateApp(
            this.$.menuInput,
            this.$.menuCount,
            this.currentCategory
          );
        }
      }
    });

    this.$.nav.addEventListener('click', ({ target }) => {
      if (target.classList.contains('cafe-category-name')) {
        this.currentCategory = target.dataset.categoryName;

        this.$.menuTitle.textContent = `${target.textContent} 메뉴 관리`;

        this.$.menuList.dataset.categoryName = this.currentCategory;

        this.updateApp(
          this.$.menuInput,
          this.$.menuCount,
          this.currentCategory
        );
      }
    });

    this.$.submitBtn.addEventListener('click', () => {
      this.Model.updateStorage(this.currentCategory);

      if (this.$.menuList.dataset.categoryName === this.currentCategory) {
        this.updateApp(
          this.$.menuInput,
          this.$.menuCount,
          this.currentCategory
        );
      }
    });

    this.$.menuManange.addEventListener('click', ({ target }) => {
      if (target.classList.contains('menu-edit-button')) {
        this.Model.editMenuList(target, this.currentCategory);
      }
      if (target.classList.contains('menu-sold-out-button')) {
        this.Model.itemSoldOut(target);
      }
      if (target.classList.contains('menu-remove-button')) {
        this.Model.deleteListItem(target, this.currentCategory);
        this.View.updateMenuCount(this.$.menuCount, this.currentCategory);
      }
    });
  }
}
