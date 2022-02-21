import { MESSAGE } from '../const/index.js';
import { $, elementCreator, getOuterHTML, inputWrapper } from '../utils/dom.js';
import * as Action from '../action/index.js';
import * as Api from '../api/query/index.js';
import { currentStore } from '../store/index.js';

const menuFormHtml = ({ label, name }, $input, $button) => `
  <div class="d-flex w-100">
    <label for="${name}-menu-name" class="input-label" hidden>
      ${label} 메뉴 이름
    </label>
    ${getOuterHTML($input)}${getOuterHTML($button)}
  </div>
`;

const createElement = () => {
  const { categoryName, categoryLabel } = currentStore();

  const $input = elementCreator('input', {
    type: 'text',
    id: `${categoryName}-menu-name`,
    name: `${categoryName}MenuName`,
    class: 'input-field',
    placeholder: `${categoryLabel} 메뉴 이름`,
    autocomplete: 'off',
  });

  const $button = elementCreator(
    'button',
    {
      type: 'submit',
      name: 'submit',
      id: `${categoryName}-menu-submit-button`,
      class: 'input-submit bg-green-600 ml-2',
    },
    '확인'
  );

  return {
    $input,
    $button,
  };
};

const idCreator = () => `${Date.now()}`;

const MenuForm = () => {
  const $form = $(`#menu-form`);

  const addMenu = (categoryName, value) => {
    const {
      menuStore: { state, dispatch },
    } = currentStore();

    const payload = { name: value, id: idCreator() };
    const hasMenu = [...state.values()].some(({ name: _n }) => _n === value);
    if (hasMenu) {
      alert(MESSAGE.ALERT_ALREADY_ADDED_MENU);
      reset();
      return;
    }

    dispatch(Action.addMenu(payload));
    Api.postMenu({
      pathParams: {
        categoryName,
      },
      data: payload,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { categoryName } = currentStore();

    const $input = $(`#${categoryName}-menu-name`);

    if (!$input) return;
    const { value, reset, focus } = inputWrapper($input);

    if (!value) {
      alert(MESSAGE.PLZ_INSERT_MENU);
      return;
    }

    addMenu(categoryName, value);
    reset();
    focus();
  };

  const { $input, $button } = createElement(handleSubmit);

  $form.addEventListener('submit', handleSubmit);

  const renderer = () => {
    const { categoryName } = currentStore();
    $form.innerHTML = menuFormHtml(categoryName, $input, $button);
  };

  return {
    renderer,
  };
};

export default MenuForm;
