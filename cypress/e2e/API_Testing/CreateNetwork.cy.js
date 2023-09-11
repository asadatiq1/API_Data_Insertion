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
            Authorization: data.authToken,
          },
          body: requestBody,
        }).then((response) => {
          expect(response.status).to.equal(200);

          const responseData = response.body.data.createNetwork;

          expect(responseData.status).to.equal(companyData.status);
          expect(responseData.name).to.equal(companyData.name);
        });
      }
    });
  });
});
