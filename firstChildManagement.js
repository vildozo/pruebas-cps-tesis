var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;
var variables = require('./variables.js');
var elemento = new variables.elementos();




describe('Children Management: First Child -->', function() {

    var addAChild = element(by.className("watchlist_menu button button-small button-clear button-positive"));
    var moreButton = element(by.className("col col-50 button button-small button-calm"));


    it('1 Open app and see the homepage', function () {
        funcionesAuxiliares.browserDisplay();
        funcionesAuxiliares.goToMainPage();

        expect(browser.getTitle()).toEqual('Manage Children');
    });

    it("2 When starting the app you should see message 'No Child registered' ", function () {
        element.all(by.tagName("b")).then(function (boldList){
            expect(boldList[1].getText()).toEqual("PLEASE REGISTER ONE ABOVE");
        });
    });



    describe('Test cases for registering a child-->', function () {
        it('3 When creating a new child and name field is empthy you the Create button is disabled', function () {
            element(by.className("watchlist_menu button button-small button-clear button-positive")).click();

            element(by.model("child.gender")).element(by.css("[value='Male']")).click();
            var createButton = element(by.buttonText("Create"));

            expect(createButton.isEnabled()).toBe(false);
        });

        it('4 Cant Register a Child with a birthdate with tomorrows Date', function () {
            element(by.model("child.first_name")).sendKeys("Posterior a Fecha actual");
            element(by.model("child.gender")).element(by.css("[value='Male']")).click();
            element(by.model("child.birthday")).sendKeys("06/22/2081");
            element(by.buttonText("Create")).click();
            this.popupContainsHeaderText = function (text) {
                this.popupShouldExist();

                expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Please insert a date prior to today");
                this.popup.element(by.buttonText("OK")).click();
            };
        });

        it('5 When registering a  "New Child" you should be able to cancel', function () {
            funcionesAuxiliares.goToMainPage();
            addAChild.click();
            titleModalNewChild = element.all(by.tagName("h1"));
            expect(titleModalNewChild.getText()).toContain("New Child");
            funcionesAuxiliares.waitForElementToBeClickable(element(by.buttonText("Cancel")),2000)

            expect(browser.getTitle()).toEqual('Manage Children');
        });

        it('6 Create first Child successfully', function () {
            funcionesAuxiliares.goToMainPage();

            addAChild.click();
            var childsNameInput = element(by.id('childs_name'));
            element(by.model("child.first_name")).sendKeys("Javier Vildozo");
            element(by.model("child.birthday")).sendKeys("06/22/1981");
            element(by.model("child.gender")).element(by.css("[value='Male']")).click();
            funcionesAuxiliares.waitForElementToBeClickable(element(by.buttonText("Create")),1000);
            browser.sleep(2000);
            element(by.repeater("child in childs")).getText().then(function (text) {
                expect(text).toMatch("Javier Vildozo");
                expect(text).toMatch("22/06/81");
            });
            var mypic = element(by.css("img[src*='boy.png']"));
            expect(mypic.isPresent()).toBe(true);
        });
    });

    describe('test cases when yo edit a child',function () {
        it('7 Edit a Child', function () {
            var moreButton = element(by.className("col col-50 button button-small button-calm"));
            moreButton.click();
            element(by.buttonText("Edit child")).click();
            element(by.model("editableChild.first_name")).clear().sendKeys("Lisa");
            element(by.model("editableChild.gender")).element(by.css("[value='Female']")).click();
            element(by.buttonText("Save")).click();
            element(by.repeater("child in childs")).getText().then(function (text) {

                expect(text).toMatch("Lisa");
            });
            var mypic = element(by.css("img[src*='girl.png']"));
            expect(mypic.isPresent()).toBe(true);
        });
    });

    describe('test cases when deleteing a child',function () {

        it('8 You can Cancel in windows in order to not delete a Child', function () {
            browser.get('http://localhost:8100');
            moreButton.click();
            element(by.buttonText("Delete child")).click();
            element(by.buttonText("Cancel")).click();
            element(by.repeater("child in childs")).getText().then(function (text) {

                expect(text).toMatch("Lisa");
            });
        });


        it('9 Delete a Child', function () {
            // var moreButton = element(by.id('moreButton'));
            moreButton.click();
            element(by.buttonText("Delete child")).click();
            browser.sleep(1000);
            element(by.buttonText("OK")).click();
            browser.sleep(1000);
            element.all(by.tagName("b")).then(function (boldList){
                expect(boldList[1].getText()).toEqual("PLEASE REGISTER ONE ABOVE");
            });
        });

    });


    it('10 Crear 2do niño ', function () {
        addAChild.click();
        var childsNameInput = element(by.id('childs_name'));
        element(by.model("child.first_name")).sendKeys("Maria Coloma");
        element(by.model("child.gender")).element(by.css("[value='Female']")).click();
        element(by.model("child.birthday")).sendKeys("04/12/1980");
        element(by.buttonText("Create")).click();
        browser.sleep(4000);

        element(by.repeater("child in childs")).getText().then(function (text) {

            expect(text).toMatch("Maria Coloma");
            expect(text).toMatch("12/04/80");
        });
        var mypic = element(by.css("img[src*='girl.png']"));
        expect(mypic.isPresent()).toBe(true);
//          logger.log('info','');
    });

});
