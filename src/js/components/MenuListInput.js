import Component from "../cores/Component.js";

export default class MenuListInput extends Component {
  makeTemplate() {
    return `<form id="espresso-menu-form">
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        에스프레소 메뉴 이름
      </label>
      <input
              type="text"
              id="espresso-menu-name"
              name="espressoMenuName"
              class="input-field"
              placeholder="에스프레소 메뉴 이름"
              autocomplete="off"
              value="${this.state.inputValue}"
      />
      <button
              type="button"
              name="submit"
              id="espresso-menu-submit-button"
              class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>`;
  }

  initListenerInfos() {
    super.initListenerInfos();

    this.listenerInfos = [
      {
        eventTarget: this.targetElement.querySelector("#espresso-menu-form"),
        eventType: "submit",
        listener: this.formSubmitListener.bind(this),
      },
      {
        eventTarget: this.targetElement.querySelector(
          "#espresso-menu-submit-button"
        ),
        eventType: "click",
        listener: this.submitButtonClickListener.bind(this),
      },
      {
        eventTarget: this.targetElement.querySelector("#espresso-menu-name"),
        eventType: "change",
        listener: this.inputValueChangeListener.bind(this),
      },
    ];
  }

  initState() {
    super.initState();

    this.state = {
      inputValue: "",
    };
  }

  inputValueChangeListener(event) {
    console.log("inputValueChangeListener");

    this.setState({
      inputValue: event.target.value,
    });
  }

  formSubmitListener(event) {
    event.preventDefault();
    console.log("formSubmitListener");

    /**
     * @todo form submit을 위한 비동기 메소드 하나 만들 것.
     */
    setTimeout(
      function () {
        this.props.addMenu(this.state.inputValue);
      }.bind(this),
      0
    );
  }

  submitButtonClickListener() {}
}
