var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

var addAChild= element(by.id('new-child-btn'));
var childsName=element(by.id('childs_name'));

describe('Protractor Children Management', function() {

    var addAChild = element(by.className("watchlist_menu button button-small button-clear button-positive"));
    var moreButton = element(by.className("col col-50 button button-small button-calm"));



    it('81 Button Create disable when creating a second child when name field is empty', function() {
        browser.get('http://localhost:8100');
        addAChild.click();
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('82 Cant Register a Second Child with tomorrows Date', function() {
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

    it('83 Cancel option when registeringa a "New Child" ', function() {
        browser.get('http://localhost:8100');
        addAChild.click();
        titleModalNewChild = element.all(by.tagName("h1"));
        expect(titleModalNewChild.getText()).toContain("New Child");
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);

        expect(browser.getTitle()).toEqual('Manage Children');
    });

    it('84 Create second child', function() {
        browser.get('http://localhost:8100');
        addAChild.click();
        var childsNameInput = element(by.id('childs_name'));
        element(by.model("child.first_name")).sendKeys("Javier Vildozo");
        element(by.model("child.birthday")).sendKeys("06/22/1981");
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        element(by.buttonText("Create")).click();
        browser.sleep(1000);

        element.all(by.repeater("child in childs")).getText().then(function (text) {
            expect(text[0]).toMatch("Javier Vildozo");
            expect(text[0]).toMatch("22/06/81");
        });

        var mypic = element(by.css("img[src*='boy.png']"));
        expect(mypic.isPresent()).toBe(true);
    });

    it('85 Edit a Child', function() {
        element.all(by.className("col col-50 button button-small button-calm")).then(function (items) {
            items[1].click();
        });
        element(by.buttonText("Edit child")).click();
        element(by.model("editableChild.first_name")).clear().sendKeys("Guido Javier Vildozo Mendez");
        element(by.buttonText("Save")).click();
        browser.sleep(2000);
        element.all(by.repeater("child in childs")).then(function (text) {
            expect(text[0].getText()).toContain("Guido Javier Vildozo Mendez");
            expect(text[0].getText()).toContain("22/06/81");
        });
    });


    it('86 When deleteing a Child you can cancel', function() {
        browser.get('http://localhost:8100');
        element.all(by.className("col col-50 button button-small button-calm")).then(function (items) {
            items[1].click();
            element(by.buttonText("Delete child")).click();
            browser.sleep(3000);
            browser.sleep(3000);
            element.all(by.buttonText("Cancel")).then(function (items) {
                browser.sleep(3000);
                items[0].click();
                browser.sleep(3000);
            });
            element.all(by.repeater("child in childs")).getText().then(function (text) {
                expect(text[0]).toContain("Javier Vildozo");
                expect(text[0]).toContain("22/06/81");
            });
        });
    });


    it('87 Delete second Child', function() {
        element.all(by.className("col col-50 button button-small button-calm")).then(function (items) {
            items[1].click();
        });
        element(by.buttonText("Delete child")).click();
        browser.sleep(2000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);
        element.all(by.repeater("child in childs")).getText().then(function (text) {
            expect(text[0]).not.toContain("Guido Javier Vildozo Mendez");
            expect(text[0]).toContain("Maria Coloma");
        });
    });



    it('88 Crear 2do niño ', function() {
        addAChild.click();
        var childsNameInput = element(by.id('childs_name'));
        element(by.model("child.first_name")).sendKeys("Marcos Brunet");
        element(by.model("child.birthday")).sendKeys("06/6/1984");
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        element(by.buttonText("Create")).click();
        browser.sleep(1000);

        element.all(by.repeater("child in childs")).getText().then(function (text) {
            expect(text[0]).toMatch("Marcos Brunet");
            expect(text[0]).toMatch("6/06/84");
        });

        var mypic = element(by.css("img[src*='boy.png']"));
        expect(mypic.isPresent()).toBe(true);
    });

});