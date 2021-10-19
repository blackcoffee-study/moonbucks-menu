import { $, $all } from './utils/DOM.js';
import { addMenu, paintMenu } from './utils/commons.js';

const addEvents = (category) => {
    const $menuName = $(`#${category}-menu-name`);
    const $menuList = $(`#${category}-menu-list`);
    const $menuForm = $(`#${category}-menu-form`);
    const $addMenuButton = $(`#${category}-menu-submit-button`);
    const $allMenuCounts = $('.menu-count');

    $menuForm.addEventListener('submit', (event) =>
        addMenu(event, $menuName, $menuList, $allMenuCounts),
    );
    $addMenuButton.addEventListener('click', (event) =>
        addMenu(event, $menuName, $menuList, $allMenuCounts),
    );
};

const initialize = () => {
    const $allCategoryNames = $all('.cafe-category-name');

    [...$allCategoryNames].forEach((category) =>
        category.addEventListener('click', (event) => {
            event.preventDefault();
            paintMenu(category.dataset.categoryName);
            addEvents(category.dataset.categoryName);
        }),
    );
    paintMenu($allCategoryNames[0].dataset.categoryName);
    addEvents($allCategoryNames[0].dataset.categoryName);
};

window.onload = () => initialize();
