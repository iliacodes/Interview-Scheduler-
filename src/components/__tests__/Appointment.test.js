/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";
import '../Appointment';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

xit("does something it is supposed to do", () => {
  // ...
});

xit("does something else it is supposed to do", () => {
  // ...
});
