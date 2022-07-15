export const store = (initValue, renderContainer) => {
  let menuList = initValue;
  return () => {
    return [
      menuList,
      (newMenuList) => {
        menuList = [...newMenuList];
        renderContainer();
      },
    ];
  };
};
