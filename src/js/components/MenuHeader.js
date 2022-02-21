import { SELECTOR } from '../const/index.js';
import { currentStore } from '../store/index.js';
import { $, elementCreator, getOuterHTML } from '../utils/dom.js';

const createElement = ({ label, size }) => {
  const $title = elementCreator(
    'h2',
    {
      class: 'mt-1',
    },
    `${label} 메뉴 관리`
  );

  const $totalCount = elementCreator(
    'span',
    {
      id: 'menu-count',
      class: 'mr-2 mt-4 menu-count',
    },
    `총 ${size}개`
  );

  return { $title, $totalCount };
};

const MenuHeader = () => {
  const $header = $(SELECTOR.MENU_HEADER);

  const renderer = () => {
    const {
      menuStore: { state },
      categoryLabel,
    } = currentStore();

    const { $title, $totalCount } = createElement({
      label: categoryLabel,
      size: state.size,
    });
    $header.innerHTML = `${getOuterHTML($title)}${getOuterHTML($totalCount)}`;
  };

  return {
    renderer,
  };
};

export default MenuHeader;
