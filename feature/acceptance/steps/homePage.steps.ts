export {};
const {homePage} = inject();

Then(/I am on serviceX dashboard/, () => {
    homePage.amOnHomePage();
});
