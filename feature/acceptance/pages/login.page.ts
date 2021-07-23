// @ts-ignore
const {I} = inject();
// @ts-ignore
const {expect} = require('chai');
const loginLocator = require('../data/selectors/loginPage.json');

const verifyCurrentUrl = () => {
    const currentUrl = I.grabCurrentUrl();
    expect(currentUrl).to.equal(loginLocator.url);
}

const verifyCredifyLogo = async () => {
    I.seeElement(loginLocator.credifyLogo.logo);
    const srcUrl = await (I.grabAttributeFrom(loginLocator.credifyLogo.img, 'src'));
    expect(srcUrl).to.contain('/credify-logo-icon.png');
    const logoText = (await (I.grabTextFrom(loginLocator.credifyLogo.text))).toLowerCase()
    expect(logoText).to.equal('organization');
}

const verifyLoginForm = async () => {
    I.seeElement({xpath: loginLocator.loginForm.form});
    I.seeElement({xpath: loginLocator.loginForm.formTitle});
    const title = (await I.grabTextFrom({xpath: loginLocator.loginForm.formTitle})).toLowerCase();
    expect(title).to.equal(loginLocator.loginForm.titleExpected.toLowerCase());
    I.seeElement(loginLocator.loginForm.emailField);
    I.seeElement(loginLocator.loginForm.pwdField);
    I.seeElement(loginLocator.loginForm.loginButton);
    I.seeElement(loginLocator.loginForm.rememberCheckBox.locator);
    const rememberText = await I.grabTextFrom(loginLocator.loginForm.rememberCheckBox.text);
    expect(rememberText.toLowerCase()).to.equal(loginLocator.loginForm.rememberCheckBox.textExpected.toLowerCase());
}

const verifyFooter = () => {
    I.seeElement(loginLocator.footer.locator);
    I.seeElement(loginLocator.footer.registerCTA);
    I.seeElement(loginLocator.footer.languageSelectionDropdown);
    I.seeElement(loginLocator.footer.termsCTA);
    I.seeElement(loginLocator.footer.policyCTA);
}

const inputEmail = (email: string) => {
    // @ts-ignore
    I.seeElement(loginLocator.loginForm.emailField)
        ? I.fillField(loginLocator.loginForm.emailField, email)
        : I.say('Cannot see email field', 'red');
    I.seeInField(loginLocator.loginForm.emailField, email);
}

const inputPwd = (password: string) => {
    // @ts-ignore
    I.seeElement(loginLocator.loginForm.pwdField)
        ? I.fillField(loginLocator.loginForm.pwdField, password)
        : I.say('Cannot see password field', 'red');
    I.seeInField(loginLocator.loginForm.pwdField, password);
}

const clickLoginBtn = () => {
    // @ts-ignore
    I.seeElement(loginLocator.loginForm.loginButton)
        ? I.click(loginLocator.loginForm.loginButton)
        : I.say('Cannot see login button', 'red');
    // @ts-ignore
    // I.waitForNavigation()
}

const fullFillCredential = (email: string, password: string) => {
    inputEmail(email);
    inputPwd(password);
}

const seeErrorNotificationPopup = () => {
    I.waitForText('Either email address or password is incorrect')
    // @ts-ignore
    I.see('Either email address or password is incorrect')
        ? I.say('The Error Notification Popup is displayed correctly')
        : I.say('The Error Notification Popup not found!')
}

const validateErrorFied = (field: string) => {
    const errorStyleObject = {style: "color: rgb(0, 0, 170); background-color: rgb(255, 255, 238);"}
    if (field === 'email') {
        locate(loginLocator.loginForm.emailField).withAttr(errorStyleObject);
    } else {
        locate(loginLocator.loginForm.pwdField).withAttr(errorStyleObject);
    }
}

const checkRememberMeCheckbox = () => {
    I.checkOption(loginLocator.loginForm.rememberCheckBox.locator);
    // @ts-ignore
    I.seeCheckboxIsChecked({css: "input[type='checkbox']"})
        ? I.say("The checkbox is checked")
        : I.say("The checkbox is not found")
}
module.exports = {
    verifyCurrentUrl,
    verifyCredifyLogo,
    verifyLoginForm,
    verifyFooter,
    clickLoginBtn,
    fullFillCredential,
    seeErrorNotificationPopup,
    inputEmail,
    inputPwd,
    validateErrorFied,
    checkRememberMeCheckbox
}

