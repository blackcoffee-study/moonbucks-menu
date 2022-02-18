const createStore = (preloadedState, reducer) => {
  let currentState = preloadedState;
  const currentReducer = reducer;
  const callbackEvents = [];

  const getState = () => {
    return currentState;
  }

  const subscribe = (listener) => {
    callbackEvents.push(listener);
  }

  const dispatch = (action) => {
    currentState = currentReducer(currentState, action);
    callbackEvents.forEach((event) => event());
  }

  return {
    getState,
    subscribe,
    dispatch,
  };
};

export default createStore;
