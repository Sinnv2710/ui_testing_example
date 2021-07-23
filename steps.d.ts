/// <reference types='codeceptjs' />
type footerPage = typeof import('./feature/acceptance/pages/footer.page');
type homePage = typeof import('./feature/acceptance/pages/home.page');
type loginPage = typeof import('./feature/acceptance/pages/login.page');
type registrationPage = typeof import('./feature/acceptance/pages/registration.page');
type page = typeof import('codeceptjs-configure/lib/helpers/global.page.js');
type driver_helper = import('./feature/acceptance/helpers/driver.helper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, footerPage: footerPage, homePage: homePage, loginPage: loginPage, registrationPage: registrationPage, page: page }
  interface Methods extends REST, Playwright, driver_helper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
