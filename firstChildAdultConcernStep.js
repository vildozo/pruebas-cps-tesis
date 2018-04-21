var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {

    it('43 Pasar de empathy step a adults concerns', function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (childConcerns) {
            var botones_adicionalesCC = childConcerns[0];
            funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionalesCC);
            browser.sleep(2000);
        });
        element(by.buttonText("Yes, I'm sure")).click();
        browser.sleep(8000);

        expect(browser.getTitle()).toEqual("Define Adult's Concern");
    });

    describe('Test cases when creating a new adult concern',function () {
        it('44 No se puede crear un adult concern con los campos vacios', function () {
            browser.sleep(2000);
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (items) {
                items[0].click();
            });
            var createButton = element(by.buttonText("Create"));

            expect(createButton.isEnabled()).toBe(false);
            browser.sleep(3000);
        });


        it('45 Cuando se esta creando un adult concern, se puede cancelar', function () {
            element(by.buttonText("Cancel")).click();
            browser.sleep(3000);

            expect(browser.getTitle()).toEqual("Define Adult's Concern");
        });


        it('46 Crear un adult concern', function () {
            // browser.sleep(2000);
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
                boton[0].click();
            });
            browser.sleep(2000);
            element(by.tagName("textarea")).sendKeys("Adult Concern First");
            element(by.buttonText("Create")).click();
            browser.sleep(3000);

            expect(element(by.binding("adultsConcern.description")).getText()).toBe("Adult Concern First");
        });
    });

    it('47 Crear un segundo adult concern', function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Adult Concern Second");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        element.all(by.binding("adultsConcern.description")).then(function (item) {

            expect(item[1].getText().getText()).toBe("Adult Concern Second");
        });

    });
});