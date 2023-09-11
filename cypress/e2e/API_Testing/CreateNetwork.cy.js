import data from "../../fixtures/NetworkData.json";

describe("Insert multiple Networks", () => {
  it("Create a Network", () => {
    const gqlMutation = `
    mutation CreateNetwork($input: CreateNetworkInput!) {
      createNetwork(input: $input) {
        status
        name
        _id
      }
    }
    `;

    Object.keys(data).forEach((dataKey) => {
      if (dataKey !== "authToken" && dataKey !== "baseURL") {
        const companyData = data[dataKey];

        const requestBody = {
          query: gqlMutation,
          variables: {
            input: companyData,
          },
        };

        cy.request({
          method: "POST",
          url: data.baseURL,
          headers: {
            Authorization: data.authToken, // Include the authorization token in the request header
          },
          body: requestBody,
        }).then((response) => {
          // Add assertions to check if the request was successful and verify the response
          console.log(response.body);
          expect(response.status).to.equal(200);

          // Extract the response data
          const responseData = response.body.data.createNetwork;

          // Assert the response data if it exists
          // if (responseData) {
          expect(responseData.status).to.equal(companyData.status);
          expect(responseData.name).to.equal(companyData.name);
        });
      }
    });
  });
});
