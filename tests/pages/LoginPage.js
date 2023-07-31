class LoginPage {

    constructor(page) {
        this.page= page;
        this.getPracticeLink = "#menu-item-20",
        this.getLoginPageLink = "Test Login Page",
        this.getUsernameLoc = "#username",
        this.getPasswordLoc = "#password",
        this.getSubmitLoc = "#submit"
    }

    async gotoPage() {
        await this.page.goto('/')
    }

    async practiceLink() {
        await this.page.locator(this.getPracticeLink).click();
    }

    async loginPageLink() {
        await this.page.getByText(this.getLoginPageLink).click();
    }

    async login(user, pass) {
        await this.page.locator(this.getUsernameLoc).type(user)
        await this.page.locator(this.getPasswordLoc).type(pass);
    }

    async submit() {
        await this.page.locator(this.getSubmitLoc).click();
    }

    async locRturn() {
        return [this.getPasswordLoc, this.getUsernameLoc];
    }
}

export default LoginPage;