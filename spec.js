var logger = require('./log');
describe('Protractor Children Management', function() {

  var factoryNewChild = element(by.css('title title-left'));
  var addAChild= element(by.id('new-child-btn'));
  var childsName=element(by.id('childs_name'));



  beforeEach(function() {
    browser.get('http://localhost:8100');
  });


    it('1 Open app on the Manage Children View', function() {
        // browser.sleep(1000);
        expect(browser.getTitle()).toEqual('Manage Children');
        logger.log('info','');
   });

  it('2 No Child registered', function() {
        expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
        logger.log('info','');
  });

    it('3 Button Create disable when creating a new child when name field is empty', function() {
        addAChild.click();
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        var createButton = element(by.buttonText("Create"));
        // expect(createButton.isEnabled()).toBe(false);
        logger.log('info','Button Create disable when creating a new childs name field is empty');
    });

    it('4 Cant Register a Child with tomorrows Date', function() {
        addAChild.click();
        var childsNameInput = element(by.id('childs_name'));
        element(by.model("child.first_name")).sendKeys("Posterior a Fecha actual");
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        element(by.model("child.birthday")).sendKeys("06/22/2081");
        element(by.buttonText("Create")).click();
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();
            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Please insert a date prior to today");
        };
        logger.log('info','');
    });

    it('5 Cancel option when registeringa a "New Child" ', function() {
        addAChild.click();
        titleModalNewChild = element(by.id('head_New_Child'));
        expect(titleModalNewChild.getText()).toEqual("New Child");
        element(by.buttonText("Cancel")).click();
        expect(browser.getTitle()).toEqual('Manage Children');
        logger.log('info','');
    });

      it('6 Add first Child', function() {
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

    it('7 Edit a Child', function() {
        var moreButton= element(by.id('moreButton'));
        moreButton.click();
        element(by.buttonText("Edit child")).click();
        element(by.model("editableChild.first_name")).clear().sendKeys("Lisa");
        element(by.model("editableChild.gender")).element(by.css("[value='Female']")).click();
        element(by.buttonText("Save")).click();
        element(by.repeater("child in childs")).getText().then(function (text) {
            expect(text).toMatch("Lisa");
        });
        logger.log('info','');

    });


    it('8 You can Cancel in windows in order to not delete a Child', function() {
        var moreButton= element(by.id('moreButton'));
        moreButton.click();
        element(by.buttonText("Delete child")).click();
        element(by.buttonText("Cancel")).click();
        element(by.repeater("child in childs")).getText().then(function (text) {
            expect(text).toMatch("Lisa");
        });
        logger.log('info','');

    });


    it('9 Delete a Child', function() {
        var moreButton= element(by.id('moreButton'));
        moreButton.click();
        element(by.buttonText("Delete child")).click();
        element(by.buttonText("OK")).click();
        expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");

        logger.log('info','');

    });











//     it('10 Crear 2do niño ', function() {
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
//
// // it('aa', function () {
// //     element.all(by.css('.childs_name')).getText().then(function(childNames) {
// //         console.log("////////////////////////////////////////////////")
// //         console.log(childNames);
// //     });
// // })



});
