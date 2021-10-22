import LocalAdd from "./componant/Localadd.js";
import MenuForm from "./componant/menuForm.js";
import Render from "./componant/Render.js";
import { $, $All, addEvent } from "./util/util.js";

export default function App({ target }) {
  this.$target = target;
  this.state = {
    menu: [],
    soldOut: [],
    navMenu: "espresso",
  };

  this.setState = ({ newState, newMenu }) => {
    if (newState) {
      this.state.menu = [...this.state.menu, newState];
      this.state.soldOut = [...this.state.soldOut, false];
      LocalAdd(this.state);
    } else {
      this.state.navMenu = newMenu;
      if (localStorage.getItem(this.state.navMenu)) {
        this.state.menu = JSON.parse(
          localStorage.getItem(this.state.navMenu)
        ).menu;
        this.state.soldOut = JSON.parse(
          localStorage.getItem(this.state.navMenu)
        ).soldOut;
      } else {
        this.state.menu = [];
        this.state.soldOut = [];
      }
    }
    new Render($("#espresso-menu-list"), this.state);
    console.log(this.state);
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
        this.state.menu[idx] = editText;
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

        this.state.menu.splice(idx, 1);
        this.state.soldOut.splice(idx, 1);

        LocalAdd(this.state);
        this.setState({ newState: null, newMenu: this.state.navMenu });
      }
    }
  }

  function onSoldOut(e) {
    e.preventDefault();

    const { target } = e;

    if (target.closest(".espresso-menu-soldout-btn")) {
      const idx = target.dataset.index;
      this.state.soldOut[idx] = !this.state.soldOut[idx];
      LocalAdd(this.state);
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

/* const cafe_category_name = document.querySelectorAll(".cafe-category-name");

let seletedMenu = "espresso"; //기본값
//nav 메뉴 선택
cafe_category_name.forEach((el) => {
  el.addEventListener("click", () => {
    seletedMenu = el.dataset.categoryName;
  });
});

function main(seletedMenu) {
  //메뉴관리 문구 변경
  const header = document.querySelector(".mt-1");
  for (let i = 0; i < cafe_category_name.length; i++) {
    if (seletedMenu === cafe_category_name[i].dataset.categoryName) {
      header.textContent = `${cafe_category_name[i].textContent} 메뉴 관리`;
    }
  }

  //로컬에 저장되었던 메뉴들
  let menu_arr = JSON.parse(localStorage.getItem(seletedMenu))
    ? JSON.parse(localStorage.getItem(seletedMenu))
    : [];

  //메뉴입력 시 동작
  const espresso_menu_name_input =
    document.getElementById("espresso-menu-name");
  const espresso_menu_form = document.getElementById("espresso-menu-form");
  espresso_menu_form.addEventListener("submit", (e) => {
    e.preventDefault();

    //새로 등록한 메뉴 저장
    menu_arr.push(espresso_menu_name_input.value);
    localStorage.setItem(seletedMenu, JSON.stringify(menu_arr));
    console.log(menu_arr);
  });
}

window.onload = () => {
  main((seletedMenu = "espresso"));
};
 */
