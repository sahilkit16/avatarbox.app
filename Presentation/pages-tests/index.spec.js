import jsdomGlobal from "jsdom-global";
import React from "react";
import IndexPage from "../pages/index";
import configureStore from "../store/configureStore";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { HomeVM } from "../view-models/home.vm";

jsdomGlobal();

describe("IndexPage", () => {
  it("should render", async () => {
    const store = configureStore({
      user: null,
      calendar: null,
    });
    const model = new HomeVM();
    const component = (
      <Provider store={store}>
        <IndexPage {...model} />
      </Provider>
    );
    const wrapper = mount(component);
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });
});
