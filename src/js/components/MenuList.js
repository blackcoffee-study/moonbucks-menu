import Button from './Button.js';

const MenuList = ({ id, name }) => {
  return `<li class="menu-list-item d-flex items-center py-2" data-id="${id}">
    <span class="w-100 pl-2 menu-name">${name}</span>
    ${Button({ type: 'edit', className: 'mr-1 menu-edit-button' })}
    ${Button({ type: 'remove', className: 'menu-remove-button' })}
  </li>`;
};

export default MenuList;
