export const createStore = (reducer) => {
    let state;
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

    const dispatch = async (action) => {
        if (typeof action === 'function') {
            action(dispatch, getState);
        } else {
            state = reducer(state, action);
            publish(action.type);
        }
    };
    const getState = () => state;
    return { subscribe, dispatch, getState };
};
