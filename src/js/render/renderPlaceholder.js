import { $ } from '../util/selector.js';

const $input = $('#espresso-menu-name');

export const renderPlaceholder = (placeholder) => {
  $input.placeholder = placeholder;
};
