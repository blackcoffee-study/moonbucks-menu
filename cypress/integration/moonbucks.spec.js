// ## 🎯 step2 요구사항 - 상태 관리로 메뉴 관리하기

// - [ ] localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
// - [ ] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
// - [ ] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// - [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 `sold-out` class를 추가하여 상태를 변경한다.

// ## 🎯 step3 요구사항 - 서버와의 통신을 통해 메뉴 관리하기

// - [ ] [링크](https://github.com/blackcoffee-study/moonbucks-menu-server)에 있는 웹 서버 저장소를 clone하여 로컬에서 웹 서버를 실행시킨다.
// - [ ] 웹 서버를 띄워서 실제 서버에 데이터의 변경을 저장하는 형태로 리팩터링한다.
//   - [ ] localStorage에 저장하는 로직은 지운다.
//   - [ ] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.
//   - [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 [alert](https://developer.mozilla.org/ko/docs/Web/API/Window/alert)으로 예외처리를 진행한다.
// - [ ] 중복되는 메뉴는 추가할 수 없다.

describe("문벅스 메뉴 관리 페이지", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("에스프레소 메뉴에 새로운 메뉴를 확인 버튼으로 추가한다", () => {
    cy.get("#espresso-menu-name").type("아메리카노");
    cy.get("#espresso-menu-submit-button").click();
    cy.contains("아메리카노").should("be.visible");

    // 중복 메뉴를 추가한다
    cy.get("#espresso-menu-name").type("아메리카노");
    cy.get("#espresso-menu-submit-button").click();
    cy.window().then((win) => {
      cy.stub(win, "alert").returns("true");
    });
    cy.contains("아메리카노") // [check] list length
      .should("be.visible");
  });

  it("에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다", () => {
    cy.get("#espresso-menu-name").type("카페 라떼{enter}");
    cy.get("#espresso-menu-list li").contains("카페 라떼").should("be.visible");

    // 중복 메뉴를 추가한다
    cy.get("#espresso-menu-name").type("카페 라떼{enter}");
    cy.on("window:alert", () => {
      return true;
    });
    cy.contains("카페 라떼").should("be.visible"); // [check] list length
  });

  it("메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.", () => {
    const $input = cy.get("#espresso-menu-name");
    $input.type("콜드브루{enter}");
    $input.should("have.value", "");

    $input.type("자몽 허니 블랙 티");
    cy.get("#espresso-menu-submit-button").click();
    $input.should("have.value", ""); // [check] have.value, eq 차이
  });

  it("사용자 입력값이 빈 값이라면 추가되지 않는다.", () => {
    const $input = cy.get("#espresso-menu-name");
    $input.type(" {enter}");

    cy.on("window:alert", () => {
      return true;
    });
    cy.get("#espresso-menu-list li").should("not.exist");
  });

  it("메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.", () => {
    cy.get("#espresso-menu-name").type("아메리카노{enter}");
    cy.window().then((win) => {
      // propmt는 window:alert & window:confirm 처럼 window 객체의 method로 존재하지 않아 stub로 생성
      cy.stub(win, "prompt").returns("카페 라떼");
      cy.get(".menu-edit-button").click();
    });
    cy.contains("카페 라떼").should("be.visible");
  });

  it("메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.", () => {
    cy.on("window:confirm", (msg) => {
      return true;
    });
    cy.get("#espresso-menu-name").type("아메리카노{enter}");
    cy.get(".menu-remove-button").click();
    cy.get("#espresso-menu-list li").should("not.exist");
  });

  it("총 메뉴 갯수를 count하여 상단에 보여준다.", () => {
    cy.get("#espresso-menu-name").type("아메리카노{enter}");
    cy.get(".menu-count").should("have.text", `총 1 개`);
  });

  it("에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.", () => {
    cy.get("#espresso-menu-name").type("아메리카노{enter}");
    cy.get("#cafe-category-nav").contains("프라푸치노").click();
    cy.get("#espresso-menu-name").type("콜드브루{enter}");
    cy.contains("콜드브루").should("be.visible");

    cy.window().then((win) => {
      // propmt는 window:alert & window:confirm 처럼 window 객체의 method로 존재하지 않아 stub로 생성
      cy.stub(win, "prompt").returns("쿨 라임 피지오");
      cy.get(".menu-edit-button").click();
    });
    cy.get("#espresso-menu-list li")
      .contains("쿨 라임 피지오")
      .should("be.visible");

    cy.get(".menu-remove-button").click();
    cy.get("#espresso-menu-list li").should("not.exist");
  });
});
