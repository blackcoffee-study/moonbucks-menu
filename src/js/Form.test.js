import { getByLabelText, fireEvent } from "@testing-library/dom";

import Form from "./Form.js";

describe("Form", () => {
  const handleSubmit = jest.fn();

  const form = new Form({
    $app: document.querySelector("body"),
    onSubmit: handleSubmit,
  }).$form;

  it("form에서 submit 이벤트가 발생되면 submit 핸들러가 실행됩니다", () => {
    const input = getByLabelText(form, "에스프레소 메뉴 이름");

    fireEvent.change(input, { target: { value: "카페라떼" } });
    fireEvent.submit(form);

    expect(handleSubmit).toBeCalledWith({
      name: "카페라떼",
    });

    expect(input.value).toBe("");
  });

  it("submit 이벤트가 발생된 후 input 값은 초기화됩니다", () => {
    const input = getByLabelText(form, "에스프레소 메뉴 이름");

    fireEvent.change(input, { target: { value: "카페라떼" } });
    fireEvent.submit(form);

    expect(handleSubmit).toBeCalledWith({
      name: "카페라떼",
    });

    expect(input.value).toBe("");
  });

  it("input 값이 빈값인 경우에는 submit 핸들러가 실행되지 않습니다", () => {
    const input = getByLabelText(form, "에스프레소 메뉴 이름");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(form);

    expect(handleSubmit).not.toBeCalled();
  });
});
