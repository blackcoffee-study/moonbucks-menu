import { createStore } from './CreateStore.js';
import { reducer } from './Reducer.js';

export const store = createStore(reducer);
