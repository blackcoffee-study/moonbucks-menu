export function makeConfirmAlert(msg) {
  return confirm(msg);
}

export function makePrompt(msg) {
  return prompt(msg);
}

export function getLocalStorageItem(stateId) {
  try {
    const state = localStorage.getItem(stateId);
    return JSON.parse(state);
  } catch (e) {
    console.error(e);
  }
}

export function setLocalStorageItem(stateId, state) {
  try {
    localStorage.setItem(stateId, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
}
