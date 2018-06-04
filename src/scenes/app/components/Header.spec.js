import React from "react";
import sinon from "sinon";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";
configure({ adapter: new Adapter() });

const setup = props => {
  const component = shallow(<Header />);

  return {
    component: component
  };
};

describe("Product component", () => {
  it("should render successfully", () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it("should call component once", () => {
    const { component } = setup();
    const spy = sinon.spy(Header.prototype, "componentWillReceiveProps");
    expect(spy.calledOnce).toEqual(false);
    component.setProps({ cartItems: "1" });
    expect(spy.calledOnce).toEqual(true);
    expect(component.state().adding).toBe(true);
    setTimeout(() => expect(component.state().adding).toBe(false), 300);
  });
});
