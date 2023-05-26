describe('E-commerce Shopping', () => {
  it('should add product to cart', () => {
    cy.intercept({
      url: 'https://magento.softwaretestingboard.com/customer/section/load/*',
      method : 'GET', 
    }).as('waitAddToCart');
    
    // Visite le site web
    cy.visit('https://magento.softwaretestingboard.com/');

    // Recherche et clique sur "Tops"
    cy.get("#search").type("Tops");
    cy.get('#ui-id-4 > :nth-child(2)').trigger('mouseover'); // survol de l'onglet "woman"
    cy.get('#ui-id-9').click(); // click sur "tops"

   // cy.wait(500);

    // Sélectionne le premier produit
    cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();

    // Choisit une taille pour le produit
    cy.get('#option-label-size-143-item-166').click(); // sélectionne la taille XS
    cy.get('#option-label-color-93-item-57').click(); // sélectionne la couleur "rose"

    // Ajoute le produit au panier
    cy.get('#product-addtocart-button').click();

    // Ajoute une attente avant d'ouvrir le panier
    cy.wait('@waitAddToCart');

    cy.get('.showcart').click() // click sur le panier
    cy.wait(1000)
    cy.get(':nth-child(7) > .secondary > .action > span').click({"force": true}) // sélectionner "proceed to checkout"
    cy.wait(1000)
    // Modifie la quantité du produit
    cy.get('[id$="-qty"]').clear({force: true}).type('2', {force: true}); // modifie la quantité à 2
    cy.get('.update').click({force: true});
    // clique sur le bouton de mise à jour

    cy.get('.checkout-methods-items > :nth-child(1) > .action > span').click()

    cy.wait('@waitAddToCart');
  });
});
