export default class MenuItem extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = /* html */ `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">
          <slot name="menu-name"></slot>
        </span>
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

    this.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "name") {
      this.querySelector("slot[name='menu-name']").textContent = newValue;
    }
  }
}

window.customElements.define("moon-menu-item", MenuItem);
