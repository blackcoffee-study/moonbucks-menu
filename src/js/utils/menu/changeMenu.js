import $ from '../common/selector.js';
import { render } from '../common/render.js';

export const changeMenu = (e, menu, category) => {
  const categoryName = e.target.dataset.categoryName;
  category = categoryName;
  $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
  render(menu, category);
};
