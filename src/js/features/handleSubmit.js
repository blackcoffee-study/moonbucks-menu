import $ from '../utils/getDomElement';
import addMenuList from '../utils/addMenuList';
import setMenuCount from '../utils/setMenuCount';

const setMenuToBlack = input => (input.value = '');

const submitMenu = (input, menuList, text) => {
    menuList.push(text);
    addMenuList(menuList, text);
    setMenuToBlack(input);
    setMenuCount(menuList);
};

const submitMenuByInput = (input, menuList) => {
    input.addEventListener('keypress', e => {
        const {
            key,
            target: { value },
        } = e;

        {
            key === 'Enter' && value.trim() && submitMenu(input, menuList, value);
        }
    });
};

const submitMenuByButton = (input, button, menuList) => {
    button.addEventListener('click', () => {
        const inputValue = input.value;

        {
            inputValue.trim() && submitMenu(input, menuList, inputValue);
        }
    });
};

export default function handleSubmit(menuList) {
    const submitInput = $('#espresso-menu-name');
    const submitButton = $('#espresso-menu-submit-button');

    submitMenuByInput(submitInput, menuList);
    submitMenuByButton(submitInput, submitButton, menuList);
}
