import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Skeleton from "./Skeleton";
configure({ adapter: new Adapter() });

const setup = props => {
  const component = shallow(<Skeleton />);

  return {
    component: component
  };
};

describe("Product component", () => {
  it("should render successfully", () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});
