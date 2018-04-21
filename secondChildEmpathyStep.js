var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {



    it('108 En la opciones de un unsolved problem debe permitir ingresar al step 2(Empathy step)', function () {
        browser.driver.switchTo().activeElement();
        browser.sleep(3000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);

        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales =items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(3000);
            element.all(by.id("more_button")).then(function (items) {
                items[1].click();
            });
        });
        browser.sleep(2000);
        element(by.buttonText("Step 1: Empathy Step")).click();
        browser.sleep(2000);

        expect(browser.getTitle()).toEqual('Empathy Step');
        browser.sleep()
    });

    it('109 probar mensaje de ayuda en empathy step',function () {

        expect(element(by.id("help_message")).getText()).toMatch("I've noticed that you've been having ");
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            expect(items[0].getText()).toContain("Unsolved Problem 3");
        });
        expect(element(by.id("help_message")).getText()).toMatch(", what's up?");
    });

    it('110 No se puede crear un nuevo Child Concern con el campo child concern vacio',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
            browser.sleep(3000);
        });
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('111 Se puede cancelar la creacion de un nuevo child concern',function () {
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);
        expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
        //     browser.sleep(1000);
    });

    it('112 Crear un nuevo child concern',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Child Concern 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");
    });

    it('113 Crear un segundo child concern',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Child Concern 2");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items[1].getText()).toBe("Child Concern 2");
        })
    });


    it('114 Cuando se esta editando no se puede dejar el campo de Child concern vacio',function () {
        // var botones_adicionales=element(by.binding("childsConcern.description"));
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionales = items[1];
            funcionesAuxiliares.desplazarElemento(-75,0,botones_adicionales);
            browser.sleep(2000);
        });

        browser.sleep(3000);
        element(by.buttonText("No, keep drilling")).click();
        browser.sleep(12000);
        element.all(by.id("edit_button")).then(function(items) {
            items[1].click();
        });
        browser.sleep(2000);
        element(by.model("editableChildsConcern.description")).clear().sendKeys("");
        browser.sleep(2000);
        var createButton = element(by.buttonText("Save"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('115 Cuando se esta editando se debe poder cancelar y no persistira el cambio',function () {
        element.all(by.buttonText("Cancel")).then(function (items) {
            items[1].click();
        });
        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items[1].getText()).toBe("Child Concern 2");
        });
        browser.sleep(2000);
    });


    it('116 Cuando se esta editando y en se guarda el cambio debe persistir',function () {

        // var botones_adicionales=element(by.binding("childsConcern.description"));
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionales = items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
        });

        browser.sleep(2000);

        element(by.buttonText("No, keep drilling")).click();
        element.all(by.id("edit_button")).then(function (items) {
            items[1].click();
        });
        browser.sleep(2000);
        element(by.model("editableChildsConcern.description")).clear().sendKeys("Child Concern 2 EDITADO");
        browser.sleep(2000);
        element(by.buttonText("Save")).click();

        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items[1].getText()).toBe("Child Concern 2 EDITADO");
        });
    });
//
    it('117 Al borrar cuando se visualiza el mensaje de confirmacion, se debe poder cancelar la eliminacion de un Child Concern',function () {
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionalesCC = items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionalesCC);
        });
        browser.sleep(3000);
        element.all(by.buttonText("No, keep drilling")).then(function (items) {
            items[0].click()
            browser.sleep(2000);
        });
        element.all(by.id("delete_button")).then(function (items) {
            items[1].click();
        });
        browser.sleep(2000);
        element.all(by.buttonText("Cancel")).then(function (items) {
            items[2].click();
        });
        browser.sleep(2000);

        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items[1].getText()).toBe("Child Concern 2 EDITADO");
        });
    });

    it('118 Al confirmar el mensaje de borrar child concern y aceptar, el child concern sera borrado', function () {
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionales=items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
        });

        browser.sleep(4000);
        element(by.buttonText("No, keep drilling")).click();
        element.all(by.id("delete_button")).then(function (items) {
            items[1].click();
        });
        // browser.sleep(2000);
        element(by.buttonText("OK")).click();
        browser.sleep(1000);
        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toBe("Child Concern 1");
        });
        browser.sleep(2000);
    });


    it('119 se puede crear un nuevo child concern despues de haber borrado un child concern',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.model("childsConcern.description")).sendKeys("Child Concern 3");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items[0].getText()).toBe("Child Concern 1");
            expect(items[1].getText()).toBe("Child Concern 3");
            expect(items.length).toBe(2);
        })
        browser.sleep(2000);
    });


    it('120 Cuando se desea pasar al step 2(Adult concern), se visualizara un mensaje',function () {
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionalesCC =items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();

            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Have you drilled enough to get all your child's concerns?");
            element(by.buttonText("No, keep drilling")).click();
        };
        browser.sleep(2000);
    });

    it('121 Al visualizar mensaje si se desea pasar a Adults concern se puede cancelar',function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionalesCC=items[1];
            funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionalesCC);
        });
        browser.sleep(3000);
        element(by.buttonText("No, keep drilling")).click();
        browser.sleep(8000);

        expect(browser.getTitle()).toEqual('Empathy Step');
    });


});