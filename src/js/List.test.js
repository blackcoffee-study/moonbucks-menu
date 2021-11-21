import "@testing-library/jest-dom";

import { fireEvent, getByText, getAllByText } from "@testing-library/dom";
import menuList from "../fixture/menuList.js";

import List from "./List.js";

describe("List", () => {
  const NEW_TODO = "new Todo";

  const handleTodoEdit = jest.fn();

  window.prompt = jest.fn(() => NEW_TODO);

  const ListComponent = new List({
    $app: document.querySelector("body"),
    initialState: menuList,
    onEdit: handleTodoEdit,
  });
  const list = ListComponent.$list;

  it("메뉴 리스트를 렌더링 합니다", () => {
    ListComponent.state.forEach(({ name }) => {
      expect(getByText(list, name)).toBeInTheDocument();
    });
  });

  it("수정 버튼을 누르면 텍스트를 입력할 수 있는 대화 상자가 표시된다", () => {
    fireEvent.click(getAllByText(list, "수정")[0]);

    expect(window.prompt).toBeCalled();
  });

  it("텍스트를 입력할 수 있는 대화 상자에 새로운 할일을 입력하면 Todo Edit 핸들러가 호출된다", () => {
    getAllByText(list, "수정").forEach(async (button) => {
      const id = button.closest("li").id;

      fireEvent.click(button);

      expect(window.prompt).toBeCalled();

      expect(handleTodoEdit).toBeCalledWith({
        id,
        name: NEW_TODO,
      });
    });
  });

  it("setState 함수가 실행되면 ListComponent의 state가 변경된다", () => {
    expect(ListComponent.state.length).toBe(menuList.length);

    ListComponent.setState([]);

    expect(ListComponent.state.length).toBe(0);
  });
});
