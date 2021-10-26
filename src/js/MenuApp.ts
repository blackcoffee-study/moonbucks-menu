import Component from "./Core/Component";
import MenuList from "./MenuList";
import MenuCount from "./MenuCount";
import MenuNavigation from "./MenuNavigation";
import { store } from "./MenuStore";
import { MenuForm } from "./MenuForm";

export default class MenuApp extends Component {
  template() {
    const {
      state: { selected },
    } = store;
    return `
<div className="d-flex justify-center mt-5 w-100">
    <div className="w-100">
      <header className="my-4">
</header>
<main className="mt-10 d-flex justify-center">
        <div className="wrapper bg-white p-10">
          <div className="heading d-flex justify-between">
            <h2 className="mt-1">☕ 에스프레소 메뉴 관리</h2>
            <span className="mr-2 mt-4 menu-count"></span>
          </div>
          <form id="espresso-menu-form">
          </form>
          <ul id="espresso-menu-list" className="mt-3 pl-0"></ul>
        </div>
      </main>
    </div>
  </div>`;
  }

  mount() {
    new MenuForm(
      document.querySelector("form#espresso-menu-form") as HTMLElement,
      {}
    );
    new MenuNavigation(document.querySelector("header") as HTMLElement, {});
    new MenuList(
      document.querySelector("ul#espresso-menu-list") as HTMLElement,
      {}
    );
  }
}
