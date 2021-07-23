const enLang = require('../data/lang/eng.json')
const registrationLocator = require('../data/selectors/registration.json')
// @ts-ignore
const {I} = inject();
const information = require('../helpers/configuration/utils/data').generateOrganizationInfo();

const amOnRegistrationForm = () => {
    I.see(enLang.registrationPage.RegisterTitle);
    I.see(enLang.registrationPage.DescriptionInputingEmail);
    I.see(enLang.registrationPage.TitleInputingEmail);
    I.see(enLang.registrationPage.termPolicyCTA)
}

const inputEmailField = (emailAddress: string) => {
    // @ts-ignore
    I.seeElement(registrationLocator.emailField)
        ? I.fillField(registrationLocator.emailField, emailAddress)
        : I.say('Cannot see email field', 'red');
    I.seeInField(registrationLocator.emailField, emailAddress);
}

const inputOrganizationName = (name: string) => {
    // @ts-ignore
    I.see('Organization name')
        ? I.fillField(registrationLocator.name, name)
        : I.say('Cannot see organization name field', 'red');
    I.seeInField(registrationLocator.name, name);
}

const inputDescription = (des: string) => {
    // @ts-ignore
    I.see('Organization name')
        ? I.fillField(registrationLocator.des, des)
        : I.say('Cannot see organization description field', 'red');
    I.seeInField(registrationLocator.des, des);
}

const inputAppUrl = (appUrl: string) => {
    // @ts-ignore
    I.see('Organization name')
        ? I.fillField(registrationLocator.appUrl, appUrl)
        : I.say('Cannot see organization service URL field', 'red');
    I.seeInField(registrationLocator.appUrl, appUrl);
}

const inputRegistrationDate = (date: string) => {
    // @ts-ignore
    I.see('Organization name')
        ? I.fillField(registrationLocator.registrationDate, date)
        : I.say('Cannot see organization registration date field', 'red');
    I.seeInField(registrationLocator.registrationDate, date);
}

const inputPassword = (pwd: string) => {
    // @ts-ignore
    const isSee = I.see('Set up password');
    // @ts-ignore
    if (isSee) {
        I.fillField(registrationLocator.pwd, pwd)
        I.fillField(registrationLocator.confirmPwd, pwd)
    } else {
        I.say('Cannot see password field', 'red');
    }
}

const clickSubmitBtn = () => {
    return I.click('button.ant-btn-primary');
}


const registerOrganizationAccount = () => {
    inputEmailField(information.email);
    I.dontSeeCheckboxIsChecked('Accept the terms of use and privacy policy');
    I.checkOption('Accept the terms of use and privacy policy');
    I.seeCheckboxIsChecked('Accept the terms of use and privacy policy');
    clickSubmitBtn();
    inputOrganizationName(information.name);
    inputDescription(information.description);
    inputAppUrl(information.appUrl);
    inputRegistrationDate(information.registrationDate);
    clickSubmitBtn();
    inputPassword('Credify@123');
}

const registerComplete = () => {
    I.see(enLang.registrationPage.complete);
    I.see(enLang.registrationPage.goToLoginPageBtn);
}

const assertMessageNotifyUser = () => {
    I.see(enLang.registrationPage.completeMessage);
}

module.exports = {
    amOnRegistrationForm,
    registerOrganizationAccount,
    registerComplete,
    assertMessageNotifyUser,
    clickSubmitBtn
}
