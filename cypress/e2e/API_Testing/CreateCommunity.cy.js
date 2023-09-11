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
          console.log(response.body);
          expect(response.status).to.equal(200);

          const responseData = response.body.data.createNetwork;

          expect(responseData.status).to.equal(companyData.status);
          expect(responseData.name).to.equal(companyData.name);
        });
      }
    });
  });
});
