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

    const apiUrl = "https://be.aa-dev.global-drum.com/api";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0ZjVlZWE3MDgyOGE1MWZhMjM2NGQzZiIsImVtYWlsIjoiYWRtaW5AZ2QuY29tIiwiZmlyc3ROYW1lIjoiR0QiLCJsYXN0TmFtZSI6IkFkbWluIiwicm9sZSI6eyJpc0dEVXNlciI6ZmFsc2UsIl9pZCI6IjY0ZjVlZmU0MmE5MjAzZmZjNjEyNmMxZSIsIm5hbWUiOiJHREFkbWluIiwic3RhdHVzIjoiYWN0aXZlIiwiZGVzY3JpcHRpb24iOiJBIEdEIHVzZXIiLCJwZXJtaXNzaW9ucyI6W10sImlzRGVsZXRlZCI6ZmFsc2V9LCJ1c2VyVHlwZSI6ImdkQWRtaW4iLCJhc3NpZ25lZE5ldHdvcmtzIjpbXSwiYXNzaWduZWRDb21tdW5pdGllcyI6W10sImFzc2lnbmVkQ29tcGFuaWVzIjpbXSwiYWxsTmV0d29ya3NBc3NpZ25lZCI6ZmFsc2UsImFsbENvbW11bml0aWVzQXNzaWduZWQiOmZhbHNlLCJhbGxDb21wYW5pZXNBc3NpZ25lZCI6ZmFsc2UsImlzUHJpdmF0ZSI6ZmFsc2UsImdlbmRlciI6Im1hbGUiLCJkZWZhdWx0TGFuZ3VhZ2UiOiJFbmdsaXNoIiwic2hvd0xvY2F0aW9uIjpmYWxzZSwic3RhdHVzIjoiYWN0aXZlIiwiaXNWZXJpZmllZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9fdiI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0wNFQxNDo1MDoxNi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0wN1QwNzoxNDoyOS45MTBaIiwibGFzdFNpZ25JbkRhdGUiOiIyMDIzLTA5LTA3VDA3OjE0OjI5LjkwOVoifSwiaWF0IjoxNjk0MDcwODcwLCJleHAiOjE2OTQxMTQwNzB9.rJZAl7uJLkoXYcDmG9zHbw56I4RXUGyAY6jMTUQQtOM"; // Replace with your actual authorization token

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
          Authorization: authToken, // Include the authorization token in the request header
        },
        body: requestBody,
      }).then((response) => {
        // Add assertions to check if the request was successful and verify the response
        console.log(response.body);
        expect(response.status).to.equal(200);

        // Extract the response data
        const responseData = response.body.data.createCompany;

        // Assert the response data if it exists
        //   if (responseData) {
        expect(responseData.status).to.equal(companyData.status);
        expect(responseData.registrationId).to.equal(
          companyData.registrationId
        );
        expect(responseData.name).to.equal(companyData.name);
        // Add more assertions for nested data if needed
        //   } else {
        //     console.error("Response data is null or undefined");
        //   }
      });
    });
  });
});