import getDom from './getDom';

const blockRefresh = () => getDom('#espresso-menu-form').addEventListener('submit', e => e.preventDefault());

export default blockRefresh;
