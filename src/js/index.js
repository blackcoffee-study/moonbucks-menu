class App {
  constructor() {
    this.menuName = '';
    this.menuCount = 0;

    const input = this.$('#espresso-menu-name');
    const form = this.$('#espresso-menu-form');
    const ul = this.$('#espresso-menu-list');

    ul.addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        const span = e.target.closest('li').querySelector('.menu-name');
        span.innerText = window.prompt('메뉴명을 수정하세요', span.innerText);
      }

      if (e.target.classList.contains('menu-remove-button')) {
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;
        e.target.closest('li').remove();
        this.updateMenuCount();
      }
    });

    input.addEventListener('input', (e) => {
      setTimeout(() => this.updateMenuName(e.target.value), 0);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.confirmMenuName();
    });
  }

  $(property) {
    return document.querySelector(property);
  }
  
  confirmMenuName() {
    if (!!this.menuName.trim()) {
      window.confirm('입력하시겠습니까?') && this.createLi();
    }
  }

  updateMenuName(val) {
    this.menuName = val;
  }

  updateMenuCount() {
    this.menuCount = document.querySelectorAll('.menu-list-item').length;
    document.getElementsByClassName(
      'menu-count'
    )[0].textContent = `총 ${this.menuCount}개`;
  }

  resetInputVal() {
    const input = document.getElementById('espresso-menu-name');
    input.value = '';
  }

  createLi() {
    const li = `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${this.menuName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`;

    const ul = document.getElementById('espresso-menu-list');

    ul.insertAdjacentHTML('beforeend', li);
    this.menuName = '';
    this.updateMenuCount();
    this.resetInputVal();
  }
}

new App();
