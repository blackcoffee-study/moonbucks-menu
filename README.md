# moonbucks


### step2 : step2 요구사항 - 상태 관리로 메뉴 관리하기

- 구조

  - components

    - App : 자식 컴포넌트들에서 사용되는 상태값을 관리
    - Count : 총 메뉴 갯수를 count하여 UI에 반영
    - MenuInput : 인풀 컴포넌트의 UI 다루는 컴포넌트
    - MenuList : 메뉴 render 담당

  - utils

    - dom : dom 조작을 위한 util 함수

  - store

    - index : local storage getter, setter 함수 존재

- 덧붙이는 설명

  - App 이외의 다른 컴포넌트에서는 DOM을 조작하는 UI 관련 로직만 가지고 있고, 상태값 수정이 있는 로직은 App의 메소드에 작성되어 있음.
  - 만약 컴포넌트에서 상태값을 수정할 일이 있는 경우, 콜백함수로 받아 호출하도록 작성함.

- 미해결 bug
  - state의 id 값을 어떻게 관리하면 좋을지 모르겠습니다! 지금 방식으로는 새로고침 하는 경우 다시 id값이 0으로 초기화되어 수정, 삭제 시 이상하게 작동하고 있습니다~

### step1 : 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

- 구조

  - components

    - App : 자식 컴포넌트들에서 사용되는 상태값을 관리
    - Count : 총 메뉴 갯수를 count하여 UI에 반영
    - MenuInput : 인풀 컴포넌트의 UI 다루는 컴포넌트
    - MenuList : 메뉴 추가, 수정, 삭제에 대한 UI만 다루는 컴포넌트

  - utils

- 덧붙이는 설명
  - App 이외의 다른 컴포넌트에서는 DOM을 조작하는 UI 관련 로직만 가지고 있고, 상태값 수정이 있는 로직은 App의 메소드에 작성되어 있음.
  - 만약 컴포넌트에서 상태값을 수정할 일이 있는 경우, 콜백함수로 받아 호출하도록 작성함.
