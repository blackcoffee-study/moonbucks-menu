import { $ } from './utils/DOM.js';
import { addMenu } from './utils/commons.js';

const espressoMenuName = $('#espresso-menu-name');
const espressoMenuList = $('#espresso-menu-list');
const espressoMenuForm = $('#espresso-menu-form');
const addMenuButton = $('#espresso-menu-submit-button');
const allMenuCounts = $('.menu-count');

const initialize = () => {
    espressoMenuForm.addEventListener('submit', (event) =>
        addMenu(event, espressoMenuName, espressoMenuList, allMenuCounts),
    );
    addMenuButton.addEventListener('click', (event) =>
        addMenu(event, espressoMenuName, espressoMenuList, allMenuCounts),
    );
};

window.onload = () => initialize();
