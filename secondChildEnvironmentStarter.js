var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;
var variables = require('./variables.js');
var elemento = new variables.elementos();

describe("Use when wanting to only test second Child", function () {


    var addAChild = element(by.id('new-child-btn'));


    it('1 Open app on the Manage Children View', function () {
        funcionesAuxiliares.browserDisplay();
        browser.get('http://localhost:8100');
        expect(browser.getTitle()).toEqual('Manage Children');

    });

    it('10 Crear 2do niño ', function () {
        browser.sleep(15000);
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