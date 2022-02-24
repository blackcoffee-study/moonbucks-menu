describe("moonbucks test", () => {
    beforeEach(() => {
        cy.visit("../../../index.html");
    });

    it("에스프레소 메뉴판에 아메리카노를 입력하고 추가할 수 있다", () => {
        cy.get("#espresso-menu-name").type("아메리카노");
        cy.get("#espresso-menu-submit-button").click();
        cy.get("#espresso-menu-list li").contains("아메리카노").should("be.visible");
    });
});
