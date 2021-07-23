// @ts-ignore
const {I} = inject();
const homePageLocator = require('../data/selectors/homePage.json');
// @ts-ignore
const {expect} = require('chai');

const amOnHomePage = () => {
    const currentUrl = I.grabCurrentUrl();
    expect(currentUrl).to.equal(homePageLocator.url);
    I.seeCookie('@@credify_token');
}

const seeAccountTab = () => {
    const accountLocator = locate('//div').find('span').withText('Account');
    I.seeElement(accountLocator);
}

module.exports = {
    amOnHomePage
}
