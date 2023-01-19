describe("Appointments", () => {
  beforeEach(() => {
        //reset server state to original api request so tests can continue to pass.
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");

   });

  it("should book an interview", () => {

    //clicks the add button.
    cy.get("[alt=Add]")
      .first()
      .click();

    //enters the name "Lydia..."
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //selects an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //clicks the save button
    cy.contains("Save").click();

    //checks for said booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    //clicks the edit button on already created appointment
    cy.get("[alt=Add]")
    .first()
    .click();

    //clears input, clicks a new interviewer
    cy.get("[data-testid=student-name-input").type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    //clicks the save button
    cy.contains("Save").click();

    //checks for said edited appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm")
  })

  it("should cancel an interview", () => {
    //clicks the edit button on already created appointment
    cy.get("[alt=Delete]")
    .click({force: true});

    //clicks the confirm button
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    //checks if appointment was deleted
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist")

  })
});