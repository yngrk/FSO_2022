/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
afterEach(function () {
  cy.wait(500);
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.createUser({
      username: 'testuser1',
      name: 'testuser1_fullname',
      password: 'pass',
    });
  });

  it('front page can be opened', function () {
    cy.contains('blogs');
  });

  it('login form is shown', function () {
    cy.contains('log in').click();
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('testuser1');
      cy.get('#password').type('pass');
      cy.get('#login-button').click();

      cy.get('html').should('contain', 'testuser1 logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('wronguser');
      cy.get('#password').type('wrongpass');
      cy.get('#login-button').click();

      cy.get('#error-msg')
        .should('contain', 'wrong username or password')
        .and('have.css', 'background-color', 'rgba(255, 0, 0, 0.25)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser1', password: 'pass' });
    });

    it('a new note can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('a new blog title');
      cy.get('#author').type('author of new blog');
      cy.get('#url').type('url_of_new_blog');
      cy.get('button').contains('create').click();

      cy.contains('a new blog title');
      cy.contains('author of new blog');
    });

    describe('when a blog already exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testBlog',
          author: 'testAuthor',
          url: 'testUrl',
          likes: 0,
        });
      });

      it('can switch to detailed view', function () {
        cy.get('button').contains('view').click();
        cy.contains('likes');
        cy.contains('url');
      });

      it('can like a blog', function () {
        cy.get('button').contains('view').click();
        cy.contains('likes: 0');
        cy.get('button').contains('like').click();
        cy.contains('likes: 1');
      });

      it('blog can be deleted by poster', function () {
        cy.get('button').contains('view').click();
        cy.contains('url');
        cy.contains('likes');
        cy.get('button').contains('remove').click();
        cy.should('not.contain', 'testBlog');
        cy.should('not.contain', 'testAuthor');
      });

      describe('and a different user is logged in', function () {
        beforeEach(function () {
          cy.createUser({
            username: 'testuser2',
            name: 'testuser2_fullname',
            password: 'pass',
          });

          cy.login({ username: 'testuser2', password: 'pass' });
        });

        it('cannot delete others blogs', function () {
          cy.get('button').contains('view').click();
          cy.get('button').should('not.contain', 'remove');
        });
      });
    });

    describe.only('when multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog1',
          author: 'author1',
          url: 'url1',
          likes: 0,
        });
        cy.createBlog({
          title: 'blog2',
          author: 'author2',
          url: 'url2',
          likes: 1,
        });
        cy.createBlog({
          title: 'blog3',
          author: 'author3',
          url: 'url3',
          likes: 2,
        });
      });

      it('blogs are sorted by likes', function () {
        cy.get('.blog')
          .first()
          .contains('blog3');
        cy.get('.blog')
          .last()
          .contains('blog1')
          .contains('view')
          .click();

        cy.get('.blog')
          .last()
          .contains('like')
          .click()
          .wait(100)
          .click()
          .wait(100)
          .click()
          .wait(100);

        cy.get('.blog')
          .first()
          .contains('blog1');
      });
    });
  });
});
