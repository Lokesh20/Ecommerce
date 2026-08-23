const { expect } = require('@playwright/test');

class OrderPage {
    constructor(page) {
        this.navigatetoorder = page.locator("button[routerlink='/dashboard/myorders']");
        this.yourorder = page.locator('text=Your Orders');
        this.orderlist =  page.locator('tbody tr th');
        this.viewbutton = page.locator('.btn.btn-primary');
        this.ordersummary = page.locator('text= order summary ');
        this.getorderNumber =  page.locator('div.-main')
    }

    async orderdetail(orderNumber) {
        await this.navigatetoorder.click();
        await this.yourorder.waitFor();

        const orderlist = await this.orderlist;
        const ordercount = await orderlist.count();

        for (let i = 0; i < ordercount; i++) {

            const orderNumber1 = (await orderlist.nth(i).textContent()).trim();
            if (orderNumber.includes(orderNumber1)) {
                await this.viewbutton.nth(i).click();
                break;
            }
        }
    }

    async ordersummary1(orderNumber) {
        await this.ordersummary.waitFor();
        const getOrderNumber = await this.getorderNumber.textContent();
        await expect(orderNumber).toContain(getOrderNumber);
        ;
    }
}
module.exports = { OrderPage }