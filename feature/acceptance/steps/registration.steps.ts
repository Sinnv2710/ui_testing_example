export = {}
const {I,footerPage, registrationPage} = inject();

Given(/I click to register new organization account/, async () => {
    await footerPage.clickRegisterCTA();
    // @ts-ignore
    await I.waitInUrl('/register')
});

Given(/I can see the register form is displayed/, async () => {
    await registrationPage.amOnRegistrationForm();
});

Given(/I full fill my information to register account/, async () => {
    await registrationPage.registerOrganizationAccount();
})

Given(/I click to submit button in Registration form/, async () => {
    await registrationPage.clickSubmitBtn();
})

Given(/I can see register successully popup is displayed./, async () => {
    await registrationPage.registerComplete();
})

Given(/I can see message to notify user need to wait Admin approve for registration./, async () => {
   await registrationPage.assertMessageNotifyUser();
});
