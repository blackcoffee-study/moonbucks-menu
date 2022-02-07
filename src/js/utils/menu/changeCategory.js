import $ from '../common/selector.js';
import { render } from '../common/render.js';

export const changeCategory = async (e, menu) => {
  const categoryName = e.target.dataset.categoryName;
  $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
  await render(menu, categoryName);
};
