const { expect } = require('@playwright/test');
class LoginPage {

    constructor(page) {
        this.username = page.locator('input#userEmail');
        this.password = page.locator("input[formcontrolname='userPassword']");
        this.loginbutton = page.locator('input.login-btn');
        this.toast =  page.locator('div#toast-container')

    }

    async login(email,password) {
        await this.username.fill(email);
        await this.password.fill(password);
        await this.loginbutton.click();
        const toast = await this.toast;
        const toatLoginMessage = await toast.textContent();
        await expect(toatLoginMessage).toEqual(' Login Successfully ')
    }

}
module.exports = { LoginPage }