/// <reference types="Cypress" />
context('fetchGIFs loading', () => {
  beforeEach(() => {
    cy.stubGifpyAPI({ delay: 3000 })
    cy.visit('/')
  })

  it('has loading message', () => {
    cy.contains('Loading...').should('be.visible')
    cy.get('img[src="/images/loading.svg"]').should('be.visible')
  })
})

context('fetchGIFs success', () => {
  beforeEach(() => {
    cy.stubGifpyAPI()

    cy.visit('/')

    cy.wait('@fetchGIFs').its('url').should('include', '&q=pun')

    cy.get('.filter__input').as('filterField')
    cy.get('.giphy__column-toggle').as('toggleColumnButton')
  })
  
  it('loads GIFs', () => {
    cy.get('.giphy__gif').should('have.length', 10)
  })

  it('loads more GIFs when scroll to bottom', () => {
    cy.scrollTo('bottom')
    cy.get('.giphy__gif').should('have.length', 20)
    cy.scrollTo('bottom')
    cy.get('.giphy__gif').should('have.length', 30)
  })

  it('toggles application column layout', () => {
    cy.get('.giphy.giphy--three-column').should('exist')
    cy.get('@toggleColumnButton').click()
    cy.get('.giphy.giphy--three-column').should('not.exist')
    cy.get('@toggleColumnButton').click()
    cy.get('.giphy.giphy--three-column').should('exist')
  })

  it('loads relevant GIFs base on filter keyword', () => {
    cy.get('@filterField').type('dogs')
    cy.wait('@fetchGIFs').its('url').should('include', '&q=dogs')
    cy.get('.giphy__gif').should('have.length', 10)
  })
})

context('fetchGIFs failed', () => {
  beforeEach(() => {  
    cy.stubGifpyAPI({ status: 500, response: {} })
    cy.visit('/')

    cy.contains('Oh no! Something went wrong when fetching the GIFs :(').as('errorMessageText')
    cy.get('img[src="/images/error.gif"]').as('errorMessageImage')
    cy.get('.error__reload').as('reloadButton')
  })

  it('shows error message', () => {
    cy.get('@errorMessageText').should('be.visible')
    cy.get('@errorMessageImage').should('be.visible')
  })

  it('has a button to retry', () => {
    cy.stubGifpyAPI()
    cy.get('@reloadButton').click()
    cy.get('.giphy__gif').should('have.length', 10)
  })
})