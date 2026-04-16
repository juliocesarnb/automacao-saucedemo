class InventoryPage {
  selectors = {
    pageTitle: '.title',
    inventoryList: '.inventory_list',
    inventoryItems: '.inventory_item',
    cartLink: '.shopping_cart_link',
    cartBadge: '.shopping_cart_badge',
  };

  pageTitle() {
    return cy.get(this.selectors.pageTitle);
  }

  inventoryList() {
    return cy.get(this.selectors.inventoryList);
  }

  inventoryItems() {
    return cy.get(this.selectors.inventoryItems);
  }

  cartLink() {
    return cy.get(this.selectors.cartLink);
  }

  cartBadge() {
    return cy.get(this.selectors.cartBadge);
  }

  addToCartButton(itemSlug) {
    return cy.get(`[data-test="add-to-cart-${itemSlug}"]`);
  }

  removeFromCartButton(itemSlug) {
    return cy.get(`[data-test="remove-${itemSlug}"]`);
  }

  productImage(imageId) {
    return cy.get(`#item_${imageId}_img_link img`);
  }

  addItemToCart(itemSlug) {
    this.addToCartButton(itemSlug).click();
  }

  addItemsToCart(itemSlugs) {
    itemSlugs.forEach((itemSlug) => {
      this.addItemToCart(itemSlug);
    });
  }

  goToCart() {
    this.cartLink().click();
  }
}

export default new InventoryPage();
