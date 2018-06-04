import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Product from "./Product";
configure({ adapter: new Adapter() });

const setup = (name, unitsInStock, price) => {
  const actions = {
    onClick: jest.fn()
  };

  const component = mount(
    <Product
      name={name}
      unitsInStock={unitsInStock}
      price={price}
      {...actions}
    />
  );
  return {
    component,
    actions,
    button: component.find("button").first()
  };
};

describe("Product component", () => {
  it("should render successfully", () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it("should render cartitem name", () => {
    const { component } = setup("1");
    expect(component.props().name).toEqual("1");
  });
  
  it("should render cartitem without props", () => {
    const { component } = setup();
    expect(component.props().price).toEqual(0);
    expect(component.props().unitsInStock).toEqual(0);
    expect(component.props().name).toEqual("Product");
  });

  it("should not call action on button click with 0 item left", () => {
    const { button, actions } = setup();
    button.simulate("click");
    expect(actions.onClick).not.toBeCalled();
  });

  it("should not call action on button click with more than 1 item left", () => {
    const { button, actions } = setup(undefined, 10);
    button.simulate("click");
    expect(actions.onClick).toBeCalled();
  });
});
