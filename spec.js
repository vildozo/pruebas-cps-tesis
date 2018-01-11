var logger = require('./log');
describe('Protractor Children Management', function() {

  var factoryNewChild = element(by.css('title title-left'));
  var addAChild= element(by.id('new-child-btn'));
  var childsName=element(by.id('childs_name'));



  beforeEach(function() {
    browser.get('http://localhost:8100');
      browser.driver.manage().window().setSize(750, 800);
  });


//     it('1 Open app on the Manage Children View', function() {
//         expect(browser.getTitle()).toEqual('Manage Children');
// //        logger.log('info','1 Open app on the Manage Children View');
//    });
//
//   it('2 No Child registered', function() {
//         expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
// //        logger.log('info','2 No Child registered');
//   });
//
//     it('3 Button Create disable when creating a new child when name field is empty', function() {
//         addAChild.click();
//         element(by.model("child.gender")).element(by.css("[value='Male']")).click();
//         var createButton = element(by.buttonText("Create"));
//          expect(createButton.isEnabled()).toBe(false);
// //        logger.log('info','3 Button Create disable when creating a new child when name field is empty');
//     });
//
//     it('4 Cant Register a Child with tomorrows Date', function() {
//         addAChild.click();
//         var childsNameInput = element(by.id('childs_name'));
//         element(by.model("child.first_name")).sendKeys("Posterior a Fecha actual");
//         element(by.model("child.gender")).element(by.css("[value='Male']")).click();
//         element(by.model("child.birthday")).sendKeys("06/22/2081");
//         element(by.buttonText("Create")).click();
//         this.popupContainsHeaderText = function (text) {
//             this.popupShouldExist();
//             expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Please insert a date prior to today");
//         };
// //        logger.log('info','4 Cant Register a Child with tomorrows Date');
//     });
//
//     it('5 Cancel option when registeringa a "New Child" ', function() {
//         addAChild.click();
//         titleModalNewChild = element(by.id('head_New_Child'));
//         expect(titleModalNewChild.getText()).toEqual("New Child");
//         element(by.buttonText("Cancel")).click();
//         expect(browser.getTitle()).toEqual('Manage Children');
// //        logger.log('info','5 Cancel option when registeringa a "New Child');
//     });
//
//       it('6 Add first Child', function() {
//         addAChild.click();
//         var childsNameInput = element(by.id('childs_name'));
//         element(by.model("child.first_name")).sendKeys("Javier Vildozo");
//         element(by.model("child.birthday")).sendKeys("06/22/1981");
//         element(by.model("child.gender")).element(by.css("[value='Male']")).click();
//         element(by.buttonText("Create")).click();
//         browser.sleep(6000);
//
//         element(by.repeater("child in childs")).getText().then(function (text) {
//             expect(text).toMatch("Javier Vildozo");
//             expect(text).toMatch("22/06/81");
//
//         });
//           var mypic = element(by.css("img[src*='boy.png']"));
//           expect(mypic.isPresent()).toBe(true);
//
// //        logger.log('info','6 Add first Child');
//     });
//
//     it('7 Edit a Child', function() {
//         var moreButton= element(by.id('moreButton'));
//         moreButton.click();
//         element(by.buttonText("Edit child")).click();
//         element(by.model("editableChild.first_name")).clear().sendKeys("Lisa");
//         element(by.model("editableChild.gender")).element(by.css("[value='Female']")).click();
//         element(by.buttonText("Save")).click();
//         element(by.repeater("child in childs")).getText().then(function (text) {
//             expect(text).toMatch("Lisa");
//         });
//         var mypic = element(by.css("img[src*='girl.png']"));
//         expect(mypic.isPresent()).toBe(true);
// //        logger.log('info','7 Edit a Child');
//
//     });
//
//
//     it('8 You can Cancel in windows in order to not delete a Child', function() {
//         var moreButton= element(by.id('moreButton'));
//         moreButton.click();
//         element(by.buttonText("Delete child")).click();
//         element(by.buttonText("Cancel")).click();
//         element(by.repeater("child in childs")).getText().then(function (text) {
//             expect(text).toMatch("Lisa");
//         });
// //        logger.log('info','8 You can Cancel in windows in order to not delete a Child');
//
//     });
//
//
//     it('9 Delete a Child', function() {
//         var moreButton= element(by.id('moreButton'));
//         moreButton.click();
//         element(by.buttonText("Delete child")).click();
//         element(by.buttonText("OK")).click();
//         expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
//
// //        logger.log('info','9 Delete a Child');
//
//     });



    it('10 Crear 2do niño ', function() {
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

//          logger.log('info','');
    });

//
//     it('11 Acceder a ALSUP de un Child', function () {
//        element(by.id("child_selected")).click();
//        browser.sleep(5000);
//        expect(element(by.tagName('h2')).getText()).toBe('ALSUP');
//
//     });
//
//     it('12 ALSUP debe tener botones de Lagging Skills y Unsolved Problems', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         expect(element(by.id("laggingSkillsID")).getText()).toBe('Lagging Skills');
//         expect(element(by.id("unsolvedProblemsID")).getText()).toBe('Unsolved Problems');
//     });
//
//     it('13 Marcar Lagging skill y este cambiara su color de letra a azul', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         expect(element(by.id("laggingSkillsID")).getText()).toBe('Lagging Skills');
//     });
//
//     it('14 Ingresar a los Lagging Skills y marcar uno', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         var laggingSkill=element(by.repeater("laggingSkill in laggingSkills"));
//         browser.actions()
//             .mouseDown(laggingSkill)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//
//         element(by.className("button-positive ion-checkmark button")).click();
//
//         browser.sleep(5000);
//         var marcado= element(by.binding("laggingSkill.description"));
//         expect(marcado.getCssValue('color')).toBe('rgba(56, 126, 245, 1)');
//     });
//
//     it('15 Ingresar a los Lagging Skills y desmarcar uno lagging Skill previamente marcado', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         var marcado= element(by.binding("laggingSkill.description"));
//         browser.actions()
//             .mouseDown(marcado)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(3000);
//
//           element(by.className("button-dark ion-close")).click();
//           browser.sleep(3000);
//           var laggingSkill=element(by.repeater("laggingSkill in laggingSkills"));
//           expect(laggingSkill.getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
//     });
//
//     it('16 al hacer click en un lagging skills se mostrara la vista de unsolved problems', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//         expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
//     });
//
//     it('17 se puede acceder directamente a la vista de unsolved problems desde la vista de ALSUP', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("unsolvedProblemsID")).click();
//
//         // element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//         // expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
//     });
//
//
//
//     it('18 El boton para crear unsolved problem estara inhabilitado mientras este vacio el campo de unsolved problems',function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//         element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
//         var createButton = element(by.buttonText("Create"));
//         expect(createButton.isEnabled()).toBe(false);
//
//     })
//
//
//         it('19 debe mostrar el nombre del child en la vista de unsolved problems',function () {
//             element(by.id("child_selected")).click();
//             browser.sleep(5000);
//             element(by.id("laggingSkillsID")).click();
//
//             element(by.binding("laggingSkill.description")).click();
//             browser.sleep(4000);
//             element(by.binding("activeChild.first_name")).getText().then(function (text) {
//
//                 expect(text).toBe("Maria Coloma");
//             });
//         });
//
//     it('20 Crear un nuevo Unsolved Problem', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//         element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
//
//         element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
//         element(by.buttonText("Create")).click();
//         browser.sleep(3000);
//         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
//     });
//
//     it('21 al tener un unsolved problem creado el lagging skill correspondiente se marcara de forma automatica', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         browser.sleep(5000);
//         var marcado= element(by.binding("laggingSkill.description"));
//         expect(marcado.getCssValue('color')).toBe('rgba(56, 126, 245, 1)');
//     });
//
//     it('22 Se puede cancelar la creacion de unsolved problem    9', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//         element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
//
//         element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
//         element(by.buttonText("Cancel")).click();
//         browser.sleep(3000);
//         expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
//     });
//
//     it('23 Al editar no se puede dejar los campos de un unsolved problem sin llenar', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(3000);
//         element(by.id("edit_button")).click();
//         browser.sleep(4000);
//         element(by.model("editableUnsolvedProblem.description")).clear();
//         expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
//         browser.sleep(3000);
//
//     });
//
//     it('24 Editar un unsolved problem', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(3000);
//         element(by.id("edit_button")).click();
//         browser.sleep(4000);
//         element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Unsolved Problem 1 EDITADO");
//         element(by.buttonText("Save")).click();
//         browser.sleep(3000);
//
//         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
//     });
//
//     it('25 Al editar y  modificar datos de un unsolved problem cuando se cancela los datos modificados no deben persistir', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(3000);
//         element(by.id("edit_button")).click();
//         browser.sleep(4000);
//         element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Probando Boton Cancelar");
//         element(by.buttonText("Cancel")).click();
//         browser.sleep(3000);
//
//         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
//     });
//
//
//     it('26 Al apretar el boton de cancelar en el mensaje de confirmacion para borrar, no borrara el unsolved problem', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(3000);
//         element(by.id("delete_button")).click();
//         browser.sleep(4000);
//         element(by.buttonText("Cancel")).click();
//         browser.sleep(3000);
//
//
//         expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
//     });
//
//     it('27 Al apretar el boton de Aceptar en el mensaje de confirmacion para borrar, borrara el unsolved problem', function () {
//         element(by.id("child_selected")).click();
//         browser.sleep(5000);
//         element(by.id("laggingSkillsID")).click();
//
//         element(by.binding("laggingSkill.description")).click();
//         browser.sleep(4000);
//
//         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(3000);
//         element(by.id("delete_button")).click();
//         browser.sleep(4000);
//         element(by.buttonText("OK")).click();
//         browser.sleep(3000);
//         element(by.id("no_unsolved_problems_message")).getText().then(function (text) {
//             expect(text).toBe("No unsolved problems registered. Please register one above.");
//
//         });
//     });

        it('28 Crear un unsolved problem y posteriormente crear un segundo unsolved Problem',function () {
            element(by.id("child_selected")).click();
            browser.sleep(5000);
            element(by.id("laggingSkillsID")).click();

            element(by.binding("laggingSkill.description")).click();
            browser.sleep(4000);
            element(by.className("watchlist_menu button button-small button-clear button-positive")).click();

            element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
            element(by.buttonText("Create")).click();
            browser.sleep(3000);
            expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");

            browser.sleep(4000);
            element(by.className("watchlist_menu button button-small button-clear button-positive")).click();

            element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 2");
            element(by.buttonText("Create")).click();
            browser.sleep(3000);
            element.all(by.binding("unsolvedProblem.description")).then(function (items) {
                items[1].getText().then(function (text) {
                    expect(text).toBe("Unsolved Problem 2");
                });
            });
        });

    it('29 Borrar un unsolved problem', function () {
        element(by.id("child_selected")).click();
        browser.sleep(5000);
        element(by.id("laggingSkillsID")).click();

        element(by.binding("laggingSkill.description")).click();
        browser.sleep(4000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        browser.actions()
            .mouseDown(botones_adicionales)
            .mouseMove({x: -200, y: 0}) // try different value of x
            .mouseUp()
            .perform();
        browser.sleep(1000);
        element(by.id("delete_button")).click();
        browser.sleep(2000);
        element(by.buttonText("OK")).click();
        browser.sleep(3000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 2");

    });
    //
    //
    // it('30 En la opciones de un unsolved problem debe permitir ingresar al step 2(Empathy step)', function () {
    //     element(by.id("child_selected")).click();
    //     browser.sleep(5000);
    //     element(by.id("laggingSkillsID")).click();
    //
    //     element(by.binding("laggingSkill.description")).click();
    //     browser.sleep(4000);
    //
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     browser.actions()
    //         .mouseDown(botones_adicionales)
    //         .mouseMove({x: -200, y: 0}) // try different value of x
    //         .mouseUp()
    //         .perform();
    //     browser.sleep(3000);
    //     element(by.id("more_button")).click();
    //     browser.sleep(4000);
    //     element(by.buttonText("Step 1: Empathy Step")).click();
    //     browser.sleep(2000);
    //
    //
    // });
    //
    // it('31 probar mensaje de ayuda en empathy step',function () {
    //
    //     element(by.id("child_selected")).click();
    //     browser.sleep(5000);
    //     element(by.id("laggingSkillsID")).click();
    //
    //     element(by.binding("laggingSkill.description")).click();
    //     browser.sleep(4000);
    //
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     browser.actions()
    //         .mouseDown(botones_adicionales)
    //         .mouseMove({x: -200, y: 0}) // try different value of x
    //         .mouseUp()
    //         .perform();
    //     browser.sleep(3000);
    //     element(by.id("more_button")).click();
    //     browser.sleep(4000);
    //     element(by.buttonText("Step 1: Empathy Step")).click();
    //     browser.sleep(2000);
    //
    //     expect(element(by.id("help_message")).getText()).toMatch("I've noticed that you've been having ");
    //     expect(element(by.id("help_message")).getText()).toMatch("Unsolved Problem 2");
    //     expect(element(by.id("help_message")).getText()).toMatch(", what's up?");
    // });
    //
    // it('32 No se puede crear un nuevo Child Concern con el campo child concern vacio',function () {
    //
    //     element(by.id("child_selected")).click();
    //     browser.sleep(5000);
    //     element(by.id("laggingSkillsID")).click();
    //
    //     element(by.binding("laggingSkill.description")).click();
    //     browser.sleep(4000);
    //
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     browser.actions()
    //         .mouseDown(botones_adicionales)
    //         .mouseMove({x: -200, y: 0}) // try different value of x
    //         .mouseUp()
    //         .perform();
    //     browser.sleep(3000);
    //     element(by.id("more_button")).click();
    //     browser.sleep(4000);
    //     element(by.buttonText("Step 1: Empathy Step")).click();
    //     browser.sleep(2000);
    //     element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
    //     var createButton = element(by.buttonText("Create"));
    //
    //     expect(createButton.isEnabled()).toBe(false);
    // });

    // it('33 Se puede cancelar la creacion de un nuevo child concern',function () {
    //
    //     element(by.id("child_selected")).click();
    //     browser.sleep(5000);
    //     element(by.id("laggingSkillsID")).click();
    //
    //     element(by.binding("laggingSkill.description")).click();
    //     browser.sleep(4000);
    //
    //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
    //     browser.actions()
    //         .mouseDown(botones_adicionales)
    //         .mouseMove({x: -200, y: 0}) // try different value of x
    //         .mouseUp()
    //         .perform();
    //     browser.sleep(3000);
    //     element(by.id("more_button")).click();
    //     browser.sleep(4000);
    //     element(by.buttonText("Step 1: Empathy Step")).click();
    //     browser.sleep(2000);
    //     element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
    //     var createButton = element(by.buttonText("Create"));
    //     element(by.buttonText("Cancel")).click();
    //
    //     browser.sleep(1000);
    //     expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
    // });

    it('34 Crear un nuevo child concern',function () {
        element(by.id("child_selected")).click();
        browser.sleep(5000);
        element(by.id("laggingSkillsID")).click();

        element(by.binding("laggingSkill.description")).click();
        browser.sleep(4000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        browser.actions()
            .mouseDown(botones_adicionales)
            .mouseMove({x: -200, y: 0}) // try different value of x
            .mouseUp()
            .perform();
        browser.sleep(3000);
        element(by.id("more_button")).click();
        browser.sleep(4000);
        element(by.buttonText("Step 1: Empathy Step")).click();
        browser.sleep(2000);
        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
        element(by.tagName("textarea")).sendKeys("Child Concern 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");
    });

    it('35 Cuando se esta editando se debe poder cancelar y no persistira el cambio',function () {
        element(by.id("child_selected")).click();
        browser.sleep(5000);
        element(by.id("laggingSkillsID")).click();

        element(by.binding("laggingSkill.description")).click();
        browser.sleep(4000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        browser.actions()
            .mouseDown(botones_adicionales)
            .mouseMove({x: -200, y: 0}) // try different value of x
            .mouseUp()
            .perform();
        browser.sleep(3000);
        element(by.id("more_button")).click();
        browser.sleep(4000);
        element(by.buttonText("Step 1: Empathy Step")).click();
        browser.sleep(2000);

        var botones_adicionales=element(by.binding("childsConcern.description"));
        browser.actions()
            .mouseDown(botones_adicionales)
            .mouseMove({x: -200, y: 0}) // try different value of x
            .mouseUp()
            .perform();
        browser.sleep(2000);

        element(by.buttonText("No, keep drilling")).click();
        element(by.id("edit_button")).click();
        browser.sleep(2000);
        element(by.model("editableChildsConcern.description")).clear().sendKeys("Child Concern 1 EDITADO");
        browser.sleep(2000);
        element(by.buttonText("Save")).click();
        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1 EDITADO");

        browser.sleep(2000);


    });






});
