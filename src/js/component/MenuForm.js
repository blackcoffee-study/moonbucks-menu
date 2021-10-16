import { $, isEmpty } from '../lib/utils.js';

export default function MenuForm($target, { onSubmit }) {
  const $menuNameInput = $($target)('input');
  $target.addEventListener('submit', e => handleMenuFormSubmit(e));

  const handleMenuFormSubmit = e => {
    e.preventDefault();

    if (isEmpty($menuNameInput.value)) {
      alert('값을 입력해주세요');
      return;
    }

    onSubmit($menuNameInput.value);
    clearInput($menuNameInput);
  };

  const clearInput = $input => ($input.value = '');
}
