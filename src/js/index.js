// 일반적 util함수 (선택자를)
const $ = selector => document.querySelector(selector);

const App = () => {
  // html에서 enter를 눌렀을 때 form 태그 안에서 누르게 되면 화면이 새로고침 된다(무엇을 전송하는 동작을 하기 때문)
  $('#espresso-menu-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  // 메뉴 이름 입력받는 부분
  $('#espresso-menu-name').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const espressoMenuName = $('#espresso-menu-name').value;
      const menuItemTemplate = espressoMenuName => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-remove-button"
          >
            삭제
          </button>
        </li>`;
      };
      $('#espresso-menu-list').insertAdjacentHTML(
        'beforeend',
        menuItemTemplate(espressoMenuName),
      );

      const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
      $('.menu-count').innerText = `총 ${menuCount}개`;
    }
  });
};

App();
