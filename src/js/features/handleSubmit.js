import $ from '../utils/getDomElement';
import manageMenuList from '../utils/manageMenuList';

const setMenuToBlack = input => (input.value = '');

const submitMenu = (input, text) => {
    manageMenuList({ type: 'ADD', text });
    setMenuToBlack(input);
};

const submitMenuByInput = input => {
    input.addEventListener('keypress', e => {
        const {
            key,
            target: { value },
        } = e;

        {
            key === 'Enter' && value.trim() && submitMenu(input, value);
        }
    });
};

const submitMenuByButton = (input, button) => {
    button.addEventListener('click', () => {
        const inputValue = input.value;

        {
            inputValue.trim() && submitMenu(input, inputValue);
        }
    });
};

export default function handleSubmit() {
    const submitInput = $('#espresso-menu-name');
    const submitButton = $('#espresso-menu-submit-button');

    submitMenuByInput(submitInput);
    submitMenuByButton(submitInput, submitButton);
}
