import $ from './getDom';

const blockRefreshWhenSubmit = () => $('#espresso-menu-form').addEventListener('submit', e => e.preventDefault());

export default blockRefreshWhenSubmit;
