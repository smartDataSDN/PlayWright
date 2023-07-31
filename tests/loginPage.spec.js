import { test, expect } from '@playwright/test'
import LoginPage from './Pages/LoginPage';

let page;
let login;
let locUserPass;

test.describe('Login page', () => {
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        login = new LoginPage(page);
        await login.gotoPage();
        await login.practiceLink();
        await page.waitForTimeout(2000);
        await login.loginPageLink();
        locUserPass = await login.locRturn();
    })

    test.afterEach(async () => {
        await page.close();
    })

    test('Verify the title.', async () => {
        let getTitle = await page.title();
        await expect(page).toHaveTitle(getTitle);

    })

    test('Verify a user is able to login with a valid username and valid password.', async () => {
        await login.login('student', 'Password123')
        await login.submit();
        await expect(await page.locator('.post-title')).toHaveText('Logged In Successfully');
        await expect(await page.locator('//*[@id="loop-container"]/div/article/div[2]/p[1]/strong')).toHaveText('Congratulations student. You successfully logged in!');
        await expect(await page.locator('//*[@id="loop-container"]/div/article/div[2]/div/div/div/a')).toBeVisible();
        await page.locator('//*[@id="loop-container"]/div/article/div[2]/div/div/div/a').click();
    })

    test('Verify the login page for both, when the field is blank and submit button is clicked.', async () => {
        await expect(await page.locator(locUserPass[0])).toBeEmpty();
        await expect(await page.locator(locUserPass[1])).toBeEmpty();
        await login.submit();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })

    test('Verify a user can not login with an invalid username and an invalid password.', async () => {
        await login.login('studentd', 'Password123f')
        await login.submit();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })

    test('Verify a user can not login with a invalid username and valid password.', async () => {
        await login.login('studentd', 'Password123')
        await login.submit();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })

    test('Verify a user can"\'t" login with a valid username and invalid password.', async () => {
        await login.login('student', 'Password12346')
        await login.submit();
        await expect(await page.locator('#error')).toBeVisible();
        await expect(await page.locator('#error')).toHaveText('Your password is invalid!');
    })

    test('Verify if a user can"\'t" login with a valid username and blank password.', async () => {
        await login.login('student', '')
        await expect(await page.locator(locUserPass[0])).toBeEmpty();
        await login.submit();
        await expect(await page.locator('#error')).toBeVisible();
        await expect(await page.locator('#error')).toHaveText('Your password is invalid!');
    })

    test('Verify if a user can"\'t" login with a blank username and valid password.', async () => {
        await login.login('', 'Password1234')
        await expect(await page.locator(locUserPass[1])).toBeEmpty();
        await login.submit();
        await expect(await page.locator('#error')).toBeVisible();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })

    test('Verify if a user can"\'t" login with a invalid username and blank password.', async () => {
        await login.login('students', '')
        await expect(await page.locator(locUserPass[0])).toBeEmpty();
        await login.submit();
        await expect(await page.locator('#error')).toBeVisible();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })

    test('Verify if a user can"\'t" login with a blank username and invalid password.', async () => {
        await login.login('', 'Password12345')
        await expect(await page.locator(locUserPass[1])).toBeEmpty();
        await login.submit();
        await expect(await page.locator('#error')).toBeVisible();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })

    test('Verify the both fields reset itself on click submit button, if enter invalid username and/or password.', async () => {
        await login.login('studentsf', 'Password12345')
        await page.waitForTimeout(2000)
        await login.submit();
        await expect(await page.locator(locUserPass[0])).toBeEmpty();
        await expect(await page.locator(locUserPass[1])).toBeEmpty();
        await expect(await page.locator('#error')).toBeVisible();
        await expect(await page.locator('#error')).toHaveText('Your username is invalid!');
    })
})

