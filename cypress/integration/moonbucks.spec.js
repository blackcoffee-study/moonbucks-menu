describe("", () => {
    beforeEach(() => {
        cy.visit("../../../index.html");
    });

    it("에스프레소 메뉴판에 아메리카노를 입력하고 추가할 수 있다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("아메리카노").should("be.visible");
    });
    // it("should have menu item", () => {});
    it("에스프레소 메뉴판에 아메리카노를 입력하고 추가한 뒤 삭제할 수 있다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("아메리카노").should("be.visible");
        cy.get(".menu-remove-button").click();
        cy.get("#menu-list li").should("not.exist");
    });

    it("에스프레소 메뉴판에 아메리카노를 입력하고 새로고침해도 유지된다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("아메리카노").should("be.visible");
        cy.reload();
        cy.get("#menu-list li").contains("아메리카노").should("be.visible");
    });

    it("디저트 메뉴판에 케이크를 입력할 수 있다.", () => {
        cy.get('[data-category-name="dessert"]').click();
        cy.get("#menu-name").type("케이크");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("케이크").should("be.visible");
    });

    it("디저트 메뉴판에 케이크를 입력하고, 품절버튼을 누르면 품절 처리가 된다.", () => {
        cy.get('[data-category-name="dessert"]').click();
        cy.get("#menu-name").type("케이크");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("케이크").should("be.visible");
        cy.get(".menu-sold-out-button").click();
        cy.get("#menu-list li")
            .contains("케이크")
            .should("have.class", "sold-out");
    });

    it("에스프레소 메뉴판에 아메리카노를 입력하고 추가 후, 라떼로 수정할 수 있다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("아메리카노").should("be.visible");
        cy.window().then((win) => {
            cy.stub(win, "prompt").returns("라떼");
            cy.get(".menu-edit-button").click();
        });
        cy.get("#menu-list li").contains("라떼").should("be.visible");
    });
});
