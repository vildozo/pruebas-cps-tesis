var logger = require('./log');
describe('Protractor Children Management', function() {

  var factoryNewChild = element(by.css('title title-left'));
  var addAChild= element(by.id('new-child-btn'));
  var childsName=element(by.id('childs_name'));

    function desplazarElemento(ejeX,ejeY,elemento){
        browser.actions()
            .mouseDown(elemento)
            .mouseMove({x: ejeX, y: ejeY}) // try different value of x
            .mouseUp()
            .perform();
    };

  beforeEach(function() {

      browser.driver.manage().window().setSize(750, 800);
  });


    it('1 Open app on the Manage Children View', function() {
        browser.get('http://localhost:8100');
        expect(browser.getTitle()).toEqual('Manage Children');
//        logger.log('info','1 Open app on the Manage Children View');
   });

  it('2 No Child registered', function() {
        expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
//        logger.log('info','2 No Child registered');
  });

    it('3 Button Create disable when creating a new child when name field is empty', function() {
        addAChild.click();
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        var createButton = element(by.buttonText("Create"));
         expect(createButton.isEnabled()).toBe(false);
//        logger.log('info','3 Button Create disable when creating a new child when name field is empty');
    });

    it('4 Cant Register a Child with tomorrows Date', function() {
        element(by.model("child.first_name")).sendKeys("Posterior a Fecha actual");
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        element(by.model("child.birthday")).sendKeys("06/22/2081");
        element(by.buttonText("Create")).click();
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();
            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Please insert a date prior to today");
            this.popup.element(by.buttonText("OK")).click();
        };
//        logger.log('info','4 Cant Register a Child with tomorrows Date');
    });

    it('5 Cancel option when registeringa a "New Child" ', function() {
        browser.get('http://localhost:8100');
        addAChild.click();
        titleModalNewChild = element(by.id('head_New_Child'));
        expect(titleModalNewChild.getText()).toEqual("New Child");
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toEqual('Manage Children');
//        logger.log('info','5 Cancel option when registeringa a "New Child');
    });

      it('6 Add first Child', function() {
          browser.get('http://localhost:8100');
        addAChild.click();
        var childsNameInput = element(by.id('childs_name'));
        element(by.model("child.first_name")).sendKeys("Javier Vildozo");
        element(by.model("child.birthday")).sendKeys("06/22/1981");
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        element(by.buttonText("Create")).click();
        browser.sleep(1000);

        element(by.repeater("child in childs")).getText().then(function (text) {
            expect(text).toMatch("Javier Vildozo");
            expect(text).toMatch("22/06/81");
        });

          var mypic = element(by.css("img[src*='boy.png']"));
          expect(mypic.isPresent()).toBe(true);

//        logger.log('info','6 Add first Child');
    });

    it('7 Edit a Child', function() {
        var moreButton= element(by.id('moreButton'));
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
//        logger.log('info','7 Edit a Child');

    });


    it('8 You can Cancel in windows in order to not delete a Child', function() {
        browser.get('http://localhost:8100');
        var moreButton= element(by.id('moreButton'));
        moreButton.click();
        element(by.buttonText("Delete child")).click();
        element(by.buttonText("Cancel")).click();
        element(by.repeater("child in childs")).getText().then(function (text) {
            expect(text).toMatch("Lisa");
        });
//        logger.log('info','8 You can Cancel in windows in order to not delete a Child');

    });


    it('9 Delete a Child', function() {
        var moreButton= element(by.id('moreButton'));
        moreButton.click();
        element(by.buttonText("Delete child")).click();
        browser.sleep(1000);
        element(by.buttonText("OK")).click();
        browser.sleep(1000);
        expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");

//        logger.log('info','9 Delete a Child');

    });



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


    it('11 Acceder a ALSUP de un Child y visualizar botones a lagging Skills y unsolved problem', function () {
       element(by.id("child_selected")).click();
       browser.sleep(5000);
       expect(element(by.tagName('h2')).getText()).toBe('ALSUP');
       expect(element(by.id("laggingSkillsID")).getText()).toBe('Lagging Skills');
       expect(element(by.id("unsolvedProblemsID")).getText()).toBe('Unsolved Problems');

    });

    it('12 Ingresar a los Lagging Skills y marcar uno', function () {
        element(by.id("laggingSkillsID")).click();

        var laggingSkill=element(by.repeater("laggingSkill in laggingSkills"));
           desplazarElemento(-200,0,laggingSkill);

        element(by.className("button-positive ion-checkmark button")).click();
        browser.sleep(2000);
        var marcado= element(by.binding("laggingSkill.description"));
        expect(marcado.getCssValue('color')).toBe('rgba(56, 126, 245, 1)');
    });

    it('13 Ingresar a los Lagging Skills y desmarcar uno lagging Skill previamente marcado', function () {
        var marcado= element(by.binding("laggingSkill.description"));
        desplazarElemento(-200,0,marcado);
          element(by.className("button-dark ion-close")).click();
          browser.sleep(3000);
          var laggingSkill=element(by.repeater("laggingSkill in laggingSkills"));
          expect(laggingSkill.getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
    });

    it('14 al hacer click en un lagging skills se mostrara la vista de unsolved problems', function () {
        element(by.binding("laggingSkill.description")).click();
        browser.sleep(4000);
        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });

    it('15 debe mostrar el nombre del child en la vista de unsolved problems',function () {
        element(by.binding("activeChild.first_name")).getText().then(function (text) {
            expect(text).toBe("Maria Coloma");
        });
    });

    it('16 se puede acceder directamente a la vista de unsolved problems desde la vista de ALSUP', function () {
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        browser.sleep(1000);
        element(by.id("unsolvedProblemsID")).click();

        browser.sleep(1000);
        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });



    it('17 El boton para crear unsolved problem estara inhabilitado mientras este vacio el campo de unsolved problems',function () {
        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
        var createButton = element(by.buttonText("Create"));
        expect(createButton.isEnabled()).toBe(false);
    });




    it('18 Crear un nuevo Unsolved Problem', function () {
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
    });

    it('19 Se puede cancelar la creacion de unsolved problem    9', function () {
        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();

        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
        element(by.buttonText("Cancel")).click();
        browser.sleep(3000);
        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });


    it('20 al tener un unsolved problem creado el lagging skill correspondiente se marcara de forma automatica', function () {
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        // browser.sleep(1000);
        element(by.id("laggingSkillsID")).click();
        // browser.sleep(1000);
        var marcado= element(by.binding("laggingSkill.description"));
        expect(marcado.getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
    });
//

//
    it('21 Al editar no se puede dejar los campos de un unsolved problem sin llenar', function () {
        element(by.binding("laggingSkill.description")).click();
        //browser.sleep(1000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        // browser.sleep(3000);
        element(by.id("edit_button")).click();
        // browser.sleep(4000);
        element(by.model("editableUnsolvedProblem.description")).clear();

        expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
        //browser.sleep(3000);
    });

    it('22 Editar un unsolved problem', function () {
        element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Unsolved Problem 1 EDITADO");
        element(by.buttonText("Save")).click();
        //browser.sleep(3000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
    });

    it('23 Al editar y  modificar datos de un unsolved problem cuando se cancela los datos modificados no deben persistir', function () {
        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        // browser.sleep(1000);
        element(by.id("edit_button")).click();
        // browser.sleep(1000);
        element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Probando Boton Cancelar");
        element(by.buttonText("Cancel")).click();
        // browser.sleep(1000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
    });
//
//
    it('24 Al apretar el boton de cancelar en el mensaje de confirmacion para borrar, no borrara el unsolved problem', function () {
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        // browser.sleep(1000);
        element(by.id("laggingSkillsID")).click();

        element(by.binding("laggingSkill.description")).click();
        browser.sleep(1000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        // browser.sleep(1000);
        element(by.id("delete_button")).click();
        // browser.sleep(1000);
        element(by.buttonText("Cancel")).click();
        // browser.sleep(3000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
    });

    it('25 Al apretar el boton de Aceptar en el mensaje de confirmacion para borrar, borrara el unsolved problem', function () {
        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        //browser.sleep(3000);
        element(by.id("delete_button")).click();
        //browser.sleep(4000);
        element(by.buttonText("OK")).click();
        //browser.sleep(3000);
        element(by.id("no_unsolved_problems_message")).getText().then(function (text) {
            expect(text).toBe("No unsolved problems registered. Please register one above.");

        });
    });

        it('26 Crear un unsolved problem y posteriormente crear un segundo unsolved Problem',function () {
            element(by.className("watchlist_menu button button-small button-clear button-positive")).click();

            element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
            element(by.buttonText("Create")).click();
            // browser.sleep(3000);
            expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");

            // browser.sleep(4000);
            element(by.className("watchlist_menu button button-small button-clear button-positive")).click();

            element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 2");
            element(by.buttonText("Create")).click();
            // browser.sleep(3000);
            element.all(by.binding("unsolvedProblem.description")).then(function (items) {
                items[1].getText().then(function (text) {
                    expect(text).toBe("Unsolved Problem 2");
                });
            });
        });

    it('27 Borrar un unsolved problem', function () {
        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
         browser.sleep(1000);
        element(by.id("delete_button")).click();
         browser.sleep(1000);
        element(by.buttonText("OK")).click();
         browser.sleep(1000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 2");

    });

        it('28 desde la vista de unsolved problems no se puede pasar al step 2(Adult Concern) sin haber pasado el step 1(Empathy Step)',function () {
            var botones_adicionales= element(by.binding("unsolvedProblem.description"));
            desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(3000);
            element(by.id("more_button")).click();
            browser.sleep(4000);
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

    it('29 desde la vista de unsolved problems no se puede pasar al step 3(Invitation Step) sin haber pasado el step 1(Empathy Step) y Step 2',function () {
        // browser.get('http://localhost:8100');
        // element(by.id("child_selected")).click();
        // browser.sleep(5000);
        // element(by.id("laggingSkillsID")).click();
        //
        // element(by.binding("laggingSkill.description")).click();
        // browser.sleep(4000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(3000);
        element(by.id("more_button")).click();
        browser.sleep(4000);
        element(by.buttonText("Step 3: Invitation Step")).click();
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


    it('30 En la opciones de un unsolved problem debe permitir ingresar al step 2(Empathy step)', function () {

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(3000);
        element(by.id("more_button")).click();
        browser.sleep(4000);
        element(by.buttonText("Step 1: Empathy Step")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toEqual('Empathy Step');
        browser.sleep()
    });

    it('31 probar mensaje de ayuda en empathy step',function () {


        expect(element(by.id("help_message")).getText()).toMatch("I've noticed that you've been having ");
        expect(element(by.id("help_message")).getText()).toContain("Unsolved Problem 2");
        expect(element(by.id("help_message")).getText()).toMatch(", what's up?");
    });

    it('32 No se puede crear un nuevo Child Concern con el campo child concern vacio',function () {
        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('33 Se puede cancelar la creacion de un nuevo child concern',function () {

        element(by.buttonText("Cancel")).click();

        browser.sleep(2000);
        expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
        browser.sleep(1000);
    });

    it('34 Crear un nuevo child concern',function () {
        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
        element(by.tagName("textarea")).sendKeys("Child Concern 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");
    });


    it('35 Cuando se esta editando no se puede dejar el campo de Child concern vacio',function () {

        var botones_adicionales=element(by.binding("childsConcern.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(3000);
        element(by.buttonText("No, keep drilling")).click();
        browser.sleep(2000);

        element(by.id("edit_button")).click();
        browser.sleep(2000);
        element(by.model("editableChildsConcern.description")).clear().sendKeys("");
        browser.sleep(2000);

        var createButton = element(by.buttonText("Save"));
        expect(createButton.isEnabled()).toBe(false);


    });

    it('36 Cuando se esta editando se debe poder cancelar y no persistira el cambio',function () {
            browser.get('http://localhost:8100/#/app/unsolvedProblem/show/3');
            var botones_adicionales=element(by.binding("childsConcern.description"));
            desplazarElemento(-200,0,botones_adicionales);
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


    it('37 Cuando se esta editando y en se guarda el cabio debe persistir',function () {

        var botones_adicionales=element(by.binding("childsConcern.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(2000);

        element(by.buttonText("No, keep drilling")).click();
        element(by.id("edit_button")).click();
        browser.sleep(2000);
        element(by.model("editableChildsConcern.description")).clear().sendKeys("Child Concern 1 EDITADO");
        browser.sleep(2000);
        element(by.buttonText("Save")).click();

        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1 EDITADO");
    });


    it('38 Al borrar cuando se visualiza el mensaje de confirmacion, se debe poder cancelar la eliminacion de un Child Concern',function () {
             browser.get('http://localhost:8100/#/app/unsolvedProblem/show/3');
            var botones_adicionalesCC=element(by.binding("childsConcern.description"));
            desplazarElemento(-200,0,botones_adicionalesCC);
            element(by.buttonText("No, keep drilling")).click();
            element(by.id("delete_button")).click();
            browser.sleep(2000);
            element(by.buttonText("Cancel")).click();
            browser.sleep(2000);

            expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1 EDITADO");
            browser.sleep(2000);
        });
//
    it('39 Al confirmar el mensaje de borrar child concern y aceptar, el child concern sera borrado', function () {

        var botones_adicionales=element(by.binding("childsConcern.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(2000);

        element(by.buttonText("No, keep drilling")).click();
        element(by.id("delete_button")).click();
        browser.sleep(2000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);
        expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
        browser.sleep(2000);


    });


    it('40 Crear un nuevo child concern seguido por la creacion del segundo child concern',function () {
        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
        element(by.tagName("textarea")).sendKeys("Child Concern 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");

        element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
        element(by.tagName("textarea")).sendKeys("Child Concern 2");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);
        element.all(by.binding("childsConcern.description")).then(function (items) {
            items[1].getText().then(function (text) {
                expect(text).toBe("Child Concern 2");
            });
        });
        browser.sleep(2000);
    });

    it('41 Cuando se desea pasar al step 2(Adult concern), se visualizara un mensaje',function () {
        browser.get('http://localhost:8100/#/app/unsolvedProblem/show/3');
        // element(by.id("child_selected")).click();
        // browser.sleep(5000);
        // element(by.id("laggingSkillsID")).click();
        //
        // element(by.binding("laggingSkill.description")).click();
        // browser.sleep(4000);
        //
        // var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        // browser.actions()
        //     .mouseDown(botones_adicionales)
        //     .mouseMove({x: -200, y: 0}) // try different value of x
        //     .mouseUp()
        //     .perform();
        // browser.sleep(3000);
        // element(by.id("more_button")).click();
        // browser.sleep(4000);
        // element(by.buttonText("Step 1: Empathy Step")).click();
        // browser.sleep(2000);

        var botones_adicionalesCC=element(by.binding("childsConcern.description"));
        // browser.actions()
        //     .mouseDown(botones_adicionales)
        //     .mouseMove({x: -200, y: 0}) // try different value of x
        //     .mouseUp()
        //     .perform();
        desplazarElemento(-200,0,botones_adicionalesCC);
        browser.sleep(2000);

        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();
            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Have you drilled enough to get all your child's concerns?");
        };

        browser.sleep(2000);
    });
//
//
//     it('42 Al visualizar mensaje si se desea pasar a Adults concern se puede cancelar',function () {
//             element(by.id("child_selected")).click();
//             browser.sleep(5000);
//             element(by.id("laggingSkillsID")).click();
//
//             element(by.binding("laggingSkill.description")).click();
//             browser.sleep(4000);
//             var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//             browser.actions()
//                 .mouseDown(botones_adicionales)
//                 .mouseMove({x: -200, y: 0}) // try different value of x
//                 .mouseUp()
//                 .perform();
//             browser.sleep(3000);
//             element(by.id("more_button")).click();
//             browser.sleep(4000);
//             element(by.buttonText("Step 1: Empathy Step")).click();
//             browser.sleep(2000);
//             var botones_adicionales=element(by.binding("childsConcern.description"));
//             browser.actions()
//                 .mouseDown(botones_adicionales)
//                 .mouseMove({x: -200, y: 0}) // try different value of x
//                 .mouseUp()
//                 .perform();
//             browser.sleep(2000);
//
//             element(by.buttonText("No, keep drilling")).click();
//             browser.sleep(8000);
//             expect(browser.getTitle()).toEqual('Empathy Step');
//         });
//
//         it('43 Al visualizar mensaje si se desea pasar a Adults concern se puede pasar al siguiente step adult concern',function () {
//             element(by.id("child_selected")).click();
//             browser.sleep(5000);
//             element(by.id("laggingSkillsID")).click();
//             element(by.binding("laggingSkill.description")).click();
//             browser.sleep(4000);
//             var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//             browser.actions()
//                 .mouseDown(botones_adicionales)
//                 .mouseMove({x: -200, y: 0}) // try different value of x
//                 .mouseUp()
//                 .perform();
//             browser.sleep(3000);
//             element(by.id("more_button")).click();
//             browser.sleep(4000);
//             element(by.buttonText("Step 1: Empathy Step")).click();
//             browser.sleep(2000);
//             var botones_adicionales=element(by.binding("childsConcern.description"));
//             browser.actions()
//                 .mouseDown(botones_adicionales)
//                 .mouseMove({x: -200, y: 0}) // try different value of x
//                 .mouseUp()
//                 .perform();
//             browser.sleep(2000);
//
//             element(by.buttonText("Yes, I'm sure")).click();
//             browser.sleep(8000);
//             expect(browser.getTitle()).toEqual("Define Adult's Concern");
//         });
//
//
//
//         it('44 No se puede crear un adult concern con los campos vacios',function () {
//             element(by.id("child_selected")).click();
//             browser.sleep(5000);
//             element(by.id("laggingSkillsID")).click();
//             element(by.binding("laggingSkill.description")).click();
//             browser.sleep(4000);
//             var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//             browser.actions()
//                 .mouseDown(botones_adicionales)
//                 .mouseMove({x: -200, y: 0}) // try different value of x
//                 .mouseUp()
//                 .perform();
//             browser.sleep(3000);
//             element(by.id("more_button")).click();
//             browser.sleep(4000);
//             element(by.buttonText("Step 1: Empathy Step")).click();
//             browser.sleep(2000);
//             var botones_adicionales=element(by.binding("childsConcern.description"));
//             browser.actions()
//                 .mouseDown(botones_adicionales)
//                 .mouseMove({x: -200, y: 0}) // try different value of x
//                 .mouseUp()
//                 .perform();
//             browser.sleep(2000);
//             element(by.buttonText("Yes, I'm sure")).click();
//             browser.sleep(8000);
//             element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
//             var createButton = element(by.buttonText("Create"));
//
//                 expect(createButton.isEnabled()).toBe(false);
//             browser.sleep(3000);
//         });
//
//
//     it('45 Cuando se esta creando un adult concern, se puede cancelar',function () {
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
//         element(by.id("more_button")).click();
//         browser.sleep(4000);
//         element(by.buttonText("Step 1: Empathy Step")).click();
//         browser.sleep(2000);
//
//         var botones_adicionales=element(by.binding("childsConcern.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(2000);
//
//         element(by.buttonText("Yes, I'm sure")).click();
//         browser.sleep(8000);
//
//         element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
//         element(by.tagName("textarea")).sendKeys("Adult Concern 1");
//         element(by.buttonText("Cancel")).click();
//
//
//         browser.sleep(3000);
//         expect(browser.getTitle()).toEqual("Define Adult's Concern");
//     });
//
//
//
//     it('46 Crear un adult concern',function () {
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
//         element(by.id("more_button")).click();
//         browser.sleep(4000);
//         element(by.buttonText("Step 1: Empathy Step")).click();
//         browser.sleep(2000);
//
//         var botones_adicionales=element(by.binding("childsConcern.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(2000);
//
//         //element(by.buttonText("Yes, I'm sure")).click();
//         browser.sleep(8000);
//
//         element(by.className("watchlist_menu button button-small button-clear button-positive")).click();
//         element(by.tagName("textarea")).sendKeys("Adult Concern First");
//         element(by.buttonText("Create")).click();
//
//
//         browser.sleep(3000);
//         expect(element(by.binding("adultsConcern.description")).getText()).toBe("Adult Concern First");
//     });
//
//
//     // it('47 Cuando se esta editando un adult concern no se puede dejar el campo de Adult concern vacio',function () {
//     //     element(by.id("child_selected")).click();
//     //     browser.sleep(5000);
//     //     element(by.id("laggingSkillsID")).click();
//     //
//     //     element(by.binding("laggingSkill.description")).click();
//     //     browser.sleep(4000);
//     //
//     //     var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//     //     browser.actions()
//     //         .mouseDown(botones_adicionales)
//     //         .mouseMove({x: -200, y: 0}) // try different value of x
//     //         .mouseUp()
//     //         .perform();
//     //     browser.sleep(3000);
//     //     element(by.id("more_button")).click();
//     //     browser.sleep(4000);
//     //     element(by.buttonText("Step 1: Empathy Step")).click();
//     //     browser.sleep(2000);
//     //
//     //     var botones_adicionales=element(by.binding("childsConcern.description"));
//     //     browser.actions()
//     //         .mouseDown(botones_adicionales)
//     //         .mouseMove({x: -200, y: 0}) // try different value of x
//     //         .mouseUp()
//     //         .perform();
//     //     browser.sleep(2000);
//     //
//     //     //element(by.buttonText("Yes, I'm sure")).click();
//     //     browser.sleep(8000);
//     //
//     //
//     //         var botones_adicionales= element(by.binding("adultsConcern.description"));
//     //         browser.actions()
//     //             .mouseDown(botones_adicionales)
//     //             .mouseMove({x: -63, y: 0}) // try different value of x
//     //             .mouseUp()
//     //             .perform();
//     //         browser.sleep(3000);
//     //         element(by.id("edit_button")).click();
//     //         browser.sleep(4000);
//     //
//     //
//     //         // var botones_adicionales=element(by.binding("childsConcern.description"));
//     //         // browser.actions()
//     //         //     .mouseDown(botones_adicionales)
//     //         //     .mouseMove({x: -200, y: 0}) // try different value of x
//     //         //     .mouseUp()
//     //         //     .perform();
//     //         // browser.sleep(2000);
//     //         //
//     //         // element(by.buttonText("No, keep drilling")).click();
//     //         // browser.sleep(2000)
//     //         // element(by.id("edit_button")).click();
//     //         // browser.sleep(2000);
//     //         // element(by.model("editableChildsConcern.description")).clear().sendKeys("");
//     //         // browser.sleep(2000);
//     //         //
//     //         // var createButton = element(by.buttonText("Save"));
//     //         // expect(createButton.isEnabled()).toBe(false);
//     //     browser.sleep(5000);
//     //     });
//
//
//
//     // it('48',function () {
//     //     element(by.id("child_selected")).click();
//     //         browser.sleep(5000);
//     //         element(by.id("laggingSkillsID")).click();
//     //
//     //         element(by.binding("laggingSkill.description")).click();
//     //         browser.sleep(4000);
//     //
//     //         var botones_adicionales= element(by.binding("unsolvedProblem.description"));
//     //         browser.actions()
//     //             .mouseDown(botones_adicionales)
//     //             .mouseMove({x: -200, y: 0}) // try different value of x
//     //             .mouseUp()
//     //             .perform();
//     //         browser.sleep(3000);
//     //         element(by.id("more_button")).click();
//     //         browser.sleep(4000);
//     //         element(by.buttonText("Step 1: Empathy Step")).click();
//     //         browser.sleep(2000);
//     //
//     //         var botones_adicionales=element(by.binding("childsConcern.description"));
//     //         browser.actions()
//     //             .mouseDown(botones_adicionales)
//     //             .mouseMove({x: -200, y: 0}) // try different value of x
//     //             .mouseUp()
//     //             .perform();
//     //         browser.sleep(2000);
//     //
//     //         //element(by.buttonText("Yes, I'm sure")).click();
//     //         browser.sleep(8000);
//     //
//     // });
//
//     it('52',function () {
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
//         element(by.id("more_button")).click();
//         browser.sleep(4000);
//         element(by.buttonText("Step 1: Empathy Step")).click();
//         browser.sleep(2000);
//
//         var botones_adicionales=element(by.binding("childsConcern.description"));
//         browser.actions()
//             .mouseDown(botones_adicionales)
//             .mouseMove({x: -200, y: 0}) // try different value of x
//             .mouseUp()
//             .perform();
//         browser.sleep(2000);
//
//         //element(by.buttonText("Yes, I'm sure")).click();
//         //browser.sleep(8000);
//
//         element.all(by.className("item item-divider")).then(function (items) {
//             console.log("===========================================================");
//             console.log(items[0].getText());
//             console.log(items[1].getText());
//             expect(items[0].getText()).toBe("My worry is..")
//         })
//     });


});
