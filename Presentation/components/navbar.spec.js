import React from "react";
import NavBar from "./navbar";
import { shallow } from "enzyme";
import NavBarView from "../view-models/navbar.vm";

describe("NavBar", () => {
  it("should render navbar", () => {
    const model = new NavBarView();
    const wrapper = shallow(<NavBar model={model} />);
    expect(wrapper.find("nav.navbar").length).toBe(1);
  });
});
