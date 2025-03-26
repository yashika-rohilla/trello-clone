describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should display validation errors on empty form submission', () => {
    cy.visit('/register');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Username is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should not register a user with an existing email', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Enter username"]').type('testuser');
    cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
    cy.get('input[placeholder="Enter password"]').type('Test@1234');
    cy.get('button[type="submit"]').click();

    cy.visit('/register');
    cy.get('input[placeholder="Enter username"]').type('testuser2');
    cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
    cy.get('input[placeholder="Enter password"]').type('Test@1234');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Email already exists').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
    cy.get('input[placeholder="Enter password"]').type('Test@1234');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
  });

  it('should show an error for incorrect password', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
    cy.get('input[placeholder="Enter password"]').type('WrongPassword');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid password').should('be.visible');
  });

  it('should show an error for non-existing email', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Enter email"]').type('nonexistent@example.com');
    cy.get('input[placeholder="Enter password"]').type('Test@1234');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid credentials').should('be.visible');
  });
});
