import updateMenuCount from './updateMenuCount.js';

const removeMenuName = e => {
  if (confirm('정말 삭제하시겠습니까?')) {
    const menu = e.target.closest('li');
    menu.remove();
    updateMenuCount();
  }
};

export default removeMenuName;
