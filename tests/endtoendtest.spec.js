const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobject/LoginPage');
const { ProductPage } = require('../pageobject/ProductPage');
const { CartPage } = require('../pageobject/CartPage')
const { CheckOutPage } = require('../pageobject/CheckOutPage')
const { ConformationPage } = require('../pageobject/ConformationPage')
const { OrderPage } = require('../pageobject/OrderPage')

test("End to End test case", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "lokeshk20892@gmail.com";
    const productName = 'ZARA COAT 3';
    const password = "Mahindra@123"
    await page.locator('input#userEmail').fill(email);
    await page.locator("input[formcontrolname='userPassword']").fill(password);
    await page.locator('input.login-btn').click();
    const toast = await page.locator('div#toast-container');
    const toatLoginMessage = await toast.textContent();
    await expect(toatLoginMessage).toEqual(' Login Successfully ')
    //await page.pause();
    //product page
    const products = page.locator('.card-body')
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        const singleProduct = await products.nth(i).locator('b').textContent();
        if (singleProduct === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("button  label").waitFor();
    const cartCount = await page.locator("button  label").textContent();
    await expect(cartCount).toEqual("1");

    //naviagte to cart page
    await page.locator("button[routerlink='/dashboard/cart']").click();
    const getCartProduct = await page.locator('.cartSection h3').textContent();
    await expect(getCartProduct).toContain(productName);
    await page.locator('text=Checkout').click();
    await page.locator('div.item__title').waitFor();
    const getCheckoutproduct = await page.locator('div.item__title').textContent();
    await expect(getCheckoutproduct).toContain(productName);
    await page.locator('select.input.ddl').nth(0).selectOption("05");
    await page.locator('select.input.ddl').nth(1).selectOption("05");
    await page.locator('input.input.txt').nth(1).fill('1234');
    await page.locator('input.input.txt').nth(2).fill('Lokesh Koli');

    await page.locator('input.input.txt').nth(3).fill('Lokesh Koli');

    await page.locator('text=Apply Coupon').nth(1).click();
    await page.locator('text=* Invalid Coupon').waitFor();

    await page.locator('.user__name input').nth(1).pressSequentially('IND');
    await page.locator('.ta-results.list-group.ng-star-inserted').waitFor();
    const countryList = await page.locator('span.ng-star-inserted');
    const country = await countryList.count();
    for (let i = 0; i < country; ++i) {

        const countryName = await countryList.nth(i).textContent();
        if (countryName === ' India') {
            await countryList.nth(i).click();
            break;
        }
    }

    const email1 = await page.locator('.user__name label').textContent();
    await expect(email1).toEqual('lokeshk20892@gmail.com');
    await page.locator('text=Place Order ').click();

    // thank page
    await page.locator('.hero-primary').waitFor();
    const thank = await page.locator('.hero-primary').textContent();
    expect(thank).toEqual(' Thankyou for the order. ');
    //const orderNumber = await page.locator('tr td label').nth(1).textContent().trim();
    const orderNumber = (await page.locator('tr td label').nth(1).textContent())?.trim();

    //order page
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator('text=Your Orders').waitFor();

    const orderlist = await page.locator('tbody tr th');
    const ordercount = await orderlist.count();

    for (let i = 0; i < ordercount; i++) {

        const orderNumber1 = (await orderlist.nth(i).textContent()).trim();
        if (orderNumber.includes(orderNumber1)) {
            await page.locator('.btn.btn-primary').nth(i).click();
            break;
        }
    }

    //order summary page
    await page.locator('text= order summary ').waitFor();
    const getOrderNumber = await page.locator('div.-main').textContent();
    await expect(orderNumber).toContain(getOrderNumber);
    ;

})

