import atom from '../hooks/atom.js';
import { CustomUseRecoilValue } from '../hooks/custom-use-recoil.js';
import useState from '../hooks/custom-use-state.js';
import { MENUTYPE } from '../utils/utils.js';

export default function Main(target) {
  const currentMenuType = CustomUseRecoilValue('menuType', Main, target);
  const [menuLists, setMenuList] = useState(atom.menuLists, Main, target);

  target.innerHTML = /*html*/
    `<div class="wrapper bg-white p-10">
    <div class="heading d-flex justify-between">
      <h2 id="menu-type-heading" class="mt-1">${MENUTYPE[currentMenuType]} 메뉴 관리</h2>
      <span class="mr-2 mt-4 menu-count">총 0개</span>
    </div>
    <form id="espresso-menu-form">
      <div class="d-flex w-100">
        <label for="espresso-menu-name" class="input-label" hidden>
          에스프레소 메뉴 이름
        </label>
        <input
                type="text"
                id="espresso-menu-name"
                name="espressoMenuName"
                class="input-field"
                placeholder="에스프레소 메뉴 이름"
                autocomplete="off"
        />
        <button
                type="submit"
                name="submit"
                id="espresso-menu-submit-button"
                class="input-submit bg-green-600 ml-2"
        >
          확인
        </button>
      </div>
    </form>
    <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
  </div>`;
}