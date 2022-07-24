const template = document.createElement("template");
template.innerHTML = /* html */ `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">
      <slot name="menu-name"></slot>
    </span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>
`;

export default class MenuItem extends HTMLElement {
  static get observedAttributes() {
    return ["name", "is-sold-out"];
  }

  /**
   * @param {string} name
   * @param {boolean} isSoldOut
   */
  constructor(name, isSoldOut) {
    super();

    this.appendChild(template.content.cloneNode(true));
    this.name = name;
    this.isSoldOut = isSoldOut;
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "name":
        this.querySelector("slot[name='menu-name']").textContent = newValue;
        break;
      case "is-sold-out":
        const menu = this.querySelector(".menu-name");
        if (newValue === "true") {
          menu.classList.add("sold-out");
        } else {
          menu.classList.remove("sold-out");
        }
        break;
      default:
        break;
    }
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(value) {
    this.setAttribute("name", value);
  }

  get isSoldOut() {
    return this.getAttribute("is-sold-out") === "true";
  }

  set isSoldOut(value) {
    this.setAttribute("is-sold-out", value);
  }
}

window.customElements.define("moon-menu-item", MenuItem);
