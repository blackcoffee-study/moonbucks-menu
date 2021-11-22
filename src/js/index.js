import CafeMenuAdmin from "./cafeMenuAdmin.js";
(function() {
    const $ = (target) => document.querySelector(target);
    // 타겟이 되는 요소들 정의
    const menuSubmitButton = $('#menu-submit-button');
    let menuEditButton = $('.menu-edit-button');
    // 타겟과 관련된 영역들 정의
    const menuNameInputArea = $('#menu-name');
    const menuListWrapperArea = $('#menu-list');
    const menuCountArea = $('.menu-count');
    
    // 메뉴 관리 기능 담당 클래스
    const cafeMenuAdmin = new CafeMenuAdmin($, menuNameInputArea, menuListWrapperArea);

    /**
     *  각종 이벤트 정의
     */ 
    menuSubmitButton.addEventListener('click', e => {
        e.preventDefault();
        cafeMenuAdmin.addMenuItem();
        initMenuEditButton();
        initMenuRemoveButton();
    });

    menuNameInputArea.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            cafeMenuAdmin.addMenuItem();
            initMenuEditButton();
            initMenuRemoveButton();
        };
    });
    
    const initMenuEditButton = () => {
        const menuEditButton = menuListWrapperArea.lastChild.querySelector('.menu-edit-button');
        menuEditButton.addEventListener('click', e => {
            const $target = e.target.closest('li').querySelector('.menu-name');
            const currentMenuName = $target.innerText;
            const modifiedMenuName = prompt('메뉴명을 수정하세요', currentMenuName);
            $target.innerText = modifiedMenuName;
        });
    };

    const initMenuRemoveButton = () => {
        const menuRemoveButton = menuListWrapperArea.lastChild.querySelector('.menu-remove-button');
        menuRemoveButton.addEventListener('click', e => {
            e.stopPropagation();
            const $target = e.target.closest('li');
            const isRemove = confirm('정말 삭제하시겠습니까?');
            if (isRemove) {
                $target.remove();
            }
        });
    }


})();
