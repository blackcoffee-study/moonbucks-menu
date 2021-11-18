import "@testing-library/jest-dom";

import { getByText } from "@testing-library/dom";
import menuList from "../fixture/menuList.js";

import List from "./List.js";

describe("List", () => {
  const handleSubmit = jest.fn();

  const list = new List({
    $app: document.querySelector("body"),
    initialState: menuList,
  }).$list;

  it("메뉴 리스트를 렌더링 합니다", () => {
    menuList.forEach(({ name }) => {
      expect(getByText(list, name)).toBeInTheDocument();
    });
  });
});
