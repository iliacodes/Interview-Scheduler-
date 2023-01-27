import React from "react";

import axios from "axios";

import { render, cleanup, prettyDOM, waitForElement, getByText, getByAltText, getByPlaceholderText, getAllByTestId, debug, fireEvent, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//Book interview test.

describe("Application", () => {

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});

//Cancelling interview test.

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. render the Application.
  const { container } = render(<Application />);

  // 2. wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. check that the confirmation message is shown.
  expect(getByText(appointment, "Please confirm you would like to delete this appointment.")).toBeInTheDocument();

  // 5. click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6.check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

});


it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});


// ERROR_SAVE test.
it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  // 1. render the Application.
  const { container } = render(<Application />);

  // 2. wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. get all appointments.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  // 4.click the add button
  fireEvent.click(getByAltText(appointment, "Add"));

  // 5. enter Lydia Miller-Jones into the form
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 6. click the save button
  fireEvent.click(getByText(appointment, "Save"));

  // 7. expect user to be prompted to picka n interviewer
  expect(getByText(appointment, "Please select an interviewer.")).toBeInTheDocument();
});

// ERROR_DELETE test.
it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  // 1. render the Application.
  const { container } = render(<Application />);

  // 2. wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. get all appointments 
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

  // 4. click the delete button
  fireEvent.click(queryByAltText(appointment, "Delete"));

  await waitForElement(() => getByText(container, "Please confirm you would like to delete this appointment."));

  // 5. expect to be prompted to confirm deletion.
  expect(getByText(appointment, "Please confirm you would like to delete this appointment.")).toBeInTheDocument();

  // 6. click the confirm button.
  fireEvent.click(getByText(appointment, "Confirm"));

  await waitForElement(() => getByText(container, "Error"))

});