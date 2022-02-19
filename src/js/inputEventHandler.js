import { menuInputForm, beverageCategory, currentCategory } from './app.js';
import addNewItem from './addNewItem.js';

const inputEventHandler = () => {
  menuInputForm.addEventListener('submit', (e) => {
    const newItemName = e.target.querySelector('input').value;
    e.preventDefault();


    if( newItemName.trim() != ''){
      beverageCategory[currentCategory].push(newItemName)
      addNewItem();
    }
  });
};

export default inputEventHandler;