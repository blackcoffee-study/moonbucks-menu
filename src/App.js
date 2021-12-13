import Component from './core/Component.js';
import Header from './components/Header.js';
import MenuForm from './components/MenuForm.js';
import MenuList from './components/MenuList.js';
import {
  createMenu,
  deleteMenu,
  getMenuList,
  putMenuName,
  putMenuSoldout,
} from './api/menu.js';

export default class App extends Component {
  async setup() {
    this.$state = {
      selected: 'espresso',
      espresso: { title: '☕ 에스프레소', items: [] },
      frappuccino: { title: '🥤 프라푸치노', items: [] },
      blended: { title: '🍹 블렌디드', items: [] },
      teavana: { title: '🫖 티바나', items: [] },
      desert: { title: '🍰 디저트', items: [] },
    };

    const result = await getMenuList(this.$state.selected);

    const newState = { ...this.$state[this.$state.selected], items: result };
    this.setState({
      [this.$state.selected]: newState,
    });
  }
  
  template() {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
            <header class="my-4" data-component="header"></header>
            <main class="mt-10 d-flex justify-center">
              <div class="wrapper bg-white p-10">
                <div data-component="menu-form"></div>
                <div data-component="menu-list"></div>
              </div>
            </main>
        </div>
      </div>  
      `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $menuForm = this.$target.querySelector(
      '[data-component="menu-form"]'
    );
    const $menuList = this.$target.querySelector(
      '[data-component="menu-list"]'
    );

    new Header($header, {
      changeMenu: this.changeMenu.bind(this),
    });
    new MenuForm($menuForm, {
      ...this.$state,
      addMenuList: this.addMenuList.bind(this),
    });
    new MenuList($menuList, {
      ...this.$state,
      deleteMenuList: this.deleteMenuList.bind(this),
      editMenuList: this.editMenuList.bind(this),
      editSoldout: this.editSoldout.bind(this),
    });
  }

  async changeMenu(e) {
    this.setState({
      ...this.$state,
      selected: e.target.dataset.categoryName,
    });
    const result = await getMenuList(this.$state.selected);
    const newState = { ...this.$state[this.$state.selected], items: result };
    this.setState({
      [this.$state.selected]: newState,
    });
  }

  async addMenuList(inputValue) {
    const { selected } = this.$state;
    const { items } = this.$state[selected];

    const result = await createMenu(this.$state.selected, inputValue);
    if (result === false) return;

    const newItems = {
      ...this.$state[selected],
      items: [...items, result],
    };

    this.setState({
      ...this.$state,
      [selected]: newItems,
    });
  }

  async deleteMenuList(id) {
    const { selected } = this.$state;
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      const result = await deleteMenu(selected, id);

      if (result === false) return;

      const filterItems = this.$state[selected].items.filter(
        item => item.id !== id
      );

      this.setState({
        ...this.$state,
        [selected]: { ...this.$state[selected], items: filterItems },
      });
    }
  }

  async editMenuList(id) {
    const { selected } = this.$state;
    const menu = this.$state[selected].items.find(item => item.id === id);
    const value = prompt('메뉴를 수정하세요', menu.name);
    if (value === null) return;

    const result = await putMenuName(selected, menu.id, value);
    if (result === false) return;

    const editItems = this.$state[selected].items.map(item => {
      if (value !== null && item.id === id) {
        return result;
      }
      return item;
    });

    this.setState({
      ...this.$state,
      [selected]: { ...this.$state[selected], items: editItems },
    });
  }

  async editSoldout(id) {
    const { selected } = this.$state;

    const result = await putMenuSoldout(selected, id);
    if (result === false) return;

    const editItems = this.$state[selected].items.map(item => {
      if (item.id === id) {
        return result;
      }
      return item;
    });
    this.setState({
      ...this.$state,
      [selected]: { ...this.$state[selected], items: editItems },
    });
  }
}
