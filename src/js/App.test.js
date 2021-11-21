import "@testing-library/jest-dom";

import { getByLabelText, getByText } from "@testing-library/dom";

import menuList from "../fixture/menuList.js";

import App from "./App.js";

describe("App", () => {
  const AppComponent = new App({
    $root: document.querySelector("body"),
    initialState: {
      menuList,
    },
  });

  beforeEach(() => {
    AppComponent.setState({ key: "menuList", value: menuList });
  });

  const app = AppComponent.$app;

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

  it("setState를 실행하면 App Component의 상태값이 변경됩니다.", () => {
    AppComponent.setState({ key: "menuList", value: [] });

    expect(AppComponent.state.menuList.length).toBe(0);

    AppComponent.setState({ key: "currentCategory", value: "변경된 카테고리" });

    expect(AppComponent.state.currentCategory).toBe("변경된 카테고리");
  });

  it("handleSubmit 함수를 실행하면 menuList에 새로운 메뉴가 추가됩니다", () => {
    AppComponent.handleSubmit({ name: "추가된 메뉴" });

    expect(
      AppComponent.state.menuList.find(({ name }) => name === "추가된 메뉴")
    ).toBeTruthy();
  });

  it("handleTodoEdit 함수를 실행하면 id 값이 일치하는 메뉴의 name이 변경됩니다", () => {
    expect(AppComponent.state.menuList.find(({ id }) => id === 1).name).toBe(
      "민트초코 프라푸치노"
    );

    AppComponent.handleTodoEdit({ id: "1", name: "변경된 메뉴" });

    expect(AppComponent.state.menuList.find(({ id }) => id === 1).name).toBe(
      "변경된 메뉴"
    );
  });
});
