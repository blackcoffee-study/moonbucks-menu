import "@testing-library/jest-dom";

import { getByLabelText, getByText } from "@testing-library/dom";

import menuList from "../fixture/menuList.js";

import App from "./App.js";

describe("App", () => {
  const app = new App({
    $root: document.querySelector("body"),
    initialState: {
      menuList,
    },
  }).$app;

  it("문벅스 메뉴 카테고리를 렌더링 합니다", () => {
    expect(getByText(app, "🌝 문벅스 메뉴 관리")).toBeInTheDocument();

    const menus = [
      "☕ 에스프레소",
      "🥤 프라푸치노",
      "🍹 블렌디드",
      "🫖 티바나",
      "🍰 디저트",
    ];

    menus.forEach((menu) => {
      expect(getByText(app, menu)).toBeInTheDocument();
    });
  });

  it("메뉴 추가 폼을 렌더링 합니다", () => {
    expect(getByLabelText(app, "에스프레소 메뉴 이름")).toBeInTheDocument();
  });

  it("메뉴 리스트를 렌더링 합니다", () => {
    menuList.forEach(({ name }) => {
      expect(getByText(app, name)).toBeInTheDocument();
    });
  });
});
