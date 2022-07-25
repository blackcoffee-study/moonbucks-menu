let currentIndex = 0;
const hookStates = [];

export function useState(initialState, rendering, renderingArgs) {
  const index = currentIndex;

  if (hookStates.length === index) {
    hookStates.push(initialState);
  }

  const setState = (newState) => {
    hookStates[index] = newState;
    rendering(hookStates[index], renderingArgs);
  };

  const getState = () => {
    return hookStates[index];
  };

  currentIndex++;
  return [getState, setState];
}
