import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps = {
  btnType: "danger",
  size: "lg",
  className: "btn-test",
};

const linkProps = {
  btnType: "link",
  href: "http://www.baidu.com",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("测试Button组件", () => {
  it("默认Button测试", () => {
    // 加载按钮
    const wrapper = render(<Button {...defaultProps}>Button Default</Button>);
    const element = wrapper.getByText("Button Default") as HTMLButtonElement;
    expect(element).toBeInTheDocument; // 是否加载
    expect(element.tagName).toEqual("BUTTON"); // 是否是BUTTON标签
    expect(element.className).toEqual("btn btn-default"); // class样式
    expect(element.disabled).toBeFalsy(); // disabled属性
    // click事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("自定义Button测试", () => {
    const wrapper = render(<Button {...testProps}>Button</Button>);
    const element = wrapper.getByText("Button");
    expect(element).toBeInTheDocument; // 是否加载
    expect(element.className).toContain("btn-test"); // class样式
    expect(element.className).toContain("btn-danger"); // class样式
  });

  it("Link Button测试", () => {
    const wrapper = render(<Button {...linkProps}>Link</Button>);
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument; // 是否加载
    expect(element.tagName).toEqual("A"); // 是否是BUTTON标签
    expect(element.className).toContain("btn-link"); // class样式
  });

  it("disabled Button测试", () => {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>);
    const element = wrapper.getByText("Disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument; // 是否加载
    expect(element.tagName).toEqual("BUTTON"); // 是否是BUTTON标签
    expect(element.disabled).toBeTruthy(); // disabled属性
    // click事件
    fireEvent.click(element);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});
