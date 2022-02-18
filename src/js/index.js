import {
  findElement,
  innerText,
  inputWrapper,
  targetElementWrapper,
} from './utils/dom.js';
import { store, storeHandler } from './store/index.js';
import { ACTION, CATEGORY, MESSAGE, SELECTOR } from './const/index.js';
import MenuRenderer from './render/MenuRenderer.js';

const App = () => {
  const $ = findElement();
  const $form = $(SELECTOR.FORM);
  const $menuList = $(SELECTOR.MENU_LIST);
  const $inputMenu = $(SELECTOR.INPUT_MENU);
  const $count = $(SELECTOR.COUNT);

  const menuRenderer = MenuRenderer($menuList, $count);

  const espressoMenuStore = storeHandler(
    store[CATEGORY.ESPRESSO],
    menuRenderer
  );

  const handleSubmit = (event, $input) => {
    event.preventDefault();
    const { value, reset, focus } = inputWrapper($input);

    if (!value) {
      alert(MESSAGE.PLZ_INSERT_MENU);
      return;
    }

    if (espressoMenuStore(ACTION.HAS_MENU_BY_NAME, { name: value })) {
      alert(MESSAGE.ALERT_ALREADY_ADDED_MENU);
      reset();
      return;
    }

    espressoMenuStore(ACTION.ADD_MENU, { name: value });
    reset();
    focus();
  };

  const handleClick = (event, trigger) => {
    const target = targetElementWrapper(event);
    const mode = target.dataset('mode');
    mode && trigger[mode](target.closest(SELECTOR.MENU_ITEM));
  };

  const editMenu = ($menu) => {
    const id = $menu.id;
    const oldName = innerText(SELECTOR.MENU_NAME);
    const newName = prompt(MESSAGE.PLZ_INSERT_MENU, oldName);

    espressoMenuStore(ACTION.EDIT_MENU, { id, name: newName });
  };

  const removeMenu = ($menu) => {
    const id = $menu.id;
    if (!espressoMenuStore(ACTION.HAS_MENU_BY_ID, { id })) return;

    const { name } = espressoMenuStore(ACTION.GET_MENU_BY_ID, { id });
    if (confirm(`${name}${MESSAGE.CONFIRM_REMOVE_MENU}`)) {
      espressoMenuStore(ACTION.REMOVE_MENU, { id });
    }
  };

  const trigger = {
    edit: editMenu,
    remove: removeMenu,
  };

  $form.addEventListener('submit', (event) => handleSubmit(event, $inputMenu));
  $menuList.addEventListener('click', (event) => handleClick(event, trigger));
};

window.requestAnimationFrame(App);
