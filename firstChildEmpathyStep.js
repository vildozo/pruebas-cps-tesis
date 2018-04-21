var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {
    it('30 En la opciones de un unsolved problem debe permitir ingresar al step 2(Empathy step)', function () {
        var botones_adicionales = element(by.binding("unsolvedProblem.description"));
        funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionales);
        browser.sleep(3000);
        element(by.id("more_button")).click();
        browser.sleep(2000);
        element(by.buttonText("Step 1: Empathy Step")).click();
        browser.sleep(2000);

        expect(browser.getTitle()).toEqual('Empathy Step');
        browser.sleep()
    });

    it('31 verificar mensaje de ayuda en empathy step', function () {

        expect(element(by.id("help_message")).getText()).toMatch("I've noticed that you've been having ");
        expect(element(by.id("help_message")).getText()).toContain("Unsolved Problem 2");
        expect(element(by.id("help_message")).getText()).toMatch(", what's up?");
    });

    describe('Test Cases when creating a new Child Concern', function () {
        it('32 No se puede crear un nuevo Child Concern con el campo child concern vacio', function () {
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
                boton[0].click();
                browser.sleep(3);
            });
            var createButton = element(by.buttonText("Create"));

            expect(createButton.isEnabled()).toBe(false);
        });

        it('33 Se puede cancelar la creacion de un nuevo child concern', function () {
            element(by.buttonText("Cancel")).click();
            browser.sleep(2000);
            expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
            //     browser.sleep(1000);
        });

        it('34 Crear un nuevo child concern', function () {
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
                boton[0].click();
            });
            element(by.tagName("textarea")).sendKeys("Child Concern 1");
            element(by.buttonText("Create")).click();
            browser.sleep(3000);

            expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");
        });
    });

    describe('Test Cases when editing a Child Concern', function () {
        it('35 Cuando se esta editando no se puede dejar el campo de Child concern vacio', function () {
            var botones_adicionales = element(by.binding("childsConcern.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionales);
            browser.sleep(3000);
            element(by.buttonText("No, keep drilling")).click();
            browser.sleep(3000);
            element(by.id("edit_button")).click();
            browser.sleep(3000);
            element(by.model("editableChildsConcern.description")).clear().sendKeys("");
            browser.sleep(3000);
            var createButton = element(by.buttonText("Save"));

            expect(createButton.isEnabled()).toBe(false);
        });

        it('36 Cuando se esta editando se debe poder cancelar y no persistira el cambio', function () {
            browser.get('http://localhost:8100/#/app/unsolvedProblem/show/3');
            var botones_adicionales = element(by.binding("childsConcern.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionales);
            browser.sleep(2000);
            element(by.buttonText("No, keep drilling")).click();
            element(by.id("edit_button")).click();
            browser.sleep(2000);
            element(by.model("editableChildsConcern.description")).clear().sendKeys("Vamos a CANCELAR");
            browser.sleep(2000);
            element(by.buttonText("Cancel")).click();
            browser.sleep(2000);

            expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");
            browser.sleep(2000);
        });


        it('37 Cuando se esta editando y en se guarda el cambio debe persistir', function () {
            var botones_adicionales = element(by.binding("childsConcern.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionales);
            browser.sleep(2000);

            element(by.buttonText("No, keep drilling")).click();
            element(by.id("edit_button")).click();
            browser.sleep(2000);
            element(by.model("editableChildsConcern.description")).clear().sendKeys("Child Concern 1 EDITADO");
            browser.sleep(2000);
            element(by.buttonText("Save")).click();

            expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1 EDITADO");
        });
    });

    describe('Test Cases when erasing a Child Concern',function () {
        it('38 Al borrar cuando se visualiza el mensaje de confirmacion, se debe poder cancelar la eliminacion de un Child Concern', function () {
            browser.get('http://localhost:8100/#/app/unsolvedProblem/show/3');
            var botones_adicionalesCC = element(by.binding("childsConcern.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionalesCC);
            element(by.buttonText("No, keep drilling")).click();
            element(by.id("delete_button")).click();
            browser.sleep(2000);
            element(by.buttonText("Cancel")).click();
            browser.sleep(2000);

            expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1 EDITADO");
            browser.sleep(2000);
        });

        it('39 Al confirmar el mensaje de borrar child concern y aceptar, el child concern sera borrado', function () {
            var botones_adicionales = element(by.binding("childsConcern.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionales);
            browser.sleep(2000);
            element(by.buttonText("No, keep drilling")).click();
            element(by.id("delete_button")).click();
            browser.sleep(2000);
            element(by.buttonText("OK")).click();
            browser.sleep(2000);

            expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
            browser.sleep(2000);
        });
    });


    it('40 Crear un nuevo child concern seguido por la creacion del segundo child concern', function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Child Concern 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Child Concern 2");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        element.all(by.binding("childsConcern.description")).then(function (items) {

            expect(items[0].getText()).toBe("Child Concern 1");
            expect(items[1].getText()).toBe("Child Concern 2");
        });
        browser.sleep(2000);
    });

    describe('Test cases when passing to Adult Concern', function () {
        it('41 Cuando se desea pasar al step 2(Adult concern), se visualizara un mensaje', function () {
            element.all(by.binding("childsConcern.description")).then(function (items) {
                var botones_adicionalesCC = items[0];
                funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionalesCC);
                browser.sleep(2000);
            });
            this.popupContainsHeaderText = function (text) {
                this.popupShouldExist();

                expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Have you drilled enough to get all your child's concerns?");
                element(by.buttonText("No, keep drilling")).click();
            };
            browser.sleep(2000);
        });


        it('42 Al visualizar mensaje si se desea pasar a Adults concern se puede rechazar', function () {
            browser.sleep(2000);
            element.all(by.binding("childsConcern.description")).then(function (childConcerns) {
                var botones_adicionalesCC = childConcerns[0];
                funcionesAuxiliares.desplazarElemento(-200, 0, botones_adicionalesCC);
                browser.sleep(2000);
            });

            element(by.buttonText("No, keep drilling")).click();
            browser.sleep(8000);
            //
            expect(browser.getTitle()).toEqual('Empathy Step');
        });
    });

});