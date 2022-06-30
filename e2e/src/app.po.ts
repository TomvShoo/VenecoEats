import { browser, by, element } from 'protractor';

export class AppPage {
<<<<<<< HEAD
  navigateTo(destination) {
    return browser.get(destination);
=======
  navigateTo() {
    return browser.get('/');
>>>>>>> origin/UB-14-mapa
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
