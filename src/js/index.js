//바닐라 JS로 상태관리가 가능한 애플리케이션 만들기

// step1 요구사항 구현을 위한 전략
// 1. 기능구현 전에 작성되어있는 요구사항을 한단계씩 구체적으로 분류해본다
// 2. 요구사항을 한줄한줄 꼼꼼히 읽어주는 것이 중요 - 나중에 구현안한 요구사항 찾느라 시간이 배로 걸리는 것 주의

// 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기
//TODO 메뉴 추가
// - [x] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
//      - [] 메뉴의 이름을 입력받고 확인버튼을 누르면 메뉴가 추가된다
//      - [x] 메뉴의 이름을 입력받고 엔터키를 누르면 메뉴가 추가된다
// - [x]추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
//   - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
//   - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.


//제이쿼리문 대신 사용할 수 있는 요소
const $ = (selector) => document.querySelector(selector);




function App() {
    //메뉴의 이름을 입력받는 이벤트
    // 사용자 입력값 확인 : keypress
    // form태크 특징인 엔터키 입력-> 새로고침 현상 방지 : form태크에 직접 e.preventDefault();걸기
    $('#espresso-menu-form').addEventListener("submit", (e) =>{
        // 해당 아이디가 form태그(엔터키 누르면 값들을 전송허는기능이 있음)이므로
        // 예방이 필요
        e.preventDefault();
    });
    

    $("#espresso-menu-list").addEventListener("click",(e)=>{
        if(e.target.classList.contains("menu-edit-button")){
            //menu-name를 바로 불러오기 어려움- 그대신 수정버튼 기준 가장 가까이 있는 li태그에 가까이 있는 menu-name는 검색하기 가능
            //value:input또는 form 태그 값만 가져올 수 있다
            //innerText: 사용자가 화면에서 볼수 있는 값만 가져올 수 있다
            const menuName = e.target
            .closest("li")
            .querySelector(".menu-name");

            const updatedMenuName = prompt("메뉴명을 수정하세요", menuName.innerText);

            menuName.innerText = updatedMenuName;
        };
    });






    //REVIEW 코드 중복을 막기위해서는 함수를 작성해주면 된다
    const addMenuName = () => {
        
        if($('#espresso-menu-name').value == ""){
            alert('값을 입력해주세요');
            //REVIEW return을 넣어주면, 아무것도 반환하지 않고 전체 코드가 종료된다
            return;
        }
        //아래 if 조건절을 잘라내도 그대로 작동 가능, 위에서 선언한 e.key !== "Enter"때문
        
            const espressoMenuName =  document.querySelector('#espresso-menu-name').value;
            //화살표 함수로 선언하기
            const menuTemplate = (espressoMenuName)=>{
                // 마크업을 JS에서 전송하고 싶다면, return 바로뒤에 백틱(`)으로 감싸기
                return`
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
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                    >
                        삭제
                    </button>
                    </li>`;
            };
            //insertAdjacentHTML 새로 삽입되는 요소들이 들어갈 위치 선택가능
            //그냥 innerhtml은 계속 추가되는 것이 아니고 값을 변경해준다
            // <!-- beforebegin -->
            // element 앞에 
            // <!-- afterbegin -->
            // element 안에 가장 첫번째 child
            // <!-- beforeend -->
            // element 안에 가장 마지막 child
            // <!-- afterend -->
            // element 뒤에
            $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuTemplate(espressoMenuName));
            
            //espresso-menu-list안에 있는 li의 개수(lenght) 구하기
            const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
            $(".menu-count").innerText = `총 ${menuCount} 개`;
            // 값 추가이후, 인풋 박스의 텍스트 비우기- 위에서 아래로 코드를 읽으므로 괜춘
            $('#espresso-menu-name').value = "";



            };


    $('#espresso-menu-submit-button').addEventListener("click",()=>{
        addMenuName();
    });


    $('#espresso-menu-name').addEventListener("keypress", (e) =>{
        // 현재는 영어만 확인가능
        console.log(e.key);
        //REVIEW keypress는 말그대로 입력값이 들어가기도 전에, 입력햣신호를 받고 실행하게끔하는 이벤트 리스너
        //-> 그러므로 입력값이 들어가기도 전에, 현재상태를 입력값이 들어가지 않은 ""상태로 받아들임
        //-> 해결 첫 문단에 문자만 넣고 Enter 키를 넣지않으면, 각 문자 들어간후 바로 그지점이후기능이 종료되는 return을 넣기
        //-> 종료된후 다시 입력값이 발생되는 
        if(e.key !== "Enter"){
            return;
        }

        addMenuName(e);
    });
}

App();



// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼을 클릭 이벤트 발생시, 기존 메뉴 이름 수정하는 모달창이 뜬다
//   - [ ] 메뉴 수정시 브라우저에서 제공하는 [`prompt창` 인터페이스:기본적으로 제공되는 기능]를 활용
//      - [] 모달창에 신규 입력값을 받고, 확인버튼을 누르면 메뉴가 수정되면서 모달창이 종료된다

// TODO 메뉴 삭제
// - [ ] 메뉴 삭제 버튼을 이벤트 발생시, 해당 삭제버튼 줄에있는 메뉴 삭제할 수 있다.
//   - [ ] 메뉴 삭제이벤트 발생시, 브라우저에서 제공하는 [`confirm창` 인터페이스]를 활용
//      -[]컴펌창에 확인버튼클릭 시, 선택되었던 메뉴가 삭제된다
//      -[]컴펌창에 엔터키 입력 시, 선택되었던 메뉴가 삭제된다
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
