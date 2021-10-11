export default class Component {
  props;
  state;
  targetElement;
  listenerInfos;
  childrenComponents;

  constructor(targetElement, props) {
    this.props = props;
    this.targetElement = targetElement;
    this.childrenComponents = [];

    this.created();
    this.beforeMounted();
    this.mounted();
  }

  // listenerInfos를 초기화하는 메소드
  initListenerInfos() {
    console.log("initListenerInfos");
  }

  // state를 초기화하는 메소드
  initState() {
    console.log("initState");
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

          console.log(this.state);

          this.beforeUpdated();
          // state 변경 후 업데이트 반영
          this.updated();
        }.bind(this),
        0
      );
    } else throw new Error("state 파라미터로 객체만 넣을 수 있습니다.");
  }

  // event targets에 이벤트 리스너들을 달기위한 메소드
  setEventListeners(listenerInfos) {
    console.log("setEventListeners", listenerInfos);
    listenerInfos.forEach(({ eventTarget, eventType, listener }) => {
      eventTarget.addEventListener(eventType, listener);
    });
  }

  // event targets에 이벤트 리스너들을 제거하기 위한 메소드
  clearEventListeners(listenerInfos) {
    listenerInfos.forEach(({ eventTarget, eventType, listener }) => {
      eventTarget.removeEventListener(eventType, listener);
    });
  }

  // 맨 처음 컨텐츠를 렌더링하거나 state 변화 이후 컨텐츠를 재렌더링하는 메소드
  render() {
    console.log("rendering...");
    this.targetElement.innerHTML = this.makeTemplate();
  }

  // 기초적인 created 라이프사이클
  created() {
    console.log("created ...");

    this.initState();
    this.render();
    this.initListenerInfos();
  }

  // 기초적인 beforeMounted 라이프사이클
  beforeMounted() {
    console.log("beforeMounted...");
  }

  // 기초적인 mounted 라이프사이클
  mounted() {
    console.log("mounted...");
  }

  // 기초적인 beforeUpdated 라이프사이클
  beforeUpdated() {
    console.log("beforeUpdated");
  }

  // 기초적인 updated 라이프사이클
  updated() {
    console.log("updated...");
    this.render();
    this.initListenerInfos();

    this.childrenComponents.forEach((childComponent) =>
      childComponent.render()
    );
  }

  // 컴포넌트의 템플릿을 만드는 메소드. todo : 나중에 Virtual dom 적용해볼 것
  makeTemplate() {
    return ``;
  }
}
