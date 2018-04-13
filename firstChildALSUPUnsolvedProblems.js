var funciones = require('./funciones.js');
var elementos = require('./variables.js');
var funcionesAuxiliares = new funciones.auxiliares;
var elementoACapturar = new elementos.elementos();

describe('testing unsolved problems of ALSUP ',function () {
    it('15 debe mostrar el nombre del child en la vista de unsolved problems',function () {
        element(by.binding("activeChild.first_name")).getText().then(function (text) {

            expect(text).toBe("Maria Coloma");
        });
        browser.sleep(3000);

    });

    it('16 se puede acceder directamente a la vista de unsolved problems desde la vista de ALSUP', function () {
        // browser.get('http://localhost:8100');
        // element(by.id("child_selected")).click();
        // funcionesAuxiliares.waitForElementToBeClickable(element(by.id("unsolvedProblemsID")),1000);
        // browser.sleep(1000);



        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });

//     describe("Test cases for registering an unsolved problem", function () {
//         it('17 El boton para crear unsolved problem estara inhabilitado mientras este vacio el campo de unsolved problems',function () {
//             element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
//                 boton[0].click();
//             });
//
//             var createButton = element(by.buttonText("Create"));
//             expect(createButton.isEnabled()).toBe(false);
//         });
//
//
//
//
//         it('18 Crear un nuevo Unsolved Problem', function () {
//             element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
//             element(by.buttonText("Create")).click();
//             browser.sleep(3000);
//
//             expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
//         });
//
//         it('19 Se puede cancelar la creacion de unsolved problem    9', function () {
//             element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
//                 boton[0].click();
//             });
//             element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
//             element(by.buttonText("Cancel")).click();
//             browser.sleep(3000);
//
//             expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
//         });
//
//     });
//
//     it('20 al tener un unsolved problem creado el lagging skill correspondiente se marcara de forma automatica', function () {
//         browser.get('http://localhost:8100');
//         element(by.id("child_selected")).click();
//         element(by.id("laggingSkillsID")).click();
//         element.all(by.binding("laggingSkill.description")).then(function (items) {
//             var marcado = items[0];
//             expect(marcado.getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
//         });
//     });
//
// //
//
//     it('21 Al editar no se puede dejar los campos de un unsolved problem sin llenar', function () {
//         element.all(by.binding("laggingSkill.description")).then(function (items) {
//             var marcado = items[0].click();
//         });
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
//         element(by.id("edit_button")).click();
//         element(by.model("editableUnsolvedProblem.description")).clear();
//
//         expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
//         //browser.sleep(3000);
//     });
//
//
//     it('22 Editar un unsolved problem', function () {
//         element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Unsolved Problem 1 EDITADO");
//         element(by.buttonText("Save")).click();
//         //browser.sleep(3000);
//
//         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
//     });
//
//     it('23 Al editar y  modificar datos de un unsolved problem cuando se cancela los datos modificados no deben persistir', function () {
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
//         element(by.id("edit_button")).click();
//         element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Probando Boton Cancelar");
//         element(by.buttonText("Cancel")).click();
//
//         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
//     });
// //
// //
//
//     it('24 Al apretar el boton de cancelar en el mensaje de confirmacion para borrar, no borrara el unsolved problem', function () {
//         browser.get('http://localhost:8100');
//         element(by.id("child_selected")).click();
//         // browser.sleep(1000);
//         element(by.id("laggingSkillsID")).click();
//         element.all(by.binding("laggingSkill.description")).then(function(items){
//             items[0].click();
//         });
//         browser.sleep(1000);
//         //
//         // var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         // desplazarElemento(-200,0,botones_adicionales);
//         // // browser.sleep(1000);
//         // element(by.id("delete_button")).click();
//         // // browser.sleep(1000);
//         // element(by.buttonText("Cancel")).click();
//         // // browser.sleep(3000);
//         //
//         // expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
//     });


    // it('25 Al apretar el boton de Aceptar en el mensaje de confirmacion para borrar, borrara el unsolved problem', function () {
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
    //     //browser.sleep(3000);
    //     element(by.id("delete_button")).click();
    //     //browser.sleep(4000);
    //     element(by.buttonText("OK")).click();
    //     //browser.sleep(3000);
    //     element(by.id("no_unsolved_problems_message")).getText().then(function (text) {
    //
    //         expect(text).toBe("No unsolved problems registered. Please register one above.");
    //     });
    // });
    //
    // it('26 Crear un unsolved problem y posteriormente crear un segundo unsolved Problem',function () {
    //     element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (botones) {
    //         botones[0].click();
    //     });
    //     element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
    //     element(by.buttonText("Create")).click();
    //     expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
    //     element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (botones) {
    //         botones[0].click();
    //     });
    //     element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 2");
    //     element(by.buttonText("Create")).click();
    //     browser.sleep(2000);
    //     element.all(by.binding("unsolvedProblem.description")).then(function (items) {
    //         items[1].getText().then(function (text) {
    //
    //             expect(text).toBe("Unsolved Problem 2");
    //         });
    //     });
    // });
    //
    // it('27 Borrar un unsolved problem', function () {
    //     element.all(by.binding("unsolvedProblem.description")).then(function (items) {
    //         var botones_adicionales=items[0];
    //         funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
    //         browser.sleep(1);
    //         element.all(by.id("delete_button")).then(function (items) {
    //             items[0].click();
    //         });
    //         browser.sleep(10);
    //         element(by.buttonText("OK")).click();
    //         browser.sleep(1000);
    //
    //         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 2");
    //     });
    // });
    //
    // it('28 desde la vista de unsolved problems no se puede pasar al step 2(Adult Concern) sin haber pasado el step 1(Empathy Step)',function () {
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
    //     browser.sleep(3000);
    //     element(by.id("more_button")).click();
    //     browser.sleep(4000);
    //     element(by.buttonText("Step 2: Define Adult's Concern")).click();
    //     browser.sleep(2000);
    //     this.popupContainsHeaderText = function (text) {
    //         this.popupShouldExist();
    //
    //         expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("You have to finish previous steps to continue.");
    //
    //     };
    //
    //     browser.driver.switchTo().activeElement();
    //     browser.sleep(3000);
    //     element(by.buttonText("OK")).click();
    //     browser.sleep(2000);
    // });
    //
    //
    // it('29 desde la vista de unsolved problems no se puede pasar al step 3(Invitation Step) sin haber pasado el step 1(Empathy Step) y Step 2',function () {
    //     browser.get('http://localhost:8100');
    //     element(by.id("child_selected")).click();
    //     browser.sleep(2000);
    //     element(by.id("laggingSkillsID")).click();
    //     // element(by.binding("laggingSkill.description")).click();
    //     element.all(by.binding("laggingSkill.description")).then(function (items) {
    //         items[0].click();
    //     });
    //
    //
    //     browser.sleep(2000);
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     funcionesAuxiliares.desplazarElemento(-200,0,botones_adicionales);
    //     browser.sleep(2000);
    //     element(by.id("more_button")).click();
    //     browser.sleep(2000);
    //     element(by.buttonText("Step 3: Invitation Step")).click();
    //     browser.sleep(2000);
    //     this.popupContainsHeaderText = function (text) {
    //         this.popupShouldExist();
    //
    //         expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("You have to finish previous steps to continue.");
    //     };
    //     //
    //
    // });
});