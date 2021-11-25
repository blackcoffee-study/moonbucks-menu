const $ = (selector) => document.querySelector(selector);

const espressoMenuForm = $("#espresso-menu-form");
const menuNameInput = $("#espresso-menu-name");
const submitButton= $("#espresso-menu-submit-button");
const espressoMenuList = $("#espresso-menu-list");
const menuCount = $(".menu-count");

export {
    espressoMenuForm, 
    menuNameInput, 
    submitButton, 
    espressoMenuList, 
    menuCount
}