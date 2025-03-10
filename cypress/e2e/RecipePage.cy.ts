describe('recipe page', () => {

  beforeEach(() => {
    cy.intercept('POST', '/graphql', {
      statusCode: 200,
      body: {
        data: {
          recipes: {
            recipes: [
              {
                id: "1",
                name: "recipe1",
                description: "description1",
                cookingTime: 10,
                image: "image1",
                createdAt: "2021-09-09",
                category: "category1"
              },
              {
                id: "2",
                name: "recipe2",
                description: "description2",
                cookingTime: 20,
                image: "image2",
                createdAt: "2021-09-09",
                category: "category2"
              }
            ],
            count: 1
          }
        }
      }
    });

    cy.visit('http://localhost:3000/recipe')
  })

  it('visits default url and redirects to /recipe url', () => {
    cy.url().should('include', '/recipe')
  })
  it("clicks on one the recipes and navigates to the recipe's page", () => {

    cy.get("#recipe-1").click()
    cy.url().should('include', '/recipe/1')
  })
})

//To open cypress npx cypress open
//To run cypress npx cypress run