import { ENTER_KEYCODE } from '../constants/index.js';

window.addEventListener('keydown', event => {
  if (event.key === ENTER_KEYCODE) event.preventDefault();
});
