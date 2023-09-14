import data from "../../fixtures/CompaniesData.json";

describe("Insert multiple company", () => {
  it("Create a company", () => {
    const gqlMutation = `
        mutation CreateCompany($input: CreateCompanyInput!) {
          createCompany(input: $input) {
            status
            registrationId
            name
            _id
            businessContact {
              phone
              lastName
              jobTitle
              firstName
              email
            }
          }
        }
      `;

    const companiesData = [data.company1, data.company2, data.company3];

    const apiUrl = "https://be.aa-qa.global-drum.com/api";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY1MDFjYWNiYzk1ZDkyNTNlMWIxZWY0OCIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInJvbGUiOnsiX2lkIjoiNjUwMWNhY2FjOTVkOTI1M2UxYjFlZjQ2IiwibmFtZSI6IkFkbWluIiwic3RhdHVzIjoiYWN0aXZlIiwiZGVzY3JpcHRpb24iOiJSb2xlIERlc2NyaXB0aW9uIDEiLCJpc0dEVXNlciI6dHJ1ZSwiaXNEZWxldGVkIjpmYWxzZSwicGVybWlzc2lvbnMiOlsiNjUwMWNhY2FjOTVkOTI1M2UxYjFlZWU3Il0sIl9fdiI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0xM1QxNDo0NDoyNi45MDJaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0xM1QxNDo0NDoyNi45MDJaIn0sInVzZXJUeXBlIjoiY29tcGFueVVzZXIiLCJhc3NpZ25lZE5ldHdvcmtzIjpbXSwiYXNzaWduZWRDb21tdW5pdGllcyI6W10sImFzc2lnbmVkQ29tcGFuaWVzIjpbXSwiYWxsTmV0d29ya3NBc3NpZ25lZCI6ZmFsc2UsImFsbENvbW11bml0aWVzQXNzaWduZWQiOmZhbHNlLCJhbGxDb21wYW5pZXNBc3NpZ25lZCI6ZmFsc2UsImlzUHJpdmF0ZSI6ZmFsc2UsImdlbmRlciI6Im1hbGUiLCJkZWZhdWx0TGFuZ3VhZ2UiOiJFbmdsaXNoIiwic2hvd0xvY2F0aW9uIjpmYWxzZSwic3RhdHVzIjoiYWN0aXZlIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNEZWxldGVkIjpmYWxzZSwiX192IjowLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTEzVDE0OjQ0OjI3LjE2NloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTE0VDA1OjQ2OjMxLjE5MVoiLCJsYXN0U2lnbkluRGF0ZSI6IjIwMjMtMDktMTRUMDU6NDY6MzEuMTg5WiJ9LCJpYXQiOjE2OTQ2NzAzOTEsImV4cCI6MTY5NDcxMzU5MX0.v0skXcNltPPwS8D2y6buL87Pj-6iee6KGvG7pzU_MWs"; // Replace with your actual authorization token

    cy.wrap(companiesData).each((companyData) => {
      const requestBody = {
        query: gqlMutation,
        variables: {
          input: companyData,
        },
      };

      cy.request({
        method: "POST",
        url: apiUrl,
        headers: {
          Authorization: authToken,
        },
        body: requestBody,
      }).then((response) => {
        console.log(response.body);
        expect(response.status).to.equal(200);

        const responseData = response.body.data.createCompany;

        expect(responseData.status).to.equal(companyData.status);
        expect(responseData.registrationId).to.equal(
          companyData.registrationId
        );
        expect(responseData.name).to.equal(companyData.name);
      });
    });
  });
});
