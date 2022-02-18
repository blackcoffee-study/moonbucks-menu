import { type } from "../utils/type.js";

// 컨트롤할 요소와 component 를 이어주는 인덱스
const registry = {};

// HOF 타입체크 필요없음. renderRoot에서 검증
const renderWrapper = (component) => {
  return ($targetEl, state, events) => {
    const element = component($targetEl, state, events);

    const childComponents = element.querySelectorAll("[data-component]");

    // compoent를 순회하면서 각 data-component와 맞는 component 매칭
    Array.from(childComponents).forEach(($target) => {
      // 해당 target에서 dataset 속성 가져오기 (data-component)
      const name = $target.dataset.component;

      // 해당 컨트롤러와 매칭
      const child = registry[name];

      if (!child) {
        return;
      }

      const component = child($target, state, events);

      $target.replaceWith(component);
    });

    return element;
  };
};

const add = (name, component, _0 = type(name, "string"), _1 = type(component, "function")) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (
  root,
  state,
  events,
  _0 = type(root, Element),
  _1 = type(state, "object"),
  _2 = type(events, "object")
) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};
