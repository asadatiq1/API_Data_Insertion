// cypress/integration/insert-admin-user.spec.js

describe("Insert Admin User into Database", () => {
  it("should insert an admin user into the database via GraphQL API", () => {
    // Define the GraphQL mutation and variables
    const gqlMutation = `
        mutation CreateAdminUser($input: CreateAdminUserInput!) {
          createAdminUser(input: $input) {
            email
            _id
          }
        }
      `;

    const variables = {
      input: {
        userType: "companyAdmin",
        role: "64f5efe42a9203ffc6126c1e",
        email: "qaengineer1@globaldrum.social",
        firstName: "Asad",
        status: "active",
      },
    };

    // Define the API endpoint and authorization token
    const apiUrl = "https://be.aa-dev.global-drum.com/api";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0ZjVlZWE3MDgyOGE1MWZhMjM2NGQzZiIsImVtYWlsIjoiYWRtaW5AZ2QuY29tIiwiZmlyc3ROYW1lIjoiR0QiLCJsYXN0TmFtZSI6IkFkbWluIiwicm9sZSI6eyJpc0dEVXNlciI6ZmFsc2UsIl9pZCI6IjY0ZjVlZmU0MmE5MjAzZmZjNjEyNmMxZSIsIm5hbWUiOiJHREFkbWluIiwic3RhdHVzIjoiYWN0aXZlIiwiZGVzY3JpcHRpb24iOiJBIEdEIHVzZXIiLCJwZXJtaXNzaW9ucyI6W10sImlzRGVsZXRlZCI6ZmFsc2V9LCJ1c2VyVHlwZSI6ImdkQWRtaW4iLCJhc3NpZ25lZE5ldHdvcmtzIjpbXSwiYXNzaWduZWRDb21tdW5pdGllcyI6W10sImFzc2lnbmVkQ29tcGFuaWVzIjpbXSwiYWxsTmV0d29ya3NBc3NpZ25lZCI6ZmFsc2UsImFsbENvbW11bml0aWVzQXNzaWduZWQiOmZhbHNlLCJhbGxDb21wYW5pZXNBc3NpZ25lZCI6ZmFsc2UsImlzUHJpdmF0ZSI6ZmFsc2UsImdlbmRlciI6Im1hbGUiLCJkZWZhdWx0TGFuZ3VhZ2UiOiJFbmdsaXNoIiwic2hvd0xvY2F0aW9uIjpmYWxzZSwic3RhdHVzIjoiYWN0aXZlIiwiaXNWZXJpZmllZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9fdiI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0wNFQxNDo1MDoxNi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0wN1QwNzoxNDoyOS45MTBaIiwibGFzdFNpZ25JbkRhdGUiOiIyMDIzLTA5LTA3VDA3OjE0OjI5LjkwOVoifSwiaWF0IjoxNjk0MDcwODcwLCJleHAiOjE2OTQxMTQwNzB9.rJZAl7uJLkoXYcDmG9zHbw56I4RXUGyAY6jMTUQQtOM";

    // Send the GraphQL request with authentication
    cy.request({
      method: "POST",
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the authorization token in the request header
      },
      body: {
        query: gqlMutation,
        variables: variables,
      },
    }).then((response) => {
      // Add assertions to check if the request was successful and verify the response
      expect(response.body.data.createAdminUser.email).to.equal(
        "qaengineer1@globaldrum.social"
      );
      // Add more assertions as needed
    });
    failOnStatusCode: false;
  });
});
