var logger = require('./log');
describe('Protractor Children Management', function() {

  var factoryNewChild = element(by.css('title title-left'));
  var addAChild= element(by.id('new-child-btn'));
  var childsName=element(by.id('childs_name'));



  beforeEach(function() {
    browser.get('http://localhost:8100');
  });


//   //TEST 1
//     it('Open app on the Manage Children View', function() {
//         expect(browser.getTitle()).toEqual('Manage Children');
//         logger.log('info','');
//    });
//
// //TEST 2
//   it('No Child registered', function() {
//         expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
//         logger.log('info','');
//   });
//
// //TEST 3
//     it('Button Create disable when creating a new childs name field is empty', function() {
//         addAChild.click();
//         element(by.model("child.gender")).element(by.css("[value='Male']")).click();
//         var createButton = element(by.buttonText("Create"));
//         // expect(createButton.isEnabled()).toBe(false);
//         logger.log('info','Button Create disable when creating a new childs name field is empty');
//     });
//
// //TEST 4
//     it('Registrar niño con fecha posterior a la actual', function() {
//         addAChild.click();
//         var childsNameInput = element(by.id('childs_name'));
//         element(by.model("child.first_name")).sendKeys("Javier Vildozo");
//         element(by.model("child.gender")).element(by.css("[value='Male']")).click();
//         element(by.model("child.birthday")).sendKeys("06/22/2081");
//         element(by.buttonText("Create")).click();
//         this.popupContainsHeaderText = function (text) {
//             this.popupShouldExist();
//             expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Please insert a date prior to today");
//         };
//         logger.log('info','');
//     });
//
// //TEST 5
//     it('En el modal "New Child" se puede hace click en el button cancel', function() {
//         addAChild.click();
//         titleModalNewChild = element(by.id('head_New_Child'));
//         expect(titleModalNewChild.getText()).toEqual("New Child");
//         element(by.buttonText("Cancel")).click();
//         expect(browser.getTitle()).toEqual('Manage Children');
//         logger.log('info','');
//     });

//TEST 6
      it('Add first Child', function() {
        addAChild.click();
        var childsNameInput = element(by.id('childs_name'));
        element(by.model("child.first_name")).sendKeys("Javier Vildozo");
        element(by.model("child.birthday")).sendKeys("06/22/1981");
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        element(by.buttonText("Create")).click();
        browser.sleep(8000);
        
        element(by.repeater("child in childs")).getText().then(function (text) {
            expect(text).toMatch("Javier Vildozo");
            expect(text).toMatch("22/06/81");
            var mypic = element(by.css("img[src*='boy.png']"));
            //expect(mypic.isPresent()).toBe(true);
        });

        logger.log('info','');
    });

//TEST 5
    it('Edit a Child', function() {
        var moreButton= element(by.id('moreButton'));
        addAChild.click();
        browser.sleep(10000);
        logger.log('info','');
    });














// //TEST 7
//     it('Crear 2do niño ', function() {
//           addAChild.click();
//           var childsNameInput = element(by.id('childs_name'));
//           element(by.model("child.first_name")).sendKeys("Maria Coloma");
//           element(by.model("child.gender")).element(by.css("[value='Female']")).click();
//           element(by.model("child.birthday")).sendKeys("04/12/1980");
//           element(by.buttonText("Create")).click();
//
//         element(by.repeater("child in childs")).getText().then(function (text) {
//             // expect(text).toMatch("Javier Vildozo");
//             // expect(text).toMatch("22/06/81");
//
//
//         });
//
//           logger.log('info','');
//     });





});
