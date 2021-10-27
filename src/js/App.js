import FetchDelete from "./componant/FetchDelete.js";
import FetchGet from "./componant/FetchGet.js";
import FetchPost from "./componant/FetchPost.js";
import FetchPut from "./componant/FetchPut.js";
import MenuForm from "./componant/menuForm.js";
import Render from "./componant/Render.js";
import { $, $All, addEvent } from "./util/util.js";

export default function App({ target }) {
  this.$target = target;
  this.state = {
    id: [],
    menu: [],
    soldOut: [],
    navMenu: "espresso",
  };

  this.setState = async ({ newState, newMenu }) => {
    if (newState && (await FetchPost(newState, newMenu))) {
      this.state.menu = [...this.state.menu, newState];
      this.state.soldOut = [...this.state.soldOut, false];
    } else {
      this.state.navMenu = newMenu;

      if (await FetchGet(this.state.navMenu)) {
        const menuInfo = await FetchGet(this.state.navMenu);

        this.state.id = menuInfo.map((el) => el["id"]);
        this.state.menu = menuInfo.map((el) => el["name"]);
        this.state.soldOut = menuInfo.map((el) => el["isSoldOut"]);
      } else {
        this.state.menu = [];
        this.state.soldOut = [];
      }
    }
    new Render($("#espresso-menu-list"), this.state);
  };

  new MenuForm({
    $target: $("#espresso-menu-form"),
    onSubmit: (e) => {
      e.preventDefault();

      const $menu_input = $("#espresso-menu-name");
      let input_value = $menu_input.value;

      if (input_value === "") return;
      else {
        this.setState({ newState: input_value, newMenu: this.state.navMenu });
      }
    },
  });

  function onEdit(e) {
    e.preventDefault();

    const { target } = e;

    if (target.closest(".espresso-menu-update-btn")) {
      const idx = target.dataset.index;
      let editText = prompt("수정할 내용:");

      if (editText) {
        const id = this.state.id[idx];
        FetchPut(id, this.state.navMenu, editText);
        this.setState({ newState: null, newMenu: this.state.navMenu });
      }
    }
  }

  function onDelete(e) {
    e.preventDefault();

    const { target } = e;

    if (target.closest(".espresso-menu-delete-btn")) {
      if (confirm("삭제하시겠습니까?")) {
        const idx = target.dataset.index;
        const id = this.state.id[idx];
        FetchDelete(id, this.state.navMenu);

        this.setState({ newState: null, newMenu: this.state.navMenu });
      }
    }
  }

  function onSoldOut(e) {
    e.preventDefault();

    const { target } = e;

    if (target.closest(".espresso-menu-soldout-btn")) {
      const idx = target.dataset.index;
      const id = this.state.id[idx];
      FetchPut(id, this.state.navMenu, null);
      this.setState({ newState: null, newMenu: this.state.navMenu });
      const menuText = $All(".menu-list-item span")[idx];

      if (this.state.soldOut[idx]) {
        menuText.style.textDecoration = "line-through";
      } else {
        menuText.style.textDecoration = "none";
      }
    }
  }

  function onSelecteNavMenu(e) {
    const { target } = e;
    const navMenu = target.dataset.categoryName;
    $(".mt-1").innerText = `${target.innerText} 메뉴 관리`;
    if (navMenu) {
      this.setState({ newState: null, newMenu: navMenu });
    }
  }

  addEvent("click", $("#espresso-menu-list"), onEdit.bind(this));
  addEvent("click", $("#espresso-menu-list"), onDelete.bind(this));
  addEvent("click", $("#espresso-menu-list"), onSoldOut.bind(this));
  addEvent("click", $("nav"), onSelecteNavMenu.bind(this));

  this.setState({ newState: null, newMenu: this.state.navMenu });
}
