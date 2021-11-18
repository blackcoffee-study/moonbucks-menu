import Form from "./Form.js";
import List from "./List.js";

export default function App({ $root, initialState }) {
  this.state = initialState;

  this.$app = document.createElement("div");
  this.$app.id = "app";
  this.$app.className = "px-4";

  $root.appendChild(this.$app);

  this.render = () => {
    this.$app.innerHTML = `
      <div class="d-flex justify-center mt-5 w-100">
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
            <div id="container" class="wrapper bg-white p-10">
              <div class="heading d-flex justify-between">
                <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
                <span class="mr-2 mt-4 menu-count">총 0개</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;
  };

  this.render();

  new Form({
    $app: document.querySelector("#container"),
    onSubmit: () => console.log("submit"),
  });

  new List({
    $app: document.querySelector("#container"),
    initialState: this.state.menuList,
  });
}
