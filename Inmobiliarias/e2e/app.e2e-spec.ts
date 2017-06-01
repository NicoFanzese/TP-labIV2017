import { InmobiliariasPage } from './app.po';

describe('inmobiliarias App', () => {
  let page: InmobiliariasPage;

  beforeEach(() => {
    page = new InmobiliariasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
