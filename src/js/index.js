import 'regenerator-runtime/runtime'

import App from './app';
import store, {actions} from './store';
import {fetchMenus} from "./apis";

document.addEventListener('DOMContentLoaded', async () => {
    const initState = await fetchMenus()
    console.log('123')
    actions.setInitStateAct(initState);
})
new App('app', store);
