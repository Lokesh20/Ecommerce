const { expect } = require('@playwright/test');
class ConformationPage {
    constructor(page) {
        this.thankyoumessge = page.locator('.hero-primary');
        this.ordernumber = page.locator('tr td label').nth(1);
    }

    async conformationdetail() {
        await this.thankyoumessge.waitFor();
        const thank = await this.thankyoumessge.textContent();
        expect(thank).toEqual(' Thankyou for the order. ');
        const orderNumber = (await this.ordernumber.textContent())?.trim();;
        return orderNumber;

    }

}
module.exports = { ConformationPage }