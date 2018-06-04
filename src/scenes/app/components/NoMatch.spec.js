import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NoMatch from "./NoMatch";
configure({ adapter: new Adapter() });

const setup = props => {
  const component = shallow(<NoMatch />);

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
