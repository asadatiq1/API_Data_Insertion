describe("sample Test", () => {
  it("gmail page verification", () => {
    cy.visit("www.google.com");
    cy.get("a[aria-label='Gmail (opens a new tab)']").click();
  });
});
