export const elementIdMap = {
  espressoMenuForm: "espresso-menu-form",
  espressoMenuList: "espresso-menu-list",
  espressoMenuNameInput: "espresso-menu-name",
  submitButton: "espresso-menu-submit-button",
  removeButton: "removeButton",
  updateButton: "updateButton",
  soldOutButton: "soldOutButton",
  menuName: "menuName",
  menuWrapper: "menuWrapper",
  menuCategoryButtonWrapper: "menuCategoryButtonWrapper",
  menuTitleName: "menuTitleName",
  count: "count",
};

export const getLocalStorageKey = (categoryName) =>
  `moonbucksState.${categoryName}`;
