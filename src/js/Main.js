import MenuList from './MenuLIst.js';

export default function Main({ $app, initialState, updateMenuItems, editMenuItems, deleteMenuItems }) {

  this.state = { ...initialState, count: 0 };
  this.updateMenuItems = updateMenuItems;
  this.editMenuItems = editMenuItems;
  this.deleteMenuItems = deleteMenuItems;

  this.main = document.createElement('main');
  this.main.className = 'mt-10 d-flex justify-center';

  this.wrap = document.createElement('div');
  this.wrap.className = 'wrapper bg-white p-10';

  this.main.appendChild(this.wrap);
  $app.appendChild(this.main);

  const list = new MenuList({
    initialState: {
      currentCategory: this.state.currentCategory,
      currentCategoryMenuItems: this.state.currentCategoryMenuItems
    },
    updateMenuItems: this.updateMenuItems,
    editMenuItems: this.editMenuItems,
    deleteMenuItems: this.deleteMenuItems
  });

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.state.count = this.state.currentCategoryMenuItems.length;
    list.setState({
      currentCategory: this.state.currentCategory,
      currentCategoryMenuItems: this.state.currentCategoryMenuItems
    })
    this.render();
  }

  this.render = () => {
    this.wrap.innerHTML = `
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">${this.state.currentText} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${this.state.count}개</span>
      </div>
      <form id="espresso-menu-form">
        <div class="d-flex w-100">
          <label for="espresso-menu-name" class="input-label" hidden>
            ${this.state.currentText.substring(2, this.state.currentText.length)}메뉴 이름
          </label>
          <input type="text" id="espresso-menu-name" name="espressoMenuName" class="input-field"
            placeholder="${this.state.currentText.substring(2, this.state.currentText.length)}메뉴 이름" autocomplete="off" />
          <button type="button" name="submit" id="espresso-menu-submit-button"
            class="input-submit bg-green-600 ml-2">
            확인
          </button>
        </div>
      </form>
      
    `;
    const $menuForm = document.querySelector('#espresso-menu-form');
    const $menuName = document.querySelector('#espresso-menu-name');
    const $menuSubmitButton = document.querySelector('#espresso-menu-submit-button');

    list.setState({
      currentCategory: this.state.currentCategory,
      currentCategoryMenuItems: this.state.currentCategoryMenuItems
    })

    const submitMenuItem = (event) => {
      event.preventDefault();
      const inputValue = $menuName.value;

      if (inputValue === '') {
        alert('값을 입력해주세요.');
        return;
      }

      list.addMenuItem(inputValue);
      $menuName.value = '';
    };

    $menuSubmitButton.addEventListener('click', submitMenuItem);
    $menuForm.addEventListener('submit', submitMenuItem);
  }
}