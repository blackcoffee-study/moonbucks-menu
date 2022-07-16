/**
  메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
  메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.
  메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
  메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
  총 메뉴 갯수를 count하여 상단에 보여준다.
  추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
 */

// todo - 공백 문자 추가시 새로고침 안되게 하기!

let menuList = []; 

const inputEl = document.getElementById("espresso-menu-name");
const btnEl = document.getElementById("espresso-menu-submit-button");
const ulEl = document.getElementById("espresso-menu-list");

function creatNode() {
  if(!inputEl.value.trim()) return;
  const liEl = document.createElement("li");
  const updateBtn = document.createElement("button");
  updateBtn.innerText = '수정';
  liEl.innerText = inputEl.value;
  liEl.appendChild(updateBtn);
  ulEl.appendChild(liEl);
  inputEl.value = "";
}

btnEl.addEventListener("click", () => {
  creatNode();
});

inputEl.addEventListener('keydown', (e) => {
  if(e.key !== "Enter") return;
  e.preventDefault();

  creatNode();
});
