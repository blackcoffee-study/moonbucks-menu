const _state = {};
const _index = {};
const subscribers = {};
const targets = {};

export function customUseRecoilState(atom, component, target) {
  const state = _state[atom.atom.key] || atom.default;

  if (!_index[atom.key]) index[atom.key] = 0;
  if (!subscribers[atom.key]) subscribers[atom.key] = [];
  if (!targets[atom.key]) targets[atom.key] = [];

  const index = _index[atom.key]++;
  subscribers[atom.key][index] = component;
  targets[atom.key][index] = target;

  const setRecoilState = (newState) => {
    _state[atom.key] = newState;
    _index[atom.key] = 0;

    reRender();
  }

  const reRender = () => {
    subscribers[key]?.forEach((component, i) => {
      component(targets[key][i]);
    })
  };

  return [state, setRecoilState];
}

export function customUseRecoilValue(atom, component, target) {
  const state = _state[atom.key] || atom.default;

  if (!_index[atom.key]) _index[atom.key] = 0;
  if (!subscribers[atom.key]) subscribers[atom.key] = [];
  if (!targets[atom.key]) targets[atom.key] = [];

  const index = _index[atom.key]++;

  subscribers[atom.key][index] = component;
  targets[atom.key][index] = target;

  return state;
}

export function customUseRecoilSetState(atom) {
  const setRecoilState = (newState) => {
    _state[atom.key] = newState;
    _index[atom.key] = 0;

    reRender();
  }

  const reRender = () => {
    subscribers[atom.key]?.forEach((component, i) => {
      component(targets[atom.key][i]);
    })

  };

  return setRecoilState;
}
