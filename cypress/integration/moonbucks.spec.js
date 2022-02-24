describe("moonbucks test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });
  describe("에스프레소 메뉴 관리", () => {
    describe("메뉴 입력", () => {
      it("클릭으로 아메리카노 메뉴를 추가한다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("아메리카노").should("is.visible");
      });
      it("확인버튼으로 카페라테 메뉴를 추가한다", () => {
        cy.get("#menu-name").type("카페라테{enter}");
        cy.get("#menu-list li").contains("카페라테").should("is.visible");
      });
      it("확인 버튼을 누르면 input 값은 빈 값으로 초기화 한다.", () => {
        cy.get("#menu-name").type("카라멜 마키야토");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-name").should("be.empty");
      });
      it("공백만 입력 후 확인 버튼을 클릭할 경우 경고창이 나타난다.", () => {
        cy.get("#menu-name").type("   ");
        cy.get("#menu-submit-button").click();
        cy.on("window:alert", (text) => {
          expect(text).to.contains("메뉴를 입력해주세요.");
        });
        cy.get(".menu-list-item").should("not.exist");
      });
      it("엔터키를 입력하면 input 값은 빈 값으로 초기화 한다.", () => {
        cy.get("#menu-name").type("카라멜 마키야토{enter");
        cy.get("#menu-name").should("be.empty");
      });
      it("공백만 입력 후 엔터키를 입력할 경우 경고창이 나타난다.", () => {
        cy.get("#menu-name").type(" {enter}");
        cy.on("window:alert", (text) => {
          expect(text).to.contains("메뉴를 입력해주세요.");
        });
        cy.get(".menu-list-item").should("not.exist");
      });
      it("클릭과 엔터로 연속해서 메뉴를 추가한다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-list li").contains("아메리카노").should("is.visible");
        cy.get("#menu-name").type("카페라테{enter}");
        cy.get("#menu-list li").contains("카페라테").should("is.visible");
      });
      it("중복 메뉴를 입력할 경우 경고 문구나 나타나고, 메뉴가 추가되지 않고, input 값은 빈 값으로 초기화 한다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.on("window:alert", (text) => {
          expect(text).to.contains("이미 동일한 메뉴가 있습니다.");
        });
        cy.get("#menu-name").should("be.empty");
        cy.get(".menu-list-item").should("have.length", 1);
      });
      it("메뉴를 추가할 경우 메뉴 개수가 변경된다.", () => {
        cy.get("#menu-name").type("아메리카노");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-count").should("have.text", "총 1 개");
        cy.get("#menu-name").type("카페라테");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-count").should("have.text", "총 2 개");
        cy.get("#menu-name").type("카라멜 마키야토");
        cy.get("#menu-submit-button").click();
        cy.get("#menu-count").should("have.text", "총 3 개");
      });
    });
    // describe("메뉴 수정하기", () => {
    //   it("카페라테 메뉴를 카라멜 마키야토로 변경한다.", () => {
    //     cy.get("#menu-name").type("카페라테{enter}");
    //     cy.get(".menu-edit-button").click();
    //     cy.window().then((win) => {
    //       cy.stub(win, "prompt").returns("카라멜 마키야토");
    //       cy.get("#menu-list li")
    //         .contains("카라멜 마키야토")
    //         .should("is.visible");
    //     });
    //   });
    // });
  });
});
