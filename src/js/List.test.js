import "@testing-library/jest-dom";

import { getByText } from "@testing-library/dom";
import menuList from "../fixture/menuList.js";

import List from "./List.js";

describe("List", () => {
  const ListComponent = new List({
    $app: document.querySelector("body"),
    initialState: menuList,
  });
  const list = ListComponent.$list;

  it("메뉴 리스트를 렌더링 합니다", () => {
    ListComponent.state.forEach(({ name }) => {
      expect(getByText(list, name)).toBeInTheDocument();
    });
  });

  it("setState 함수가 실행되면 ListComponent의 state가 변경된다", () => {
    expect(ListComponent.state.length).toBe(menuList.length);

    ListComponent.setState([]);

    expect(ListComponent.state.length).toBe(0);
  });
});
