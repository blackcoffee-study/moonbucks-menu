const store = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
};

export const setLocalState = (type, state) => localStorage.setItem(type, JSON.stringify(state));

export const getLocalState = state => JSON.parse(localStorage.getItem(state));

const setInitialStorage = () => {
    const state = getLocalState('store');

    if (!state) localStorage.setItem('store', JSON.stringify(store));
};

export default function handleLocalStorage() {
    setInitialStorage();
}
