import CafeMenuAdmin from "./cafeMenuAdmin.js";

(function() {
    const $ = (target) => document.querySelector(target);
    
    // 타겟과 관련된 영역들 정의
    const menuNameInputArea = $('#menu-name');
    const menuListWrapperArea = $('#menu-list');
    const menuCountArea = $('.menu-count');
    
    // 타겟이 되는 요소들 정의
    const menuSubmitButton = $('#menu-submit-button');

    // 메뉴 관리 기능 담당 클래스
    const cafeMenuAdmin = new CafeMenuAdmin($, menuNameInputArea, menuListWrapperArea, menuSubmitButton, menuCountArea);
})();
