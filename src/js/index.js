class App {
  constructor() {
    this.menuName = '';
    this.menuCount = 0;
    const confirmBtn = document.getElementById('espresso-menu-submit-button');
    confirmBtn.addEventListener('click', () => {
      this.confirmMenuName();
    });

    const input = document.getElementById('espresso-menu-name');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.confirmMenuName();
      } else {
        setTimeout(() => this.updateMenuName(e.target.value), 0);
      }
    });
  }

  confirmMenuName() {
    if (this.menuName !== '') {
      window.confirm('입력하시겠습니까?') && this.createLi();
    }
  }

  updateMenuName(val) {
    this.menuName = val;
  }

  updateMenuCount(type) {
    this.menuCount = type ? this.menuCount + 1 : this.menuCount - 1;
    document.getElementsByClassName(
      'menu-count'
    )[0].textContent = `총 ${this.menuCount}개`;
  }

  createLi() {
    const li = document.createElement('li');
    li.classList.add('menu-list-item', 'd-flex', 'items-center', 'py-2');
    const currentMenuId = `menu-${this.menuCount}`;
    li.setAttribute('id', currentMenuId);

    const span = document.createElement('span');
    span.classList.add('w-100', 'pl-2', 'menu-name');
    span.textContent = this.menuName;
    this.menuName = '';
    const modifyBtn = document.createElement('button');
    modifyBtn.classList.add(
      'bg-gray-50',
      'text-gray-500',
      'text-sm',
      'mr-1',
      'menu-edit-button'
    );
    modifyBtn.setAttribute('type', 'button');
    modifyBtn.textContent = '수정';
    modifyBtn.addEventListener('click', () => this.modifyLi(currentMenuId));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add(
      'bg-gray-50',
      'text-gray-500',
      'text-sm',
      'menu-remove-button'
    );
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => this.deleteLi(currentMenuId));
    li.appendChild(span);
    li.appendChild(modifyBtn);
    li.appendChild(deleteBtn);

    const ul = document.getElementById('espresso-menu-list');
    ul.appendChild(li);
    this.updateMenuCount(1);
    const input = document.getElementById('espresso-menu-name');
    input.value = '';
  }

  deleteLi(id) {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      document.getElementById(id).remove();
      this.updateMenuCount(0);
    }
  }

  modifyLi(id) {
    const modified = window.prompt('메뉴명을 수정하세요');
    const span = document.querySelector(`#${id} span`);
    span.textContent = modified;
  }
}

new App();
