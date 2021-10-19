import utils from '../utils/index.js';

const createStore = (reducer, middleware) => {
  const state = observable(reducer()());

  // const forbiddenState = (state => {
  //   Object.keys(state).forEach(key => {
  //     Object.defineProperty(state, key, {
  //       writable: false,
  //     });
  //   });
  //   return state;
  // })(state);

  const dispatch = action => {
    const newState = reducer(state)(action);
    // 미들웨어
    if (typeof middleware === 'function') middleware(action, newState);
    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  const publish = callback => {
    state.publish(callback);
  };

  const getState = () => {
    return utils.deepClone(state);
  };

  return { dispatch, publish, getState };
};

export default createStore;

const observable = state => {
  let handlers = {};

  const watchState = new Proxy(utils.deepClone(state), {
    set: (target, name, value) => {
      if (target[name] && utils.isEqualsObject(target[name], value))
        return true;
      target[name] = value;
      Object.keys(handlers).forEach(_key => {
        handlers[_key](utils.objectFreeze(watchState));
      });
      return true;
    },
  });

  watchState.publish = callback => {
    Object.keys(callback).forEach(_key => {
      handlers[_key] = utils.debounce(callback[_key]);
      callback[_key](utils.objectFreeze(watchState));
    });
  };

  watchState.clear = () => {
    handlers = {};
  };

  return watchState;
};
