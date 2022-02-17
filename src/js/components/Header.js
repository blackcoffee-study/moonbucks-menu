import { CustomUseRecoilSetState } from '../hooks/custom-use-recoil.js';
import { $, MENUTYPE } from '../utils/utils.js';
import MenuTypeButton from './MenuTypeButton.js';
export default function Header(target) {
  const setCurrnetMenuType = CustomUseRecoilSetState('menuType');

  target.innerHTML = /*html*/
    `<a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav id="menu-type-nav" class="d-flex justify-center flex-wrap">
    </nav>`;

  const $menuTypeNav = $('#menu-type-nav');
  Object.keys(MENUTYPE).forEach(e => {
    MenuTypeButton($menuTypeNav, e, MENUTYPE[e]);
  });

  $menuTypeNav.addEventListener('click', changeCurrentMenuType);

  function changeCurrentMenuType(e) {
    if (e.target.dataset.categoryName) {
      setCurrnetMenuType(e.target.dataset.categoryName);
    };
  };
}