import { mount } from "@vue/test-utils";
import Input from "./Input";

describe("Input.vue", () => {
  it("Input Attributes", () => {
    const inputPlaceholder = "请输入姓名";
    const inputValue = "趣头条";

    const input = mount(Input, {
      propsData: {
        placeholder: inputPlaceholder,
        value: inputValue,
      },
    });

    const attr = input.attributes();
    expect(input.find("input").is("textarea")).toBe(false);
    expect(attr.placeholder).toBe(inputPlaceholder);
    expect(input.element).toMatchSnapshot();
  });

  it("Input Events", () => {
    const fnInput = jest.fn();
    const fnFocus = jest.fn();
    const fnBlur = jest.fn();

    const wrapper = mount(Input, {
      listeners: {
        input: fnInput,
        focus: fnFocus,
        blur: fnBlur,
      },
    });
    const input = wrapper.find("input");

    input.element.value = "1";
    input.trigger("input");
    expect(fnInput).toHaveBeenCalled();
    expect(wrapper.emitted("input")[0][0]).toEqual("1");

    input.trigger("focus");
    expect(fnFocus).toHaveBeenCalled();

    input.trigger("blur");
    expect(fnBlur).toHaveBeenCalled();
  });

  it("TextArea Attributes", () => {
    const textareaPlaceholder = "请输入姓名";
    const textareaValue = "趣头条";
    const textareaRows = "3";

    const textarea = mount(Input, {
      propsData: {
        type: "textarea",
        placeholder: textareaPlaceholder,
        value: textareaValue,
        rows: textareaRows,
      },
    });

    const attr = textarea.attributes();
    expect(textarea.find("textarea").is("textarea")).toBe(true);
    expect(attr.placeholder).toBe(textareaPlaceholder);
    expect(attr.rows).toBe(textareaRows);
    expect(textarea.element).toMatchSnapshot();
  });

  it("TextArea Events", () => {
    const textareaOnInput = jest.fn();
    const textareaOnFocus = jest.fn();
    const textareaOnBlur = jest.fn();

    const input = mount(Input, {
      listeners: {
        input: textareaOnInput,
        focus: textareaOnFocus,
        blur: textareaOnBlur,
      },
    });

    input.trigger("input");
    input.trigger("focus");
    input.trigger("blur");
    expect(textareaOnInput).toHaveBeenCalled();
    expect(textareaOnFocus).toHaveBeenCalled();
    expect(textareaOnBlur).toHaveBeenCalled();
  });

  it("Input value with HTML and space", () => {
    const inputValue = "   <script>console.log()</script> ";

    const input = mount(Input, {
      propsData: {
        value: inputValue,
      },
    });

    expect(input.element.value).toBe("console.log()");
  });

  it("TextArea value with HTML and space", () => {
    const inputValue = "  <script>console.log()</script> ";

    const input = mount(Input, {
      propsData: {
        type: "textarea",
        value: inputValue,
      },
    });

    expect(input.element.value).toBe("  console.log() ");
  });
});
