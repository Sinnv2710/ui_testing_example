export {};
// @ts-ignore
const {loginPage, homePage} = inject();
const demoAccount = require('../data/demoAccount.json');
const dataConstant = require('../helpers/configuration/utils/data');

Given(/As User, I am on login page of serviceX/, async () => {
    loginPage.verifyCurrentUrl();
    await loginPage.verifyCredifyLogo();
    await loginPage.verifyLoginForm();
    loginPage.verifyFooter()
});

When(/I redirect to login page/, async () => {
    await loginPage.verifyCurrentUrl();
});

When(/I can see Credify logo/, async () => {
    await loginPage.verifyCredifyLogo();
});

When(/I can see the login form/, async () => {
    await loginPage.verifyLoginForm();
});

When(/I can see footer in Login page/, async () => {
    await loginPage.verifyFooter();
});

When(/I fullfill a valid (.*) account into login form/, (roles) => {
    let isMarket = false;
    if (roles === "market") {
        isMarket = true;
    }
    const email = isMarket ? demoAccount.sendo.email : demoAccount.ocb.email;
    const pwd = isMarket ? demoAccount.sendo.password : demoAccount.ocb.password;
    loginPage.fullFillCredential(email, pwd);
});

When(/I click the login button/, () => {
    loginPage.clickLoginBtn();
});

When(/I fullfill a invalid account into login form/, () => {
    const email = dataConstant.generateRandomEmail();
    const pwd = dataConstant.generatePassword();
    loginPage.fullFillCredential(email,pwd);
});

Then(/I can see error message return/, () => {
    loginPage.seeErrorNotificationPopup();

});

When(/I fill invalid (.*) format/, (field) => {
    let isEmail = false;
    if (field === "email") {
        isEmail = true;
    }

    const email = 'ocbcredify';
    const pwd = '123456'

    isEmail ? loginPage.inputEmail(email) : loginPage.inputPwd(pwd);
})

Then(/I can see the validation error is displayed in (.*)/, (field) => {
    let isEmail = false;
    if (field === "email") {
        isEmail = true;
    }
    isEmail
        ? loginPage.validateErrorFied('password')
        : loginPage.validateErrorFied('email');
})

When(/I fullfill a Market account into login form/, () => {
    const email = demoAccount.sendo.email;
    const pwd = demoAccount.sendo.password;
    loginPage.fullFillCredential(email, pwd);
})

When(/I fullfill a Service Provider account into login form/, () => {
    const email = demoAccount.ocb.email;
    const pwd = demoAccount.ocb.password;
    loginPage.fullFillCredential(email, pwd);
})

When(/I check Remember me checkbox/, () => {
    loginPage.checkRememberMeCheckbox();
})
