import Component from './core/Component.js';
import Header from './components/Header.js';
import MenuForm from './components/MenuForm.js';
import MenuList from './components/MenuList.js';

export default class App extends Component {
  setup() {
    const saveData = () => {
      localStorage.setItem(
        'item',
        JSON.stringify({ ...this.$state, selected: 'espresso' })
      );
      window.removeEventListener('beforeunload', saveData);
    };
    window.addEventListener('beforeunload', saveData);
    const loadData = JSON.parse(localStorage.getItem('item'));
    if (loadData === null) {
      this.$state = {
        selected: 'espresso',
        espresso: { title: '☕ 에스프레소', items: [] },
        frappuccino: { title: '🥤 프라푸치노', items: [] },
        blended: { title: '🍹 블렌디드', items: [] },
        teavana: { title: '🫖 티바나', items: [] },
        desert: { title: '🍰 디저트', items: [] },
      };
    } else {
      this.$state = loadData;
    }
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

  changeMenu(e) {
    this.setState({
      ...this.$state,
      selected: e.target.dataset.categoryName,
    });
  }

  addMenuList(inputValue) {
    const { selected } = this.$state;
    const { items } = this.$state[selected];

    const newItems = {
      ...this.$state[selected],
      items: [
        ...items,
        {
          id: +`${
            items.length === 0
              ? items.length + 1
              : items[items.length - 1].id + 1
          }`,
          name: inputValue,
          soldout: false,
        },
      ],
    };

    this.setState({
      ...this.$state,
      [selected]: newItems,
    });
  }

  deleteMenuList(id) {
    const { selected } = this.$state;
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      const filterItems = this.$state[selected].items.filter(
        item => item.id !== +id
      );
      this.setState({
        ...this.$state,
        [selected]: { ...this.$state[selected], items: filterItems },
      });
    }
  }

  editMenuList(id) {
    const { selected } = this.$state;
    const menu = this.$state[selected].items.find(item => item.id === +id);
    const value = prompt('메뉴를 수정하세요', menu.name);

    const editItems = this.$state[selected].items.map(item => {
      if (value !== null && item.id === +id) {
        return { id: item.id, name: value, soldout: item.soldout };
      }
      return item;
    });
    this.setState({
      ...this.$state,
      [selected]: { ...this.$state[selected], items: editItems },
    });
  }

  editSoldout(id) {
    const { selected } = this.$state;
    const editItems = this.$state[selected].items.map(item => {
      if (item.id === +id) {
        return { id: item.id, name: item.name, soldout: !item.soldout };
      }
      return item;
    });
    this.setState({
      ...this.$state,
      [selected]: { ...this.$state[selected], items: editItems },
    });
  }
}
