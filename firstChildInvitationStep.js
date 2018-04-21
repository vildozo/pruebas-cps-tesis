var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {


    describe('test cases when entering to Invitation Step', function () {
        it('48 pasar de adult concern a invitation step Se debe visualizar el titulo Invitation Step', function () {
            browser.sleep(2000);

            // var ac=element(by.binding("adultsConcern.description"));
            // funcionesAuxiliares.desplazarElemento(-200,0,ac);
            element.all(by.binding("adultsConcern.description")).then(function (adultConcern) {
                var ac = adultConcern[0];
                funcionesAuxiliares.desplazarElemento(-200, 0, ac);
            });
            expect(browser.getTitle()).toBe("Invitation Step");
        });

        it("49 en el invitation step se tiene que visualizar el unsolved problema", function () {
            expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 2");
        });

        it('50 Visualizar child concern con mayor prioridad y Primer Adult adult concern', function () {
            expect(element(by.binding("childsConcerns[0].description")).getText()).toBe("Child Concern 1");
            expect(element(by.binding("adultsConcerns[0].description")).getText()).toBe("Adult Concern First");
        });


        it('51 Expandir Child Concerns', function () {
            element(by.id("expand_childs_concern")).click();
            funcionesAuxiliares.sleep(2);
            element.all(by.binding("childConcern.description")).then(function (items) {
                expect(items[0].getText()).toBe("Child Concern 1");
                expect(items[1].getText()).toBe("Child Concern 2");
                expect(items.length).toEqual(2);
            });
            funcionesAuxiliares.sleep(2);
        });

        it('52 Expandir Adult Concerns', function () {
            element(by.id("expand_adults_concern")).click();
            funcionesAuxiliares.sleep(2);
            element.all(by.binding("adultConcern.description")).then(function (items) {
                expect(items[0].getText()).toBe("Adult Concern First");
                expect(items[1].getText()).toBe("Adult Concern Second");
                expect(items.length).toEqual(2);
            });
            funcionesAuxiliares.sleep(2);
        });

        it('53 Contraer Child Concerns', function () {
            element(by.id("expand_childs_concern")).click();
            funcionesAuxiliares.sleep(2);
            expect(element(by.binding("childsConcerns[0].description")).getText()).toBe("Child Concern 1");
            funcionesAuxiliares.sleep(2);
        });

        it('54 Contraer Adult Concerns', function () {
            element(by.id("expand_adults_concern")).click();
            funcionesAuxiliares.sleep(2);
            expect(element(by.binding("adultsConcerns[0].description")).getText()).toBe("Adult Concern First");
            funcionesAuxiliares.sleep(2);
        });
    });


    describe('test cases for creating a new possible solution', function () {
        it('55 no se puede crear un Possible solution con los campos vacios', function () {
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
                boton[0].click();
            })
            var createButton = element(by.buttonText("Create"));

            expect(createButton.isEnabled()).toBe(false);
        });

        it('56 Se debe poder cancelar la creacion de un possible Solution', function () {
            var createButton = element(by.buttonText("Cancel")).click();
            funcionesAuxiliares.sleep(2);

            expect(element(by.id("message")).getText()).toBe("No possible solutions registered. Please register one above, once you agree upon a solution.");
        });

        it('57 Crear un possible solution', function () {
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
                boton[0].click();
            });
            element(by.tagName("textarea")).sendKeys("First Possible Solution");
            element(by.buttonText("Create")).click();

            expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution")
        });
    });


    describe('test cases when editing an possible solution', function () {
        it("58 Cuando se esta editando no se pueden dejar los campos en blanco", function () {
            var possible_solution = element(by.binding("solution.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, possible_solution);
            browser.sleep(2000);
            element(by.id("edit_button")).click();
            element(by.model("editableSolution.description")).clear();

            expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
            browser.sleep(1000);
        });

        it("59 eDITAR UNSOLVED PROBLEMS", function () {
            element(by.model("editableSolution.description")).clear().sendKeys("First Possible Solution EDITADO");
            element(by.buttonText("Save")).click();
            browser.sleep(3000);

            expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution EDITADO");
            browser.sleep(2000);

        });
    });


    describe('Test cases, when navigating between steeps', function () {
        it('60 del Invitation Step se puede hacer usar los botones de navegacion e ir al Empathy Step', function () {
            element(by.className("icon step1")).click();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Empathy Step");
            browser.sleep(1000);
        });

        it('61 del Empathy  Step se puede hacer usar los botones de navegacion e ir al Invitation Step', function () {
            element(by.className("icon step3")).click();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Invitation Step");
            browser.sleep(1000);
        });

        it('62 del Invitation Step se puede hacer usar los botones de navegacion e ir al Adults Concern Step', function () {
            element(by.className("icon step2")).click();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Define Adult's Concern");
            browser.sleep(1000);
        });

        it('63 del Define Adults Concern Step se puede hacer usar los botones de navegacion e ir al Empathy Step', function () {
            element(by.className("icon step1")).click();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Empathy Step");
            browser.sleep(1000);
        });


        it('64 de Empathy Step se puede hacer usar los botones de navegacion e ir a Define the Adults concern Step', function () {
            element(by.className("icon step2")).click();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Define Adult's Concern");
            browser.sleep(1000);
        });

        it('65 de Define de Adults Concern Step se puede hacer usar los botones de navegacion e ir a Invitation Step', function () {
            element(by.className("icon step3")).click();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Invitation Step");
            browser.sleep(1000);
        });
    });


    describe('test cases when erasing a possible solution', function () {
        it('66 Se debe poder cancelar en mensaje de advertencia al querer borrar un possible solution', function () {
            var possible_solution = element(by.binding("solution.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, possible_solution);
            browser.sleep(2000);
            element(by.id("delete_button")).click();
            browser.sleep(2000);
            element(by.buttonText("Cancel")).click();
            browser.sleep(2000);

            expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution EDITADO");
            browser.sleep(5000);
        });

        it('67 borrar un possible solution', function () {
            var possible_solution = element(by.binding("solution.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, possible_solution);
            browser.sleep(2000);
            element(by.id("delete_button")).click();
            browser.sleep(2000);
            element(by.buttonText("OK")).click();
            browser.sleep(2000);

            expect(element(by.id("message")).getText()).toBe("No possible solutions registered. Please register one above, once you agree upon a solution.")
        });
    });

    it('68 Crear dos possible solution', function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (items) {
            items[0].click();
        });
        element(by.tagName("textarea")).sendKeys("First Possible Solution");
        element(by.buttonText("Create")).click();
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (items) {
            items[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Second Possible Solution");
        element(by.buttonText("Create")).click();

        element.all(by.binding("solution.description")).then(function (items) {

            expect(items[0].getText()).toBe("First Possible Solution");
            expect(items[1].getText()).toBe("Second Possible Solution");

        });
    });


    describe('test cases for comments', function () {
        it('69 Ir a la vista de Coments', function () {
            element.all(by.binding("solution.description")).then(function (items) {
                var possible_solution = items[0];
                funcionesAuxiliares.desplazarElemento(-200, 0, possible_solution);
                browser.sleep(3000);
            });

            element.all(by.id("comment_button")).then(function (items) {
                items[0].click();
            });
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Solution's Info");
            expect(element(by.tagName("p")).getText()).toBe("No comments registered. Please register one above.");
        });

        it('70 No se puede crear un comment vacio', function () {
            element(by.className("icon ion-plus")).click();
            var createButton = element(by.buttonText("Create"));
            expect(createButton.isEnabled()).toBe(false);
            browser.sleep(2000);
        });

        it('71 Se puede cancelar la creacion de un comment', function () {
            element(by.tagName("textarea")).sendKeys("First Comment");
            element(by.buttonText("Cancel")).click();
            browser.sleep(2000);
            expect(element(by.tagName("p")).getText()).toBe("No comments registered. Please register one above.");
        });

        it('72 crear un comment ', function () {
            element(by.className("icon ion-plus")).click();
            browser.sleep(2000)
            element(by.tagName("textarea")).sendKeys("First Comment");
            element(by.buttonText("Create")).click();
            browser.sleep(5000);
            expect(element(by.binding("item.description")).getText()).toContain("First Comment");
        });

        it('73 al editar no se puede dejar los campos vacios', function () {
            element.all(by.binding("item.description")).then(function (items) {
                var comment = items[0];
                funcionesAuxiliares.desplazarElemento(-200, 0, comment);
            });
            browser.sleep(3000);
            element(by.className("button button-balanced ion-edit button")).click();
            browser.sleep(2000);
            element(by.model("editableComment.description")).clear();
            var createButton = element(by.buttonText("Save"));
            expect(createButton.isEnabled()).toBe(false);
        });


        it('74 al editar Un comment', function () {

            element(by.model("editableComment.description")).clear().sendKeys("First Comment EDITED");
            element(by.buttonText("Save")).click();
            expect(element(by.binding("item.description")).getText()).toContain("First Comment EDITED");
        });

        it('75 Se puede cancelar cuando se esta borrando un comment', function () {
            element.all(by.binding("item.description")).then(function (items) {
                var comment = items[0];
                funcionesAuxiliares.desplazarElemento(-200, 0, comment);
            });

            browser.sleep(2000);
            element(by.className("button button-assertive ion-trash-a")).click();
            browser.sleep(2000);
            element(by.className("button ng-binding button-default")).click();
            browser.sleep(2000);
            expect(element(by.binding("item.description")).getText()).toContain("First Comment EDITED");

        });


        it('76 Se puede borrar un comment', function () {
            var comment = element(by.binding("item.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, comment);
            browser.sleep(2000);
            element(by.className("button button-assertive ion-trash-a")).click();
            browser.sleep(2000);
            element(by.buttonText("OK")).click();
            browser.sleep(2000);
            expect(element(by.tagName("p")).getText()).toBe("No comments registered. Please register one above.");
        });

        it('77 Se debe volver de los comments al invitation step', function () {
            //element(by.className("button back-button buttons button-clear header-item")).click();
            browser.navigate().back();
            browser.sleep(2000);
            expect(browser.getTitle()).toBe("Invitation Step");
        });
    });


    describe('test cases for rate a possible solution', function () {
        it("78 Asignarle un Rate triste al primer  possible solution", function () {
            element.all(by.className("icon ion-star")).then(function (solution) {
                var radio_button = element(by.className("icon ion-android-radio-button-off"));
                expect(radio_button.isPresent()).toBeTruthy();
                solution[0].click();
                element(by.className("button ng-binding button-assertive ion-sad-outline")).click();
                element(by.buttonText("OK")).click();
                browser.sleep(2000);
                var icon_sad = element(by.className("icon ion-sad"));
                var icon_heart_broken = element(by.className("icon ion-heart-broken"));
                var icon_heart_ = element(by.className("icon ion-heart"));
                var icon_smile_ = element(by.className("icon ion-happy"));

                expect(icon_sad.isPresent()).toBeTruthy();
                expect(icon_heart_broken.isPresent()).toBeFalsy();
                expect(icon_heart_.isPresent()).toBeFalsy();
                expect(icon_smile_.isPresent()).toBeFalsy();
            });
        });


        it("79 Asignarle un Rate triste al segundo  possible solution", function () {
            element.all(by.className("icon ion-star")).then(function (solution) {
                var radio_button = element(by.className("icon ion-android-radio-button-off"));
                expect(radio_button.isPresent()).toBeTruthy();
                solution[1].click();
                element(by.className("button ng-binding button-energized ion-heart-broken")).click();
                // element(by.buttonText("OK")).click();
                funcionesAuxiliares.sleep(1);
                var icon_sad = element(by.className("icon ion-sad"));
                var icon_heart_broken = element(by.className("icon ion-heart-broken"));
                var icon_heart_ = element(by.className("icon ion-heart"));
                var icon_smile_ = element(by.className("icon ion-happy"));

                expect(icon_sad.isPresent()).toBeTruthy();
                expect(icon_heart_broken.isPresent()).toBeTruthy();
                expect(icon_heart_.isPresent()).toBeFalsy();
                expect(icon_smile_.isPresent()).toBeFalsy();
            });
        });

        it("80Mostrar el mejor rating para el unsolved problem", function () {
            browser.get('http://localhost:8100');
            element(by.id("child_selected")).click();
            browser.sleep(2000);
            element(by.id("unsolvedProblemsID")).click();
            var icon_sad = element(by.className("icon ion-sad"));
            var icon_heart_broken = element(by.className("icon ion-heart-broken"));
            var icon_heart_ = element(by.className("icon ion-heart"));
            var icon_smile_ = element(by.className("icon ion-happy"));

            expect(icon_sad.isPresent()).toBeFalsy();
            expect(icon_heart_broken.isPresent()).toBeTruthy();
            expect(icon_heart_.isPresent()).toBeFalsy();
            expect(icon_smile_.isPresent()).toBeFalsy();
        });
    });
});