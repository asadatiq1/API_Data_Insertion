import data from "../../fixtures/CommunitiesData.json";

describe("Insert multiple Communities", () => {
  it("Should insert multiple Communities", () => {
    const gqlMutation = `
    mutation CreateCommunity($input: CreateCommunityInput!) {
      createCommunity(input: $input) {
        title
        _id
      }
    }
          `;

    Object.keys(data).forEach((dataKey) => {
      if (dataKey !== "authToken" && dataKey !== "baseURL") {
        const companyData = data[dataKey]; // Define companyData within the loop

        // Construct the request body with the correct variables format
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

          expect(responseData.status).to.equal(companyData.status);
          expect(responseData.name).to.equal(companyData.name);
        });
      }
    });
  });
});
