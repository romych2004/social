import { SemanticPage } from './app.po';

describe('semantic App', function() {
  let page: SemanticPage;

  beforeEach(() => {
    page = new SemanticPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
