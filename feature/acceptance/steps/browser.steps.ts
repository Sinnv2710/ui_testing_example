export = {};
const {I} = inject();

Given(/I use (.*) in my web browser/, async (table) => {
    console.log(table)
    await I.wait(1000)
});

When(/I go to another url/, () => {
    I.wait(3);
    I.amOnPage('https://www.google.com/')
});

When(/I use back button on browser/, () => {
    I.wait(3);
    // @ts-ignore
    I.executeScript(() => window.history.back());

})
