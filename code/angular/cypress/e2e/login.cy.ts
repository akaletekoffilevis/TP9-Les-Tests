describe('Connexion', () => {
  it('redirige vers le tableau de bord avec des identifiants valides', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'jwt-123', redirectTo: '/dashboard' },
    }).as('login');

    cy.visit('/login');
    cy.get('[data-cy=email]').type('ada@exemple.fr');
    cy.get('[data-cy=password]').type('secret');
    cy.get('[data-cy=submit]').click();

    cy.wait('@login')
      .its('request.body')
      .should('deep.equal', {
        email: 'ada@exemple.fr',
        password: 'secret',
      });

    cy.url().should('include', '/dashboard');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('jwt-123');
    });
  });
});
