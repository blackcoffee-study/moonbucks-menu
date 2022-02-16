import { isEmpty } from "./isEmpty";

describe("isEmpty Test", () => {
  it("빈 값이 입력되었습니다.", () => {
    expect(isEmpty("")).toBeFalsy();
  });
  it("값이 입력되었습니다.", () => {
    expect(isEmpty("asd")).toBeTruthy();
  });
  it("공백을 포함한 값이 입력되었습니다.", () => {
    expect(isEmpty("asd asd")).toBeTruthy();
  });
});
