export const menuListTemplate = (value, count) => {
  return `
<li  data-name-id="${count}" class="menu-list-item d-flex items-center py-2" >
   <span class="w-100 pl-2 menu-name" >${value}</span>
   
   <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
                  품절
   </button>
   <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
                  수정
   </button>
   <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
                  삭제
   </button>
</li>`;
};

export const mainMenuTemplate = (categoryEn, emoji, categoryKr) => {
  return `
  <div data-category="${categoryEn}" class="menu-control wrapper bg-white p-10">
    <div class="heading d-flex justify-between">
      <h2 id="category-title" class="mt-1">${emoji} ${categoryKr} 메뉴 관리</h2>
      <span class="mr-2 mt-4 menu-count">총 0 개</span>
    </div>
    <form id="menu-form">
      <div  class="d-flex w-100">
        <label for="menu-name" class="input-label" hidden="">
          메뉴 이름
        </label>
        <input type="text" id="menu-name" name="menuName" class="input-field" placeholder="메뉴 이름" autocomplete="off">
        <button data-category="${categoryEn}" type="button" name="submit" id="menu-submit-button" class="input-submit bg-green-600 ml-2">
          확인
        </button>
      </div>
    </form>
    <ul id="menu-list" class="mt-3 pl-0"></ul>
  </div>
  `;
};

// export const mainMenuTemplate = (emoji, categoryInKr, categoryInEn) => {
//   return `
//             <div class="${categoryInEn}-container wrapper bg-white p-10">
//               <div class="heading d-flex justify-between">
//                 <h2 class="mt-1">${emoji} ${categoryInKr} 메뉴 관리</h2>
//                 <span class="mr-2 mt-4 menu-count">총 0개</span>
//               </div>
//               <form id="${categoryInEn}-menu-form">
//                 <div class="d-flex w-100">
//                   <label for="${categoryInEn}-menu-name" class="input-label" hidden>
//                     ${categoryInKr} 메뉴 이름
//                   </label>
//                   <input
//                     type="text"
//                     id="${categoryInEn}-menu-name"
//                     name="${categoryInEn}MenuName"
//                     class="input-field"
//                     placeholder="${categoryInKr} 메뉴 이름"
//                     autocomplete="off"
//                   />
//                   <button
//                     type="button"
//                     name="submit"
//                     id="${categoryInEn}-menu-submit-button"
//                     class="input-submit bg-green-600 ml-2"
//                   >
//                     확인
//                   </button>
//                 </div>
//               </form>
//               <ul id="${categoryInEn}-menu-list" class="mt-3 pl-0"></ul>
//             </div>`;
// };
