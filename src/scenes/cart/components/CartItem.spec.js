import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CartItem from "./CartItem";
configure({ adapter: new Adapter() });

const setup = (name, itemsLeft, price, quantity) => {
  const actions = {
    increaseItem: jest.fn(),
    decreaseItem: jest.fn(),
    destroyItem: jest.fn()
  };

  const component = mount(
    <CartItem
      name={name}
      itemsLeft={itemsLeft}
      price={price}
      quantity={quantity}
      {...actions}
    />
  );
  return {
    component,
    actions,
    price: component.find("span").at(1),
    decreaseButton: component.find("button").at(0),
    increaseButton: component.find("button").at(1),
    destroyButton: component.find("button").at(2)
  };
};

describe("Cart component", () => {
  it("should render successfully", () => {
    const { component } = setup("1");
    expect(component).toMatchSnapshot();
  });

  it("should render cartitem name", () => {
    const { component } = setup("1");
    expect(component.props().name).toEqual("1");
  });

  it("should render cartitem without props", () => {
    const { component } = setup();
    expect(component.props().price).toEqual(0);
    expect(component.props().quantity).toEqual(0);
    expect(component.props().itemsLeft).toEqual(0);
  });

  it("should render price with dollar sign", () => {
    const { price } = setup("name", 1, 12);
    expect(price.text()).toMatch("$12");
  });

  it("should not call action on button click with 0 quantity", () => {
    const { decreaseButton, actions } = setup("prod1");
    decreaseButton.simulate("click");
    expect(actions.decreaseItem).not.toBeCalled();
  });

  it("should call action on button click with quantity more than 1", () => {
    const { decreaseButton, actions } = setup("prod1", undefined, undefined, 2);
    decreaseButton.simulate("click");
    expect(actions.decreaseItem).toBeCalled();
  });

  it("should not call increase action on button click with 0 item left", () => {
    const { increaseButton, actions } = setup("prod1", 0);
    increaseButton.simulate("click");
    expect(actions.increaseItem).not.toBeCalled();
  });

  it("should call increase action on button click with 1 item left", () => {
    const { increaseButton, actions } = setup("prod1", 1);
    increaseButton.simulate("click");
    expect(actions.increaseItem).toBeCalled();
  });

  it("should call destroy action on button click", () => {
    const { destroyButton, actions } = setup("prod1", 1);
    destroyButton.simulate("click");
    expect(actions.destroyItem).toBeCalled();
  });
});
