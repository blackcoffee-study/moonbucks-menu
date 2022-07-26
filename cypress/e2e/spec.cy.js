import { elementIdMap } from "../../src/js/utils/constant_utils.js";

const { menuTitleName, espressoMenuList, espressoMenuNameInput, submitButton } =
  elementIdMap;
const moonbucksUrl = "http://localhost:5500/";

describe("문벅스 메뉴 관리 앱은", () => {
  context("로드가 완료되면", () => {
    it("최초로 에스프레소 메뉴를 표기한다.", () => {
      cy.visit(moonbucksUrl);
      cy.get(`#${menuTitleName}`).should("contain.text", "에스프레소");
    });
  });

  context(`문벅스 메뉴 이름을 입력했을 때`, () => {
    const moonbucksMenuNames = ["아메리카노", "카페라떼"];
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
    it("메뉴가 입력되지 않는다.", () => {
      const count = cy.get(`#${espressoMenuList} li`).should("have.length", 2);
      console.log(count);
    });
  });
});
