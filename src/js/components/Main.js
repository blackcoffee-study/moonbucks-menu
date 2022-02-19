import atom from '../hooks/atom.js';
import useState from '../hooks/custom-use-state.js';
import { customUseRecoilValue } from '../hooks/custom-use-recoil.js';

import CustomMenuSet from '../utils/custom-menu-set.js';
import { $, MENUTYPE, TEXT } from '../utils/utils.js';

import MenuList from './MenuList.js';

export default function Main($target) {
  const currentMenuType = customUseRecoilValue('CURRENT_MENUTYPE', Main, $target);
  const [menuLists, setMenuList] = useState(atom.MENULISTS, Main, $target);

  const render = () => {
    $target.innerHTML = /*html*/`
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex justify-between">
          <h2 id="menu-type-heading" class="mt-1">${MENUTYPE[currentMenuType]} 메뉴 관리</h2>
          <span class="mr-2 mt-4 menu-count">총 ${menuLists[currentMenuType].size()}개</span>
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
      </div>
    `;
  }

  const mountChildren = () => {
    const $espressoMenuList = $('#espresso-menu-list');

    MenuList($espressoMenuList, menuLists[currentMenuType].getValues());
  }

  const setEvent = () => {
    const $espressoMenuList = $('#espresso-menu-list');
    const $menuForm = $("#espresso-menu-form");

    $menuForm.addEventListener('submit', e => {
      e.preventDefault();
      addMenuList();
    });
    $espressoMenuList.addEventListener('click', menuListHandler);
  }

  const init = () => {
    render();
    mountChildren();
    setEvent();
  }

  init();

  const addMenuList = () => {
    const $espressoMenuName = $('#espresso-menu-name');

    if ($espressoMenuName.value) {
      const newMenuList = { ...menuLists };
      newMenuList[currentMenuType] = new CustomMenuSet(menuLists[currentMenuType].getData());
      newMenuList[currentMenuType].add($espressoMenuName.value);

      setMenuList(newMenuList);
    }
  }

  const removeMenuList = (menu) => {
    const newMenuList = { ...menuLists };
    newMenuList[currentMenuType] = new CustomMenuSet(menuLists[currentMenuType].getData());
    newMenuList[currentMenuType].delete(menu);

    setMenuList(newMenuList);
  }

  const updateMenuList = (before, after, isSoldOut) => {
    const newMenuList = { ...menuLists };
    newMenuList[currentMenuType] = new CustomMenuSet(menuLists[currentMenuType].getData());
    newMenuList[currentMenuType].update(before, after, { isSoldOut: isSoldOut });

    setMenuList(newMenuList);
  }

  const menuListHandler = (e) => {
    const classList = e.target.classList;

    if (classList.contains('menu-edit-button')) {
      const $targetMenu = e.target.parentNode.querySelector('.menu-name');
      const isSoldOut = $targetMenu.classList.contains("sold-out");

      const newMenuName = window.prompt(TEXT.UPDATE);
      updateMenuList($targetMenu.textContent, newMenuName, isSoldOut);
    }

    if (classList.contains('menu-remove-button')) {
      if (window.confirm(TEXT.REMOVE)) {
        removeMenuList(e.target.parentNode.querySelector('.menu-name').textContent);
      }
    }

    if (classList.contains('menu-sold-out-button')) {
      const $targetMenu = e.target.parentNode.querySelector('.menu-name');
      const isSoldOut = $targetMenu.classList.contains("sold-out");
      const targetMenuName = $targetMenu.textContent;

      updateMenuList(targetMenuName, targetMenuName, !isSoldOut);
    }

  };
}