test.only("With Page Object", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "lokeshk20892@gmail.com";
    const productName = 'ZARA COAT 3';
    const password = "Mahindra@123";

    const loginpage = new LoginPage(page);
    await loginpage.login(email, password);
    //product page
    const productpage = new ProductPage(page);
    await productpage.addsingleProduct(productName);


    //naviagte to cart page
    const cartPage = new CartPage(page);
    await cartPage.cartProduct(productName);

    //checkoutpage
    const checkout = new CheckOutPage(page);
    await checkout.addcheckoutdetail(productName);


    // thank page
    const conformation = new ConformationPage(page);
    const orderNumber = await conformation.conformationdetail();

    //order page
    const orderpage = new OrderPage(page);
    await orderpage.orderdetail(orderNumber);
    await orderpage.ordersummary1(orderNumber);


})

test("Playright locator ", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "lokeshk20892@gmail.com";
    const productName = 'ZARA COAT 3';
    const password = "Mahindra@123"

    await page.getByRole("textbox",{name:'Email'}).fill(email);
   // await page.locator('input#userEmail').fill(email);
    await page.locator("input[formcontrolname='userPassword']").fill(password);
    await page.locator('input.login-btn').click();
    const toast = await page.locator('div#toast-container');
    const toatLoginMessage = await toast.textContent();
    await expect(toatLoginMessage).toEqual(' Login Successfully ')
    //await page.pause();
    //product page
    const products = page.locator('.card-body')
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        const singleProduct = await products.nth(i).locator('b').textContent();
        if (singleProduct === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("button  label").waitFor();
    const cartCount = await page.locator("button  label").textContent();
    await expect(cartCount).toEqual("1");

    //naviagte to cart page
    await page.locator("button[routerlink='/dashboard/cart']").click();
    const getCartProduct = await page.locator('.cartSection h3').textContent();
    await expect(getCartProduct).toContain(productName);
    await page.locator('text=Checkout').click();
    await page.locator('div.item__title').waitFor();
    const getCheckoutproduct = await page.locator('div.item__title').textContent();
    await expect(getCheckoutproduct).toContain(productName);
    await page.locator('select.input.ddl').nth(0).selectOption("05");
    await page.locator('select.input.ddl').nth(1).selectOption("05");
    await page.locator('input.input.txt').nth(1).fill('1234');
    await page.locator('input.input.txt').nth(2).fill('Lokesh Koli');

    await page.locator('input.input.txt').nth(3).fill('Lokesh Koli');

    await page.locator('text=Apply Coupon').nth(1).click();
    await page.locator('text=* Invalid Coupon').waitFor();

    await page.locator('.user__name input').nth(1).pressSequentially('IND');
    await page.locator('.ta-results.list-group.ng-star-inserted').waitFor();
    const countryList = await page.locator('span.ng-star-inserted');
    const country = await countryList.count();
    for (let i = 0; i < country; ++i) {

        const countryName = await countryList.nth(i).textContent();
        if (countryName === ' India') {
            await countryList.nth(i).click();
            break;
        }
    }

    const email1 = await page.locator('.user__name label').textContent();
    await expect(email1).toEqual('lokeshk20892@gmail.com');
    await page.locator('text=Place Order ').click();

    // thank page
    await page.locator('.hero-primary').waitFor();
    const thank = await page.locator('.hero-primary').textContent();
    expect(thank).toEqual(' Thankyou for the order. ');
    //const orderNumber = await page.locator('tr td label').nth(1).textContent().trim();
    const orderNumber = (await page.locator('tr td label').nth(1).textContent())?.trim();

    //order page
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator('text=Your Orders').waitFor();

    const orderlist = await page.locator('tbody tr th');
    const ordercount = await orderlist.count();

    for (let i = 0; i < ordercount; i++) {

        const orderNumber1 = (await orderlist.nth(i).textContent()).trim();
        if (orderNumber.includes(orderNumber1)) {
            await page.locator('.btn.btn-primary').nth(i).click();
            break;
        }
    }

    //order summary page
    await page.locator('text= order summary ').waitFor();
    const getOrderNumber = await page.locator('div.-main').textContent();
    await expect(orderNumber).toContain(getOrderNumber);
    ;

})