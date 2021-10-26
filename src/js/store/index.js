import { createStore } from './createStore.js';
import { reducer } from './reducer.js';

export const store = createStore(reducer);
