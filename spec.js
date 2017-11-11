
describe('Protractor Children Management', function() {

  var factoryNewChild = element(by.css('title title-left'));
  var addAChild= element(by.id('new-child-btn'));
  var childsName=element(by.id('childs_name'));



  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  //       //TEST 1
  //   it('should have a title', function() {
  //    expect(browser.getTitle()).toEqual('Manage Children');
  //  });
  //
  //       //TEST 2
  // it('No Child registered', function() {
  //   expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
  // });

        //TEST 3

    // it('Open New Child modal', function() {
    //     addAChild.click();
    //     titleModalNewChild = element(by.id('head_New_Child'));
    //     expect(titleModalNewChild.getText()).toEqual("New Child");
    // });

        //TEST 4 FALLA ESTA PRUEBA
  // it('Add a Child', function() {
  //   addAChild.click();
  //   var childsNameInput = element(by.id('childs_name'));
  //   element(by.model("child.first_name")).sendKeys("Javier Vildozo");
  //   element(by.model("child.birthday")).sendKeys("06/22/1981");
  //   element(by.model("child.gender")).element(by.css("[value='Male']")).click();
  //   element(by.buttonText("Create")).click();
  //   browser.sleep(2000);
  //   element.all(by.id("nombreNino")).getText().then(function (text) {
  //       console.log(text);
  //   })
  //   browser.sleep(10000);
  // });

        //TEST 5
    // it('Cant create a child with the name field empty', function() {
    //     addAChild.click();
    //     var childsNameInput = element(by.id('childs_name'));
    //     element(by.model("child.gender")).element(by.css("[value='Male']")).click();
    //     expect(element(by.id('head_New_Child')).getText()).toEqual("New Child");
    //
    //     browser.sleep(1000);
    // });

    //     //TEST 6
    // it('Registrar niño con fecha posterior a la actual', function() {
    //   addAChild.click();
    //   var childsNameInput = element(by.id('childs_name'));
    //   element(by.model("child.first_name")).sendKeys("Javier Vildozo");
    //   element(by.model("child.gender")).element(by.css("[value='Male']")).click();
    //   element(by.model("child.birthday")).sendKeys("06/22/2081");
    //   element(by.buttonText("Create")).click();
    //     this.popupContainsHeaderText = function (text) {
    //         this.popupShouldExist();
    //         expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Please insert a date prior to today");
    //     };
    //   browser.sleep(4000);
    // });


        //TEST 7
    it('En el modal "New Child" se puede hace click en el button cancel', function() {
        addAChild.click();
        titleModalNewChild = element(by.id('head_New_Child'));
        expect(titleModalNewChild.getText()).toEqual("New Child");
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toEqual('Manage Children');
        browser.sleep(2000);
    });



});
