import { inputForm, inputTag } from './app.js';
import addNewItem from './addNewItem.js';

const inputEventHandler = () => {
  inputForm.addEventListener('submit', (e) => {
    const newItemName = e.target.querySelector('input').value;
    e.preventDefault();
    addNewItem(newItemName);
  });
};

export default inputEventHandler;
