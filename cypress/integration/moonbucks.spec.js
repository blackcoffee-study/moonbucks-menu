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
        cy.on("window:alert", () => true);
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
    });
    describe("메뉴 수정", () => {
      it("prompt 창에 값을 입력하고 확인을 누르면 메뉴가 수정된다.", () => {
        cy.window().then((win) => {
          cy.get("#menu-name").type("오늘의 커피");
          cy.get("#menu-submit-button").click();
          cy.get(".menu-edit-button").click();
          cy.stub(win, "prompt").returns("플랫 화이트");
          cy.get(".menu-name").contains("플랫 화이트");
        });
      });
      it("카페라테 메뉴를 카라멜 마키야토로 변경한다.", () => {
        cy.window().then((win) => {
          cy.get("#menu-name").type("오늘의 커피");
          cy.get("#menu-submit-button").click();
          cy.get("#menu-name").type("카페라테{enter}");
          cy.get("[data-menu-id='1'] > .menu-edit-button").click();
          cy.stub(win, "prompt").returns("카라멜 마키야토");
          cy.get("#menu-list li")
            .contains("카라멜 마키야토")
            .should("is.visible");
        });
      });
      it("메뉴 수정 시 공백을 입력할 경우 경고가 나타난다.", () => {
        cy.window().then((win) => {
          cy.get("#menu-name").type("오늘의 커피");
          cy.get("#menu-submit-button").click();
          cy.get("#menu-name").type("카페라테{enter}");
          cy.get("[data-menu-id='1'] > .menu-edit-button").click();
          cy.stub(win, "prompt").returns("");
          cy.on("window:alert", (text) => {
            expect(text).to.contains("메뉴를 입력해주세요.");
          });
        });
      });
      it("존재하는 메뉴로 변경을 시도할 경우 경고 문구가 나타나고 메뉴 수정이 취소된다.", () => {
        cy.window().then((win) => {
          cy.get("#menu-name").type("오늘의 커피");
          cy.get("#menu-submit-button").click();
          cy.get("#menu-name").type("카라멜 마키야토");
          cy.get("#menu-submit-button").click();
          cy.get("#menu-name").type("카페라테{enter}");
          cy.get("[data-menu-id='2'] > .menu-edit-button").click();
          cy.stub(win, "prompt").returns("카라멜 마키야토");
          cy.on("window:alert", (text) => {
            expect(text).to.contains("이미 동일한 메뉴가 있습니다.");
          });
          cy.get("[data-menu-id='2'] > .w-100")
            .contains("카페라테")
            .should("is.visible");
          cy.get("#menu-count").should("have.text", "총 3 개");
        });
      });
    });
    describe("메뉴 삭제", () => {
      it("confirm 창에 '확인 버튼'을 누르면 메뉴가 삭제된다.", () => {
        cy.window().then(function (confirm) {
          cy.get("#menu-name").type("콜드 부르");
          cy.get("#menu-submit-button").click();
          cy.get(".menu-remove-button").click();
          cy.stub(confirm, "confirm").returns(true);
          cy.get(".menu-list-item").should("not.exist");
        });
      });
      it("confirm 창에 '취소 버튼'을 누르면 메뉴가 삭제된다.", () => {
        cy.window().then(function (confirm) {
          cy.get("#menu-name").type("콜드 부르");
          cy.get("#menu-submit-button").click();
          cy.get(".menu-remove-button").click();
          cy.stub(confirm, "confirm").returns(false);
          cy.on("window:confirm", () => false);
          cy.get(".menu-name").contains("콜드 부르");
        });
      });
    });
    describe("메뉴 개수 세기", () => {
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
        cy.get("#menu-count").should(($count) => {
          const text = $count.text();

          expect(text).to.match(/3/);
          expect(text).to.include("3");
        });
      });
      it("메뉴 이름을 변경해도 메뉴 개수는 변하지 않는다.", () => {
        cy.window().then((win) => {
          const menus = ["카페모카", "카푸치노", "아이스 아메리카노"];
          for (const menu of menus) {
            cy.get("#menu-name").type(menu);
            cy.get("#menu-submit-button").click();
          }
          cy.get("[data-menu-id='1'] > .menu-edit-button").click();
          cy.stub(win, "prompt").returns("카라멜 마키야토");
          cy.get("#menu-list li")
            .contains("카라멜 마키야토")
            .should("is.visible");
          cy.get("#menu-list")
            .find("li")
            .should(($li) => {
              const len = $li.length;
              assert.equal(3, len);
            });
          cy.get("#menu-count").should("have.text", "총 3 개");
        });
      });
      it("메뉴를 삭제할 경우 메뉴 개수가 1개 감소 한다.", () => {
        cy.window().then(function (confirm) {
          const menus = ["카페모카", "카푸치노", "아이스 아메리카노"];
          for (const menu of menus) {
            cy.get("#menu-name").type(menu);
            cy.get("#menu-submit-button").click();
          }
          cy.get("[data-menu-id='1'] > .menu-remove-button").click();
          cy.stub(confirm, "confirm").returns(true);
          cy.get("#menu-list")
            .find("li")
            .should(($li) => {
              const len = $li.length;
              assert.equal(2, len);
            });
          cy.get("#menu-count").should("have.text", "총 2 개");
        });
      });
    });
  });
});
