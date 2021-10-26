import { store } from "../MenuStore";
import { observable, observe } from "./observer";
import { State } from "./type";
import { action } from "./Constants";

export default class Component {
  protected props: any;
  $el: HTMLElement;

  constructor($el: HTMLElement, props: any) {
    this.props = props;
    this.$el = $el;
    this.setup();
  }

  setup() {
    store.dispatch(action.INIT, {});
    observe(() => this.render());
    this.setEvent();
    this.mount();
  }

  mount() {}

  initState() {}

  template() {
    return ``;
  }

  setEvent() {}

  render() {
    this.$el.innerHTML = this.template();
  }

  addEvent<T extends keyof HTMLElementEventMap>(
    eventType: T,
    selector: string,
    callback: (e: HTMLElementEventMap[T]) => void
  ) {
    const children = [...this.$el.querySelectorAll(selector)];
    const isTarget = (target: any) =>
      target.closest(selector) || children.includes(target);
    this.$el.addEventListener(eventType, (e) => {
      if (!isTarget(e.target)) return false;
      callback(e);
    });
  }
}
