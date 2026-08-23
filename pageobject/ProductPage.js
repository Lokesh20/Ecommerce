const { expect } = require('@playwright/test');
class ProductPage {
    constructor(page) {
        this.products = page.locator('.card-body')
        this.firstProduct = page.locator(".card-body b");
        this.cartcount = page.locator("button  label")
    }

    async addsingleProduct(productName) {
        const products = this.products;
        await this.firstProduct.first().waitFor();
        const count = await products.count();
        for (let i = 0; i < count; ++i) {
            const singleProduct = await products.nth(i).locator('b').textContent();
            if (singleProduct === productName) {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

        await this.cartcount.waitFor();
        const cartCount = await this.cartcount.textContent();
        await expect(cartCount).toEqual("1");
    }
}
module.exports = { ProductPage };