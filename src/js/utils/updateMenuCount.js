import { espressoMenuList, menuCount } from "./elements.js";

export const updateMenuCount = () => { 
    const count = espressoMenuList.querySelectorAll("li").length;
    menuCount.innerText = `총 ${count}개`;
}