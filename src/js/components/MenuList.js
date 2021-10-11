import Component from "../cores/Component.js";

export default class MenuList extends Component {
  initListenerInfos() {
    super.initListenerInfos();

    this.listenerInfos = [
      {
        eventTarget: this.targetElement.querySelector("#espresso-menu-list"),
        eventType: "click",
        listener: this.itemButtonClickListener.bind(this),
      },
    ];
  }

  makeTemplate() {
    return `<ul id="espresso-menu-list" class="mt-3 pl-0">
      ${this.getMenuListItems().join("")}
    
    </ul>`;
  }

  getMenuListItems() {
    const { menu } = this.props;

    return menu.map(
      (item) =>
        `<li class="espresson-menu-item" data-key="${item.id}">${item.name}<button data-purpose="delete">삭제</button></li>`
    );
  }

  itemButtonClickListener(event) {
    const { parentNode, dataset } = event.target;
    const { purpose } = dataset;
    const { key } = parentNode.dataset;

    // 동적으로 개선 예정
    if (purpose === "delete") {
      this.props.removeMenu(key);
    }
  }

  mounted() {
    super.mounted();

    console.log(this.props.menu);
  }
}
