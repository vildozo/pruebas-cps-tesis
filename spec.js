
describe('Protractor Children Management', function() {
/*
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
*/
  var header0Childs = element(by.id('NoChildRegistered'));
  //var addAChild = element(by.css("watchlist_menu button button-small button-clear button-positive"));
  var factoryNewChild = element(by.css('title title-left'));
  var addAChild= element(by.id('new-child-btn'));



  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

    it('should have a title', function() {
     expect(browser.getTitle()).toEqual('Manage Children');
   });


  it('No Child registered', function() {
    expect(header0Childs.getText()).toEqual("PLEASE REGISTER ONE ABOVE");
  });


  it('Open New Child modal', function() {
    addAChild.click();
    titleModalNewChild= element(by.id('head_New_Child'));
   expect(titleModalNewChild.getText()).toEqual("New Child");
  });

  it('Add a Child', function() {
    addAChild.click();
    var childsNameInput = element(by.id('childs_name'));
    
  });



/*
  it('should add one and two', function() {
    firstNumber.sendKeys(1);
    secondNumber.sendKeys(2);

    goButton.click();

    expect(latestResult.getText()).toEqual('3');
  });

  it('should add four and six', function() {
    firstNumber.sendKeys(9);
    secondNumber.sendKeys(1);
    goButton.click();
    expect(latestResult.getText()).toEqual('10');
  });*/
});
