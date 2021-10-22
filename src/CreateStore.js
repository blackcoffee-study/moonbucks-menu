const initState = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
    currentCategory: 'espresso',
};

export const createStore = (reducer) => {
    let state = initState;
    const eventHandlers = {};

    const subscribe = (actionType, eventHandler) => {
        if (!eventHandlers[actionType]) {
            eventHandlers[actionType] = [];
        }
        eventHandlers[actionType].push(eventHandler);
    };

    const publish = (actionType) => {
        if (!eventHandlers[actionType]) {
            return;
        }
        eventHandlers[actionType].map((fn) => fn(state));
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        publish(action.type);
    };

    const getState = () => state;

    return { subscribe, dispatch, getState };
};
