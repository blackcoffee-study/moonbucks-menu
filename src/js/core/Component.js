export default class Component {
  domNode;

  state;

  props;

  constructor(domNode, props) {
    this.domNode = domNode;
    this.props = props;
    this.init();
    this.render();
    this.setEvent();
  }

  init() {}

  componentDidMount() {}

  template() {}

  render() {
    this.domNode.innerHTML = this.template();
    this.componentDidMount();
  }

  setEvent() {}

  setState(newState) {
    this.state = newState;
    this.render();
  }
}
