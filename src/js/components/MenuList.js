import Component from "../cores/Component.js";

export default class MenuList extends Component {
  makeTemplate() {
    return `<ul id="espresso-menu-list" class="mt-3 pl-0">
      ${this.getMenuListItems().join("")}
    
    </ul>`;
  }

  getMenuListItems() {
    const { menu } = this.props;

    return menu.map((item) => `<li class="espresson-menu-item">${item}</li>`);
  }

  mounted() {
    super.mounted();

    console.log(this.props.menu);
  }
}
