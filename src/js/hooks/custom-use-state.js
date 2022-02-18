let indexOfState = new Map();
const statesOfComponents = new Map();

export default function useState(initState, component, $target) {
  if (!indexOfState.get(component)) {
    indexOfState.set(component, 0);
  }

  if (!statesOfComponents.get(component)) {
    statesOfComponents.set(component, []);
  }

  const key = indexOfState.get(component);
  const states = statesOfComponents.get(component);

  indexOfState.set(component, key + 1);

  if (states.length === key) {
    states.push(initState);
  }

  const state = states[key] || initState;

  const setState = (newState) => {
    states[key] = newState;
    indexOfState.set(component, 0);
    component($target);
  }

  return [state, setState];
}