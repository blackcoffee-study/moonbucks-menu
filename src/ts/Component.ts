class Component {
  $el;
  $props;

  constructor(el: HTMLElement, props: any) {
    this.$el = el;
    this.$props = props;
  }

  setup() {
    this.render();
    this.setEvent();
    this.mount();
  }

  mount() {}

  template() {
    return ``;
  }

  render() {
    this.$el.innerHTML = this.template();
  }

  setEvent() {}

  addEvent<T extends keyof HTMLElementEventMap>(
    eventType: T,
    selector: string,
    callback: (e: HTMLElementEventMap[T]) => void
  ) {
    const children = [...this.$el.querySelectorAll(selector)];
    const isTarget = (target: any) =>
      target.closest(selector) || children.includes(target);
    this.$el.addEventListener(eventType, (e) => {
      if (!isTarget(e.target)) {
        return false;
      }
      callback(e);
    });
  }
}
