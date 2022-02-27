/* eslint-disable no-undef */
describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("../../../index.html");
  });

  it("에스프레소 메뉴판에 아메리카노를 입력하고 추가할 수 있다", () => {
    cy.get("#menu-name").type("아메리카노");
    cy.get("#menu-submit-button").click();
    cy.get("#menu-list li").contains("아메리카노").should("be.visible");
  });

  it("에스프레소 메뉴판에 아메리카노를 추가하고, 추가한 아메리카노를 삭제할 수 있다", () => {
    cy.get("#menu-name").type("아메리카노");
    cy.get("#menu-submit-button").click();
    cy.get("#menu-list li").contains("아메리카노").should("be.visible");
    cy.get(".menu-remove-button").click();
    cy.get("#menu-list li").should("not.exist");
  });

  it("에스프레소 메뉴판에 아메리카노를 입력하고 추가하고, 새로고침했을 때 아메리카노가 그대로 남아있다", () => {
    cy.get("#menu-name").type("아메리카노");
    cy.get("#menu-submit-button").click();
    cy.get("#menu-list li").contains("아메리카노").should("be.visible");
    cy.reload();
    cy.get("#menu-list li").contains("아메리카노").should("be.visible");
  });

  it("디저트 메뉴판에 마카롱을 추가한다.", () => {
    cy.get('[data-category-name="desert"]').click();
    cy.get("#menu-submit-button").click();
    cy.get("#menu-name").type("마카롱");
    cy.get("#menu-submit-button").click();
    cy.get("#menu-list li").contains("마카롱").should("be.visible");
  });

  it("에스프레소 메뉴판에 아메리카노를 입력하고 추가하고, 품절버튼으로 품절시킨다.", () => {
    cy.get("#menu-name").type("아메리카노");
    cy.get("#menu-submit-button").click();
    cy.get("#menu-list li").contains("아메리카노").should("be.visible");
    cy.get(".menu-sold-out-button").click();
    cy.get("#menu-list li")
      .contains("아메리카노")
      .should("have.class", "sold-out");
  });

  it("에스프레소 메뉴판에 아메리카노를 입력하고 추가하고, 아이스 아메리카노로 수정한다", () => {
    cy.get("#menu-name").type("아메리카노");
    cy.get("#menu-submit-button").click();
    cy.get("#menu-list li").contains("아메리카노").should("be.visible");

    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns("아이스 아메리카노");
      cy.get(".menu-edit-button").click();
    });
  });
});
