export default class Component {
  props;
  state = {};
  targetElement;

  constructor(targetElement, props) {
    this.props = props;
    this.targetElement = targetElement;

    this.created();
  }

  // state를 초기화하는 메소드
  initState() {}

  // state에 변화를 주는 메소드
  setState(state) {
    // state parameter 는 object만 허용
    if (state.constructor === Object) {
      // 불변성 유지
      this.state = { ...this.state, ...state };

      // state 변경 후 재렌더링
      this.render();
    } else throw new Error("state 파라미터로 객체만 넣을 수 있습니다.");
  }

  // 맨 처음 컨텐츠를 렌더링하거나 state 변화 이후 컨텐츠를 재렌더링하는 메소드
  render() {
    this.targetElement.innerHTML += this.makeTemplate();
  }

  // 기초적인 created 라이프사이클. 마운트 시 일단 컨텐츠를 렌더링
  created() {
    this.initState();
    this.render();
  }

  // 컴포넌트의 템플릿을 만드는 메소드. todo : 나중에 Virtual dom 적용해볼 것
  makeTemplate() {
    return ``;
  }
}
