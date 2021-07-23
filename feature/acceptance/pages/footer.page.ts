const footer = require('../data/selectors/footer.json');
// @ts-ignore
const {I} = inject();

const clickRegisterCTA = () => {
    I.seeElement(footer.registerCTA);
    I.click(footer.registerCTA);
}

module.exports = {
    clickRegisterCTA
}
