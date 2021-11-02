import Component from "./Core/Component";

import { store } from "./MenuStore";
import { getCategories } from "./Core/Constants";
import { Action } from "./Core/types";

export default class MenuNavigation extends Component {
  template() {
    return `<a href="/" class="text-black">
<h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
${getCategories()
  .map(
    (category) =>
      `<button
data-category-name=${category.key}
class="cafe-category-name btn bg-white shadow mx-1"
>${category.icon}${category.name}
</button>
`
  )
  .join("")}`;
  }

  setEvent() {
    this.addEvent("click", "button.cafe-category-name", (e) => {
      const Name = (e.target as HTMLElement).dataset.categoryName;
      console.log(Name);
      store.dispatch(Action.FETCH, Name);
    });
  }
}
