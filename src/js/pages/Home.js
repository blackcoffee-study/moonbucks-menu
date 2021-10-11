import Component from "../cores/Component.js";
import MenuListInput from "../components/MenuListInput.js";

export default class Home extends Component {
  makeTemplate() {
    return `<div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4">
        <a href="/" class="text-black">
          <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
        </a>
        <nav class="d-flex justify-center flex-wrap">
          <button
                  data-category-name="espresso"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            ☕ 에스프레소
          </button>
          <button
                  data-category-name="frappuccino"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🥤 프라푸치노
          </button>
          <button
                  data-category-name="blended"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🍹 블렌디드
          </button>
          <button
                  data-category-name="teavana"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🫖 티바나
          </button>
          <button
                  data-category-name="desert"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🍰 디저트
          </button>
        </nav>
      </header>
      <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between">
            <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
            <span class="mr-2 mt-4 menu-count">총 0개</span>
          </div>
          <div id="espresso-menu-form-wrapper">
          
          </div>
          <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
        </div>
      </main>
    </div>
  </div>`;
  }

  initState() {
    this.state = {
      menu: [],
    };
  }

  addMenu(newMenu) {
    console.log(newMenu);
    this.setState({
      menu: [...this.state.menu, newMenu],
    });
  }

  created() {
    super.created();

    const wrapper = this.targetElement.querySelector(
      "#espresso-menu-form-wrapper"
    );
    const menuListInput = new MenuListInput(wrapper, {
      menu: this.state.menu,
      addMenu: this.addMenu.bind(this),
    });

    this.childrenComponents = [menuListInput];
  }

  updated() {}
}
