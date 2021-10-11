export default class Component {
  props;
  state = {};
  targetElement;

  constructor(props, targetElement) {
    this.props = props;
  }

  setState(state) {
    // state parameter 는 object만 허용
    if (state.constructor === Object) {
      this.state = { ...this.state, ...state };

      // state 변경 후 재렌더링
      this.render();
    } else throw new Error("state 파라미터로 객체만 넣을 수 있습니다.");
  }

  render() {}
}
