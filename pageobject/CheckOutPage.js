const { expect } = require('@playwright/test');
class CheckOutPage {
    constructor(page) {
        this.navigatetocheckoutpage = page.locator('text=Checkout');
        this.checkoutaddedproduct = page.locator('div.item__title');
        this.expirydate = page.locator('select.input.ddl');
        this.cvvcode = page.locator('input.input.txt').nth(1);
        this.cardname = page.locator('input.input.txt').nth(2);
        this.couponname = page.locator('input.input.txt').nth(3)
        this.applycoupon = page.locator('text=Apply Coupon').nth(1);
        this.invalidcouponcode = page.locator('text=* Invalid Coupon');
        this.countryinput = page.locator('.user__name input').nth(1);
        this.waitforlist = page.locator('.ta-results.list-group.ng-star-inserted');
        this.getcountrylist =  page.locator('span.ng-star-inserted');
        this.validateemail = page.locator('.user__name label');
        this.placeorder = page.locator('text=Place Order ');

    }

    

    async addcheckoutdetail(productName) {
        await this.navigatetocheckoutpage.click();
        await this.checkoutaddedproduct.waitFor();
        const getCheckoutproduct = await this.checkoutaddedproduct.textContent();
        await expect(getCheckoutproduct).toContain(productName);
        await this.expirydate.nth(0).selectOption("05");
        await this.expirydate.nth(1).selectOption("05");

        await this.cvvcode.fill('1234');
        await this.cardname.fill('Lokesh Koli');

        await this.couponname.fill('Lokesh Koli');

        await this.applycoupon.click();
        await this.invalidcouponcode.waitFor();

        await this.countryinput.pressSequentially('IND');
        await this.waitforlist.waitFor();
        const countryList = await this.getcountrylist;
        const country = await countryList.count();
        for (let i = 0; i < country; ++i) {

            const countryName = await countryList.nth(i).textContent();
            if (countryName === ' India') {
                await countryList.nth(i).click();
                break;
            }
        }

        const email1 = await this.validateemail.textContent();
        await expect(email1).toEqual('lokeshk20892@gmail.com');
        await this.placeorder.click();
    }
}
module.exports = { CheckOutPage }