const { expect } = require('@playwright/test');
class CartPage {

    constructor(page) {
        this.navigateToCart = page.locator("button[routerlink='/dashboard/cart']");
        this.addProductName = page.locator('.cartSection h3');
    }

    async cartProduct(productName) {
        await this.navigateToCart.click();
        const getCartProduct = await this.addProductName.textContent();
        await expect(getCartProduct).toContain(productName);
    }
}
module.exports = { CartPage }