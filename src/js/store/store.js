export const store = (initValue, renderContainer) => {
  let menuList = initValue;
  return () => {
    return [
      menuList,
      (newMenuList) => {
        if (typeof newMenuList === "function") {
          menuList = newMenuList(menuList);
        } else {
          menuList = newMenuList;
        }

        renderContainer();
      },
    ];
  };
};
