import $ from './getDom';

const blockRefresh = () => $('#espresso-menu-form').addEventListener('submit', e => e.preventDefault());

export default blockRefresh;
