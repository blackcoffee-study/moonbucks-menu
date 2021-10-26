import App from './app';
import store, { actions } from './store';

actions.setInitStateAct();
new App('app', store);
