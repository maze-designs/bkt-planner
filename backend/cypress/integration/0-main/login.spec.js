// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const username = 'testuser'
const password = 'testing'
// const waitTime = 3000
const url = 'http://localhost:6969'


it('opens login page', () => {
cy.visit(url)
cy.get('a[href]').contains('Login').click()
cy.url().should('include', '/login.html')
})
it('login', () => {
    cy.visit(`${url}/login.html`)
cy.get('input[id=username]').type(username)
cy.get('input[id=password]').type(password)
cy.get('button[id=login]').click()
// cy.wait(waitTime)
cy.get('span[id=username]').contains(username)
})
it('logs out', () => {
    cy.get('a[href]').contains('Logout').click()
    cy.url().should('not.include', '/dashboard')
})