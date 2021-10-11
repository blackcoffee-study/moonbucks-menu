export default class Component {
  props;
  state;
  targetElement;
  listenerInfos;
  childrenComponents;

  constructor(targetElement, props) {
    this.props = props;
    this.targetElement = targetElement;
    this.listenerInfos = [];
    this.childrenComponents = [];

    this.created();
    this.beforeMounted();
    this.mounted();
  }

  // listenerInfos를 초기화하는 메소드
  initListenerInfos() {
    // console.log("initListenerInfos");
  }

  // state를 초기화하는 메소드
  initState() {
    // console.log("initState");
  }

  // state에 변화를 주는 메소드
  setState(state) {
    // state parameter 는 object만 허용
    if (state.constructor === Object) {
      // 이벤트 큐의 뒤로 밀어버리기 위해 사용
      setTimeout(
        function () {
          // 불변성 유지
          this.state = { ...this.state, ...state };

          this.beforeUpdated();
          // state 변경 후 업데이트 반영
          this.updated();
        }.bind(this),
        0
      );
    } else alert("state 파라미터로 객체만 넣을 수 있습니다.");
  }

  // event targets에 이벤트 리스너들을 달기위한 메소드
  setEventListeners() {
    this.listenerInfos.forEach(({ eventTarget, eventType, listener }) => {
      eventTarget.addEventListener(eventType, listener);
    });
  }

  // event targets에 이벤트 리스너들을 제거하기 위한 메소드
  clearEventListeners() {
    this.listenerInfos.forEach(({ eventTarget, eventType, listener }) => {
      eventTarget.removeEventListener(eventType, listener);
    });
  }

  // 맨 처음 컨텐츠를 렌더링하거나 state 변화 이후 컨텐츠를 재렌더링하는 메소드
  render() {
    // console.log("rendering...");

    this.targetElement.innerHTML = this.makeTemplate();

    this.initListenerInfos();
  }

  // 기초적인 created 라이프사이클
  created() {
    // console.log("created ...");

    this.initState();
    this.render();
  }

  // 기초적인 beforeMounted 라이프사이클
  beforeMounted() {
    // console.log("beforeMounted...");
    this.setEventListeners();
  }

  // 기초적인 mounted 라이프사이클
  mounted() {
    // console.log("mounted...");
  }

  // 기초적인 beforeUpdated 라이프사이클
  beforeUpdated() {
    // console.log("beforeUpdated");
  }

  // 기초적인 updated 라이프사이클.
  // 완벽히 구현하려면 ... 나중에 virtual dom 추가해서 구현해보기
  updated() {
    this.render();
    this.setEventListeners();

    // this.childrenComponents.map((childComponent) => {
    //   childComponent.updated();
    // });
  }

  // 컴포넌트의 템플릿을 만드는 메소드. todo : 나중에 Virtual dom 적용해볼 것
  makeTemplate() {
    return ``;
  }
}
