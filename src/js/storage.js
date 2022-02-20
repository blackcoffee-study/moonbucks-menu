export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    if (!localStorage.getItem(key)) return;

    let items = JSON.parse(localStorage.getItem(key));
    return items;
};
