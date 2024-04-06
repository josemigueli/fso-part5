describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'john_doe',
      name: 'John Doe',
      password: 'myAwesomePassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login to the application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('success with correct credentials', function() {
      cy.get('#username').type('john_doe')
      cy.get('#password').type('myAwesomePassword')
      cy.get('#login-button').click()

      cy.contains('John Doe logged in')
      cy.contains('Logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('john_doe')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('.notification-error')
          .should('contain', 'Invalid username or password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('john_doe')
      cy.get('#password').type('myAwesomePassword')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function() {
      cy.get('#create-blog-button').click()

      cy.get('#title').type('An awesome blog')
      cy.get('#author').type('Johny Bravo')
      cy.get('#url').type('http://theurioftheblog.com/an-awesome-blog')

      cy.get('#save-blog-button').click()

      cy.get('.notification-success')
          .should('contain', 'Blog An awesome blog by Johny Bravo added')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

      cy.get('#individual-blog')
        .should('contain', 'An awesome blog by Johny Bravo')
        .and('contain', 'View')
        .and('have.css', 'border-style', 'solid')
    })
  })
})