describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://www.toyota.com/");
    cy.get("//*[@id='tcom-header']/div[2]/nav/div[3]/button").click();
  });
});
