import { elementIdMap } from "../../src/js/utils/constant_utils.js";

const {
  menuTitleName,
  espressoMenuList,
  espressoMenuNameInput,
  submitButton,
  count,
} = elementIdMap;
const moonbucksUrl = "http://localhost:5500/";
const moonbucksMenuNames = [
  "아메리카노",
  "카페라떼",
  "에스프레소",
  "바닐라딜라이트",
];

describe("문벅스 메뉴 관리 앱은", () => {
  beforeEach(() => {
    cy.visit(moonbucksUrl);
  });

  context("로드가 완료되면", () => {
    it("최초로 에스프레소 메뉴를 표기한다.", () => {
      cy.get(`#${menuTitleName}`).should("contain.text", "에스프레소");
    });
  });

  context(`문벅스 메뉴 이름을 입력했을 때`, () => {
    let menuNameIndex = 0;
    let menuNameText = moonbucksMenuNames[menuNameIndex];
    const selectRecentAddedMenuName = `#${espressoMenuList} li:last-child span`;

    beforeEach(() => {
      cy.get(`#${espressoMenuNameInput}`).type(menuNameText);
    });

    afterEach(() => {
      menuNameText = moonbucksMenuNames[++menuNameIndex];
    });

    it("우측의 확인 버튼을 클릭하면 메뉴를 추가한다.", () => {
      cy.get(`#${submitButton}`).click();
      cy.get(selectRecentAddedMenuName).should("have.text", menuNameText);
    });

    it("엔터키를 입력하면 메뉴를 추가한다.", () => {
      cy.get(`#${espressoMenuNameInput}`).type("{enter}");
      cy.get(selectRecentAddedMenuName).should("have.text", menuNameText);
    });
  });

  context(`문벅스 메뉴 이름에 공백을 입력했을 때`, () => {
    it("우측의 확인 버튼을 클릭해도 메뉴를 추가하지 않는다.", () => {
      cy.get(`#${submitButton}`).click();
      cy.get(`#${espressoMenuList} li`).should("have.length", 0);
    });

    it("엔터키를 입력해도 메뉴를 추가하지 않는다.", () => {
      cy.get(`#${espressoMenuNameInput}`).type("{enter}");
      cy.get(`#${espressoMenuList} li`).should("have.length", 0);
    });
  });

  context(`메뉴를 추가했을 때`, () => {
    const prevMenuName = moonbucksMenuNames[0];
    const newMenuName = moonbucksMenuNames[1];

    beforeEach(() => {
      cy.get(`#${espressoMenuNameInput}`).type(prevMenuName);
      cy.get(`#${espressoMenuNameInput}`).type("{enter}");
    });

    context(
      `메뉴의 수정버튼을 누른 후 수정될 이름을 입력하고 엔터를 누르면`,
      () => {
        beforeEach(() => {
          cy.window().then((win) => {
            cy.stub(win, "prompt").returns(newMenuName);
          });

          cy.get(".menu-edit-button").first().click();
        });

        it("메뉴의 이름을 변경한다.", () => {
          cy.get(".menu-name").first().should("have.text", newMenuName);
        });
      }
    );

    context(`메뉴의 삭제버튼을 누르면`, () => {
      beforeEach(() => {
        cy.window().then(() => {
          cy.on("window:confirm", () => true);
        });

        cy.get(".menu-remove-button").first().click();
      });

      it("메뉴를 삭제한다.", () => {
        cy.get(`#${espressoMenuList} li`).should("have.length", 0);
      });
    });

    it("우측 상단에 메뉴의 개수를 보여준다.", () => {
      cy.get(`#${count}`).should("have.text", "1");
    });
  });
});
