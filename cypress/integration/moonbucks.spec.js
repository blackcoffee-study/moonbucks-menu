describe("moonbucks test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });
});

describe("메뉴 추가", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("에스프레소 입력창에 아메리카노를 입력하고 버튼을 클릭하여 메뉴를 추가한다", () => {
    // 1. input에 타이핑한다
    cy.get("#espresso-menu-name").type("아메리카노");
    // 2. 확인버튼을 클릭한다
    cy.get("#espresso-menu-submit-button").click();
    // 3. li text가 input에 타이핑 값과 같은지 확인한다
    cy.get("#espresso-menu-list li")
      .contains("아메리카노")
      .should("be.visible");
  });
  it("에스프레소 입력창에 아메리카노를 입력하고 엔터키를 눌러 메뉴를 추가한다", () => {
    // 1. input에 타이핑하고 엔터키를 누른다
    cy.get("#espresso-menu-name").type("아메리카노{enter}");
    // 2. li text가 input에 타이핑 값과 같은지 확인한다
    cy.get("#espresso-menu-list li")
      .contains("아메리카노")
      .should("be.visible");
  });
});
