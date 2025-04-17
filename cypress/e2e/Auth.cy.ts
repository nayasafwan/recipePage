describe("Auth modal", ()=>{
    
    it("Sign ups to access create page", ()=>{

        cy.intercept('POST', '/graphql', {
            statusCode: 200,
            body: {
              data: {
                recipes: {
                  recipes: [],
                  count: 1
                }
              }
            }
          });

        cy.visit("http://localhost:3000/recipe")
        cy.get("#create-recipe").click()

        cy.get("#signup").should("exist")

        cy.get('#signup-email').type('test@example.com');
        cy.get('#signup-email').should('have.value', 'test@example.com');

        cy.get('#signup-username').type('testuser');
        cy.get('#signup-username').should('have.value', 'testuser');

        cy.get('#signup-password').type('password123');
        cy.get('#signup-password').should('have.value', 'password123');
 
        cy.get('#signup-confirm-password').type('password123');
        cy.get('#signup-confirm-password').should('have.value', 'password123');

        cy.intercept('POST', '/graphql', {
            statusCode : 200,
            body : {
                data : {
                    signup: {
                        code : 200,
                        username : "testuser",
                    }
                }
            }
        })


        cy.get('#signup').click()
        cy.get("#signup").should("not.exist")
        cy.get("#username").should("have.text", "testuser")


    })

    it("Opens create page with authneticated user", ()=>{

        cy.intercept('POST', '/graphql', {
            statusCode: 200,
            body: {
              data: {
                recipes: {
                  recipes: [],
                  count: 1
                }
              }
            }
          });

        cy.visit("http://localhost:3000/recipe")

        cy.intercept('POST', '/graphql', (req) => {
            if (req.body.operationName === 'user') {
              req.reply({
                statusCode: 200,
                body: {
                  data: {
                    user: {
                      code: 200,
                      username: "testuser",
                    },
                  },
                },
              });
            }
          });
        
        cy.get("#create-recipe").click()
        cy.get("#signup").should("not.exist")
          
    })

    it("Logins to access create page", ()=>{
        cy.intercept('POST', '/graphql', {
            statusCode: 200,
            body: {
              data: {
                recipes: {
                  recipes: [],
                  count: 1
                }
              }
            }
          });

        cy.visit("http://localhost:3000/recipe")
        cy.get("#create-recipe").click()

        cy.get("#toggle-auth").click()
        cy.get("#login").should("exist")

        cy.get("#login-username").type("testuser")
        cy.get("#login-username").should("have.value", "testuser")

        cy.get("#login-password").type("password123")
        cy.get("#login-password").should("have.value", "password123")

        cy.intercept('POST', '/graphql', {
            statusCode : 200,
            body : {
                data : {
                    login: {
                        code : 200,
                        username : "testuser",
                    }
                }
            }
        })

        cy.get("#login").click()
        cy.get("#login").should("not.exist")

        cy.get("#username").should("have.text", "testuser")
        cy.get("#create-recipe").click()

        cy.get("#signup").should("not.exist")
    })

    
})