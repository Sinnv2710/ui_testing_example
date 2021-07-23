const Helper = require('@codeceptjs/helper');
const {chromium } = require('playwright');
const {I} = inject();

class driver_helper extends Helper {
    checkIfRunningOnPlaywright() {
        return this.helpers.Playwright !== undefined;
    }

    async openIgconitoBrowser () {
        const browser = await chromium.launch();
        const page = await browser.newPage({locate: 'vi-VN'});
        return await page.goto('https://www.google.com/')
    }
}

export = driver_helper;
