export default class Component {
  props;
  state = {};
  targetElement;

  constructor(targetElement, props) {
    this.props = props;
    this.targetElement = targetElement;

    this.created();
    this.beforeMounted();
    this.mounted();
  }

  // state를 초기화하는 메소드
  initState() {}

  // state에 변화를 주는 메소드
  setState(state) {
    // state parameter 는 object만 허용
    if (state.constructor === Object) {
      // 불변성 유지
      this.state = { ...this.state, ...state };

      // state 변경 후 업데이트 반영
      this.updated();
    } else throw new Error("state 파라미터로 객체만 넣을 수 있습니다.");
  }

  // event targets에 이벤트 리스너들을 달기위한 메소드(이벤트 위임)
  setEventListeners(listenerInfos) {
    listenerInfos.forEach(({ eventTarget, eventType, listener }) => {
      eventTarget.addEventListener(eventType, listener);
    });
  }

  // 맨 처음 컨텐츠를 렌더링하거나 state 변화 이후 컨텐츠를 재렌더링하는 메소드
  render() {
    this.targetElement.innerHTML += this.makeTemplate();
  }

  // 기초적인 created 라이프사이클
  created() {
    this.initState();
    this.render();
  }

  // 기초적인 beforeMounted 라이프사이클
  beforeMounted() {}

  // 기초적인 mounted 라이프사이클
  mounted() {}

  // 기초적인 updated 라이프사이클
  updated() {
    this.render();
  }

  // 컴포넌트의 템플릿을 만드는 메소드. todo : 나중에 Virtual dom 적용해볼 것
  makeTemplate() {
    return ``;
  }
}
