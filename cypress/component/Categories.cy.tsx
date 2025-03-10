import HomePage from "../../app/recipe/page"
import { Provider } from "react-redux"
import store from "@/app/redux/store"


describe('Categories component and modal', () => {
  
  it('selects category and unselect it', () => {
    
    cy.mount(<Provider store={store}><HomePage /></Provider>)
    cy.get("#category-Dinner-home").click()
    cy.get("#category-Dinner-close").should('exist')

    cy.get("#category-Dinner-close").click()
    cy.get("#category-Dinner-close").should('not.exist')

  })

  // it("select category from modal and check if it's selected", () => {
  //   cy.mount(<Provider store={store}><HomePage /></Provider>)
  //   cy.get("#category-modal-btn").click()

  //   cy.get("#category-Soup-modal").click()

  //   cy.get("#category-Soup-home").should('exist')
  //   cy.get("#category-Soup-close").should('exist')
  // })
})