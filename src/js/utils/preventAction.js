import $ from './getDomElement';

const preventAction = selector => $(selector).addEventListener('submit', e => e.preventDefault());

export default preventAction;
