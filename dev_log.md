# 개발 일지

## 🎯 step1 요구 사항 구현

### TODO: 메뉴 추가 기능
- [x] 메뉴의 이름을 입력받고 확인 버튼을 누르면 메뉴가 추가된다. 
- [x] 메뉴의 이름을 입력받고 엔터키를 입력하면 메뉴가 추가된다.
- [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
- [x] 총 메뉴 갯수를 count 하여 상단에 보여준다.
- [x] 메뉴가 추가되고 나면 input은 빈 값으로 초기화한다.
- [x] 사용자 입력값이 빈 값 혹은 공백이라면 추가하지 않고 경고 메시지를 띄운다.
- [ ] **[추가 구현]** 추가한 메뉴 이름이 기존 메뉴 이름 중에 존재하면 추가하지 않고 경고 메시지를 띄운다.

### TODO: 메뉴 수정 기능
- [x] `espresso-menu-list`에 onClick 이벤트를 위임한다.
- [x] target이 *button* tag가 아니라면 무시한다.
- [x] target이 `menu-edit-button` 클래스를 가지고 있으면 메뉴 이름을 수정하는 `prompt` 인터페이스를 띄운다.
- [x] `prompt`의 default 값은 기존 메뉴 이름으로 초기화한다.
- [x] 모달 창에 새로운 메뉴 이름을 입력하고 확인 버튼을 누르면 메뉴 이름이 수정된다.
- [x] 사용자 입력값이 빈 값 혹은 공백이라면 수정하지 않고 경고 메시지를 띄운다.
- [ ] **[추가 구현]** 추가한 메뉴 이름이 기존 메뉴 이름 중에 존재하면 수정하지 않고 경고 메시지를 띄운다.

### TODO: 메뉴 삭제 기능
- [x] `espresso-menu-list`에 onClick 이벤트를 위임한다.
- [x] target이 *button* tag가 아니라면 무시한다.
- [x] target이 `menu-remove-button` 클래스를 가지고 있으면 메뉴 삭제 확인을 위한 `confirm` 인터페이스를 띄운다.
- [x] 확인 버튼을 누르면 메뉴를 삭제한다.
- [x] 총 메뉴 갯수를 count 하여 상단에 보여준다.

### 💭 step1 인사이트
- 요구 사항을 세세히 나누는 것이 중요하다.
- 리팩토링할 때마다 테스트를 해야 한다.
- 이벤트 위임을 알게 되었다.
- 이벤트 리스너 등록, 재사용 함수 등 같은 것끼리 모으는 것이 좋다.

## step2 요구 사항 구현

### TODO: 메뉴를 저장할 메뉴 리스트 생성
- [ ] 메뉴들을 관리할 **메뉴 리스트**를 만든다.
- [ ] 메뉴들을 추가할 때마다 메뉴 리스트에 저장한다.
- [ ] 메뉴들을 수정할 때마다 메뉴 리스트에서 수정한다.
- [ ] 메뉴들을 삭제할 때마다 메뉴 리스트에서 삭제한다.

### TODO: localStorage에 메뉴 데이터 저장
- [ ] localStorage에 메뉴 리스트를 저장한다.
- [ ] 새로고침을 했을 때 localStorage에서 데이터를 읽어온다.

### TODO: 종류별로 메뉴판 관리
- [ ] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류 별로 메뉴 리스트를 만든다.
- [ ] 페이지에 최초로 접근할 때는 에스프레소 메뉴 리스트를 읽어온다.
- [ ] 에스프레소 메뉴를 화면에 렌더링한다.
- [ ] 종류 버튼을 클릭하면 해당 종류로 화면을 렌더링한다.
- [ ] 메뉴 아이템의 수정 버튼을 클릭하면 해당 메뉴 리스트에서 수정한다.
- [ ] 메뉴 아이템의 삭제 버튼을 클릭하면 해당 메뉴 리스트에서 삭제한다.

### TODO: 품절 상태 추가
- [ ] 품절 버튼을 추가한다.
- [ ] 품절 버튼을 클릭하면 localStorage의 해당 메뉴 리스트의 메뉴에 품절 상태를 저장한다.
- [ ] 품절 버튼을 클릭하면 가장 가까운 li 태그에 `sold-out` class를 추가한다.
- 품절 상태 메뉴의 마크업 아래 참고

### TODO: 종류 이름을 받아 데이터를 읽고 화면을 렌더링하는 메소드
- [ ] localStorage에서 해당 종류의 메뉴 리스트를 읽어온다.
- [ ] 메뉴 관리의 이름을 종류 이름으로 업데이트한다.
- [ ] `espresso-menu-list`의 `innerHTML`을 초기화한다. 
- [ ] 읽어온 메뉴 리스트에서 아이템을 순회하며 `menu-list-item`를 생성한다.
- [ ] 품절 상태에 따라 `menu-list-item`에 `sold-out` class를 추가한다.
- [ ] 읽어온 메뉴 리스트의 길이로 총 메뉴 개수를 업데이트한다.

```js
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name sold-out">${name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
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
</li>
```