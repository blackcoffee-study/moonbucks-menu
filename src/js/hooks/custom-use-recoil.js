import Atom from './atom.js';

let _state = {};
let _index = {};
const subscribers = {};
const targets = {};

export function customUseRecoilState(key, component, target) {
  const state = _state[key] || Atom[key];

  if (!_index[key]) index[key] = 0;
  if (!subscribers[key]) subscribers[key] = [];
  if (!targets[key]) targets[key] = [];

  const index = _index[key]++;
  subscribers[key][index] = component;
  targets[key][index] = target;

  const setRecoilState = (newState) => {
    _state[key] = newState;
    _index[key] = 0;

    reRender();
  }

  const reRender = () => {
    subscribers[key]?.forEach((component, i) => {
      component(targets[key][i]);
    })
  };

  return [state, setRecoilState];
}

export function customUseRecoilValue(key, component, target) {
  const state = _state[key] || Atom[key];

  if (!_index[key]) _index[key] = 0;
  if (!subscribers[key]) subscribers[key] = [];
  if (!targets[key]) targets[key] = [];

  const index = _index[key]++;

  subscribers[key][index] = component;
  targets[key][index] = target;

  return state;
}

export function customUseRecoilSetState(key) {
  const setRecoilState = (newState) => {
    _state[key] = newState;
    _index[key] = 0;

    reRender();
  }

  const reRender = () => {
    subscribers[key]?.forEach((component, i) => {
      component(targets[key][i]);
    })

  };

  return setRecoilState;
}
