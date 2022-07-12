const menuListWrapper = document.querySelector("#espresso-menu-list");
const menuInput = document.querySelector("#espresso-menu-name");
const confirmBtn = document.querySelector("#espresso-menu-submit-button");

const createMenuItem = (name) => {
  let li = document.createElement("li");
  li.textContent = name;
  return li;
};

const data = {
  menuList: [],
};

confirmBtn.addEventListener("click", () => {
  if (menuInput.value === "") {
    alert("메뉴를 입력해주세요 :)");
    menuInput.focus();
    return;
  }

  data.menuList.push(createMenuItem(menuInput.value));

  for (let i = 0; i < data.menuList.length; i++) {
    menuListWrapper.append(data.menuList[i]);
  }

  menuInput.value = "";
  menuInput.focus();
});
