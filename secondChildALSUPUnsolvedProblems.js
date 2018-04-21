var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {

    it('94 El boton para crear unsolved problem estara inhabilitado mientras este vacio el campo de unsolved problems',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });

        var createButton = element(by.buttonText("Create"));
        expect(createButton.isEnabled()).toBe(false);
    });

    it('95 Crear Primer Unsolved Problem', function () {
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
    });


    it('96 al tener un unsolved problem creado el lagging skill correspondiente se marcara de forma automatica', function () {
        browser.get('http://localhost:8100');
        element.all(by.className("col col-50 button button-small button-balanced")).then(function (items) {
            items[0].click();
        });
        element(by.id("laggingSkillsID")).click();
        element.all(by.binding("laggingSkill.description")).then(function (items) {
            var marcado = items[1];
            browser.sleep(10000);
            expect(marcado.getCssValue('color')).toBe('rgba(56, 126, 245, 1)');
        });
    });

    it('97 se puede acceder directamente desde la vista de ALSUP a la vista de unsolved problems', function () {
        browser.get('http://localhost:8100');
        element.all(by.className("col col-50 button button-small button-balanced")).then(function (items) {
            items[0].click();
        });
        browser.sleep(2000);
        funcionesAuxiliares.waitForElementToBeClickable(element(by.id("unsolvedProblemsID")),1000);
        browser.sleep(1000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });



    it('98 Crear un segundo Unsolved Problem', function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 2");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items[1]).toBe("Unsolved Problem 2");
            expect(items.length).toBe(2);
        });
    });

    it('99 Se puede cancelar la creacion de unsolved problem    9', function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 3");
        element(by.buttonText("Cancel")).click();
        browser.sleep(3000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items.length).toBe(2);
            for(i=0;i<items.length;i++){
                expect(items[i]).not.toBe("Unsolved Problem 3");
            }
        });
    });



    it('100 Al editar no se puede dejar los campos de un unsolved problem sin llenar', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales = items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(3000);
            element.all(by.id("edit_button")).then(function (items) {
                browser.sleep(3000);
                items[1].click();
                browser.sleep(3000);
            });
        });
        browser.sleep(3000);
        element(by.model("editableUnsolvedProblem.description")).clear();
        browser.sleep(3000);
        expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
        browser.sleep(3000);

    });


    it('101 Editar un unsolved problem', function () {
        element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Unsolved Problem 2 EDITADO");
        element(by.buttonText("Save")).click();
        //browser.sleep(3000);

        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items[1]).toBe("Unsolved Problem 2 EDITADO");
        })

    });

    it('102 Al editar y  modificar datos de un unsolved problem cuando se cancela los datos modificados no deben persistir', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales= items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(1000);
            element.all(by.id("edit_button")).then(function (items) {
                items[1].click();
                browser.sleep(2000);
                element(by.buttonText("Cancel"));
                browser.sleep(3000);
                element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
                    expect(items[1]).toBe("Unsolved Problem 2 EDITADO");
                });
            });
        });
    });


    it('103 Al apretar el boton de cancelar en el mensaje de confirmacion para borrar, no borrara el unsolved problem', function () {
        browser.get('http://localhost:8100');
        element.all(by.className("col col-50 button button-small button-balanced")).then(function (items) {
            items[0].click();
        });
        browser.sleep(2000);
        funcionesAuxiliares.waitForElementToBeClickable(element(by.id("unsolvedProblemsID")),3000);
        browser.sleep(1000);
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(2000);
            element.all(by.id("delete_button")).then(function (items) {
                items[1].click();
            });
            browser.sleep(2000);
            element(by.buttonText("Cancel")).click();
        });
        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items[1]).toBe("Unsolved Problem 2 EDITADO");
        });
    });




    it('104 Al apretar el boton de Aceptar en el mensaje de confirmacion para borrar, borrara el unsolved problem', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(2000);
            element.all(by.id("delete_button")).then(function (items) {
                items[1].click();
            });
            browser.sleep(1000);
            element(by.buttonText("OK")).click();
            browser.sleep(3000);
        });
        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items.length).toBe(1);
            for(i=0;i<items.length;i++){
                expect(items[i]).not.toBe("Unsolved Problem 2 EDITADO");
            }
        });
    });






    it('105 Crear el tercer unsolved problem',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 3");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items[1]).toBe("Unsolved Problem 3");
            expect(items.length).toBe(2);
        });
    });

    it('106 desde la vista de unsolved problems no se puede pasar al step 2(Adult Concern) sin haber pasado el step 1(Empathy Step)',function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(2000);
            element.all(by.id("more_button")).then(function (items) {
                items[1].click();
            });
            browser.sleep(2000);
        });
        element(by.buttonText("Step 2: Define Adult's Concern")).click();
        browser.sleep(2000);
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();

            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("You have to finish previous steps to continue.");

        };

        browser.driver.switchTo().activeElement();
        browser.sleep(3000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);
    });




    it('107 desde la vista de unsolved problems no se puede pasar al step 3(Invitation Step) sin haber pasado el step 1(Empathy Step) y Step 2',function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(2000);
            element.all(by.id("more_button")).then(function (items) {
                items[1].click();
            });
            browser.sleep(2000);
        });
        element(by.buttonText("Step 2: Define Adult's Concern")).click();
        browser.sleep(2000);
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();

            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("You have to finish previous steps to continue.");
        };
    });




});