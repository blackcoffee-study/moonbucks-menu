import { $ } from '../util/selector.js';

export const renderTitle = (title) => {
  const $title = $('h2');
  $title.innerText = title;
};
