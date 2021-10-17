import { $, isEmpty } from '../lib/utils.js';
import { ERROR_MESSAGE } from '../lib/constants.js';

export default function MenuForm($target, { onSubmit }) {
  const $menuNameInput = $($target)('input');
  $target.addEventListener('submit', e => handleMenuFormSubmit(e));

  const handleMenuFormSubmit = e => {
    e.preventDefault();

    if (isEmpty($menuNameInput.value)) {
      alert(ERROR_MESSAGE.EMPTY);
      return;
    }

    onSubmit($menuNameInput.value);
    clearInput($menuNameInput);
  };

  const clearInput = $input => ($input.value = '');
}
