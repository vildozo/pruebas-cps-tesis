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

    function waitForElementToBeClickable(elemento,tiempo){
        var EC = protractor.ExpectedConditions;
        var elm = elemento;

        browser.wait(EC.elementToBeClickable(elm), tiempo);
        elm.click();
// or browser.actions().touchActions().tap(elm).perform();
    };

    function printSepartorAndElement(elemento){
      console.log("====================================================================================================");
      console.log(elemento);
    };

    function sleep(segundos){
        var tiempo=segundos*1000;
        browser.sleep(tiempo);
    };

  beforeEach(function() {

      browser.driver.manage().window().setSize(750, 800);
      browser.driver.manage().window().setPosition(800, 0);
  });


    it('1 Open app on the Manage Children View', function() {
        browser.get('http://localhost:8100');
        expect(browser.getTitle()).toEqual('Manage Children');
    });

    it('2 No Child registered message', function() {

        expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
    });

    it('3 Button Create disable when creating a new child when name field is empty', function() {
        addAChild.click();
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
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
    });

    it('5 Cancel option when registering a "New Child" ', function() {
        browser.get('http://localhost:8100');
        addAChild.click();
        titleModalNewChild = element(by.id('head_New_Child'));
        expect(titleModalNewChild.getText()).toEqual("New Child");
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);

        expect(browser.getTitle()).toEqual('Manage Children');
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
    });


    it('9 Delete a Child', function() {
        var moreButton= element(by.id('moreButton'));
        moreButton.click();
        element(by.buttonText("Delete child")).click();
        browser.sleep(1000);
        element(by.buttonText("OK")).click();
        browser.sleep(1000);

        expect(element(by.id('NoChildRegistered')).getText()).toEqual("PLEASE REGISTER ONE ABOVE");
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
        var mypic = element(by.css("img[src*='girl.png']"));
        expect(mypic.isPresent()).toBe(true);
//          logger.log('info','');
    });


    it('11 Acceder a ALSUP de un Child y visualizar botones de lagging Skills y unsolved problem', function () {
        element(by.id("child_selected")).click();
        browser.sleep(2000);

        expect(element(by.tagName('h2')).getText()).toBe('ALSUP');
        expect(element(by.id("laggingSkillsID")).getText()).toBe('Lagging Skills');
        expect(element(by.id("unsolvedProblemsID")).getText()).toBe('Unsolved Problems');
    });
// //======================================A L S U P=======================================================================

    it('12 Ingresar a los Lagging Skills y marcar uno', function () {
        element(by.id("laggingSkillsID")).click();

        element.all(by.binding("laggingSkill.description")).then(function (items) {
            desplazarElemento(-200,0,items[0]);
            element.all(by.className("button-positive ion-checkmark button")).then(function (botones) {
                botones[0].click();
            });
            browser.sleep(2000);
            var marcado = element(by.className("positive ng-binding"));
            expect(marcado.getCssValue('color')).toBe('rgba(56, 126, 245, 1)');
        });
    });


    it('13 Ingresar a los Lagging Skills y desmarcar uno lagging Skill previamente marcado', function () {
        var marcado = element(by.className("positive ng-binding"));
        desplazarElemento(-200,0,marcado);
        element(by.className("button-dark ion-close")).click();
        browser.sleep(3000);
        element.all(by.binding("laggingSkill.description")).then(function (items) {

            expect(items[0].getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
        });
    });

    it('14 al hacer click en un lagging skills se mostrara la vista de unsolved problems', function () {
        element.all(by.binding("laggingSkill.description")).then(function (items) {
            items[0].click();
        });
        browser.sleep(4000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });

    it('15 debe mostrar el nombre del child en la vista de unsolved problems',function () {
        element(by.binding("activeChild.first_name")).getText().then(function (text) {

            expect(text).toBe("Maria Coloma");
        });
    });


//
//
// //=========================U N S O L V E D     P R O B L E M S==========================================================

    it('16 se puede acceder directamente a la vista de unsolved problems desde la vista de ALSUP', function () {
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        waitForElementToBeClickable(element(by.id("unsolvedProblemsID")),1000);
        browser.sleep(1000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });
//
//
    it('17 El boton para crear unsolved problem estara inhabilitado mientras este vacio el campo de unsolved problems',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });

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
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
        element(by.buttonText("Cancel")).click();
        browser.sleep(3000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });


    it('20 al tener un unsolved problem creado el lagging skill correspondiente se marcara de forma automatica', function () {
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        element(by.id("laggingSkillsID")).click();
        element.all(by.binding("laggingSkill.description")).then(function (items) {
            var marcado = items[0];
            expect(marcado.getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
        });
    });

//

    it('21 Al editar no se puede dejar los campos de un unsolved problem sin llenar', function () {
        element.all(by.binding("laggingSkill.description")).then(function (items) {
            var marcado = items[0].click();
        });
        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        element(by.id("edit_button")).click();
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
        element(by.id("edit_button")).click();
        element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Probando Boton Cancelar");
        element(by.buttonText("Cancel")).click();

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1 EDITADO");
    });
//
//

    it('24 Al apretar el boton de cancelar en el mensaje de confirmacion para borrar, no borrara el unsolved problem', function () {
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        // browser.sleep(1000);
        element(by.id("laggingSkillsID")).click();
        element.all(by.binding("laggingSkill.description")).then(function(items){
            items[0].click();
        });
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
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (botones) {
            botones[0].click();
        });
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
        element(by.buttonText("Create")).click();
        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (botones) {
            botones[0].click();
        });
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 2");
        element(by.buttonText("Create")).click();
        browser.sleep(2000);
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            items[1].getText().then(function (text) {

                expect(text).toBe("Unsolved Problem 2");
            });
        });
    });

    it('27 Borrar un unsolved problem', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[0];
            desplazarElemento(-200,0,botones_adicionales);
            sleep(1);
            element.all(by.id("delete_button")).then(function (items) {
                items[0].click();
            });
            sleep(10);
            element(by.buttonText("OK")).click();
            browser.sleep(1000);

            expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 2");
        });
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
        browser.get('http://localhost:8100');
        element(by.id("child_selected")).click();
        browser.sleep(2000);
        element(by.id("laggingSkillsID")).click();
        // element(by.binding("laggingSkill.description")).click();
        element.all(by.binding("laggingSkill.description")).then(function (items) {
           items[0].click();
        });


        browser.sleep(2000);
        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(2000);
        element(by.id("more_button")).click();
        browser.sleep(2000);
        element(by.buttonText("Step 3: Invitation Step")).click();
        browser.sleep(2000);
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();

            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("You have to finish previous steps to continue.");
        };
        //

    });



// //==============================E M P A T H Y     S T E P==============================================================
    it('30 En la opciones de un unsolved problem debe permitir ingresar al step 2(Empathy step)', function () {
        browser.driver.switchTo().activeElement();
        browser.sleep(3000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);

        var botones_adicionales= element(by.binding("unsolvedProblem.description"));
        desplazarElemento(-200,0,botones_adicionales);
        browser.sleep(3000);
        element(by.id("more_button")).click();
        browser.sleep(2000);
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
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
           boton[0].click();
           sleep(3);
        });
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('33 Se puede cancelar la creacion de un nuevo child concern',function () {
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);
        expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
    //     browser.sleep(1000);
    });

    it('34 Crear un nuevo child concern',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
           boton[0].click();
        });
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
        browser.sleep(3000);
        element(by.id("edit_button")).click();
        browser.sleep(3000);
        element(by.model("editableChildsConcern.description")).clear().sendKeys("");
        browser.sleep(3000);
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


    it('41 Cuando se desea pasar al step 2(Adult concern), se visualizara un mensaje',function () {
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionalesCC =items[0];
            desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();

            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Have you drilled enough to get all your child's concerns?");
            element(by.buttonText("No, keep drilling")).click();
        };
        browser.sleep(2000);
    });

    //     it('42 Al visualizar mensaje si se desea pasar a Adults concern se puede cancelar',function () {
//         browser.sleep(2000);
//         var botones_adicionalesCC=element(by.binding("childsConcern.description"));
//         desplazarElemento(-200,0,botones_adicionalesCC);
//         browser.sleep(2000);
//         element(by.buttonText("No, keep drilling")).click();
//         browser.sleep(8000);
//
//         expect(browser.getTitle()).toEqual('Empathy Step');
//     });

    it('42 Al visualizar mensaje si se desea pasar a Adults concern se puede cancelar',function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (childConcerns) {
            var botones_adicionalesCC = childConcerns[0];
            desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        //
        //
        element(by.buttonText("No, keep drilling")).click();
        browser.sleep(8000);
        //
        expect(browser.getTitle()).toEqual('Empathy Step');
    });


// // //===================================A D U L T ' S      C O N C E R N ==============================================
// // //
// // //
//
//
    it('43 Pasar de empathy step a adults concerns',function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (childConcerns) {
            var botones_adicionalesCC = childConcerns[0];
            desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        element(by.buttonText("Yes, I'm sure")).click();
        browser.sleep(8000);

        expect(browser.getTitle()).toEqual("Define Adult's Concern");
    });


     it('44 No se puede crear un adult concern con los campos vacios',function () {
        browser.sleep(2000);
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function(items){
            items[0].click();
        });
        var createButton = element(by.buttonText("Create"));

            expect(createButton.isEnabled()).toBe(false);
        browser.sleep(3000);
    });


    it('45 Cuando se esta creando un adult concern, se puede cancelar',function () {
        element(by.buttonText("Cancel")).click();
        browser.sleep(3000);

        expect(browser.getTitle()).toEqual("Define Adult's Concern");
    });



    it('46 Crear un adult concern',function () {
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

    it('47 Crear un segundo adult concern',function () {
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




// // //==========================I N V I T A T I O N     S T E P==========================================================
    it('48 pasar de adult concern a invitation step Se debe visualizar el titulo Invitation Step',function () {
        browser.sleep(2000);

        // var ac=element(by.binding("adultsConcern.description"));
        // desplazarElemento(-200,0,ac);
        element.all(by.binding("adultsConcern.description")).then(function (adultConcern) {
           var ac = adultConcern[0];
            desplazarElemento(-200,0,ac);
        });
        expect(browser.getTitle()).toBe("Invitation Step");
    });

    it("49 en el invitation step se tiene que visualizar el unsolved problema",function () {
        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 2");
    });

     it('50 Visualizar child concern con mayor prioridad y Primer Adult adult concern',function () {
         expect(element(by.binding("childsConcerns[0].description")).getText()).toBe("Child Concern 1");
         expect(element(by.binding("adultsConcerns[0].description")).getText()).toBe("Adult Concern First");
     });


    it('51 Expandir Child Concerns',function () {
        element(by.id("expand_childs_concern")).click();
        sleep(2);
        element.all(by.binding("childConcern.description")).then(function (items) {
            expect(items[0].getText()).toBe("Child Concern 1");
            expect(items[1].getText()).toBe("Child Concern 2");
            expect(items.length).toEqual(2);
        });
        sleep(2);
    });

    it('52 Expandir Adult Concerns',function () {
        element(by.id("expand_adults_concern")).click();
        sleep(2);
        element.all(by.binding("adultConcern.description")).then(function (items) {
            expect(items[0].getText()).toBe("Adult Concern First");
            expect(items[1].getText()).toBe("Adult Concern Second");
            expect(items.length).toEqual(2);
        });
        sleep(2);
    });

    it('53 Contraer Child Concerns',function () {
        element(by.id("expand_childs_concern")).click();
        sleep(2);
        expect(element(by.binding("childsConcerns[0].description")).getText()).toBe("Child Concern 1");
        sleep(2);
    });

    it('54 Contraer Adult Concerns',function () {
        element(by.id("expand_adults_concern")).click();
        sleep(2);
        expect(element(by.binding("adultsConcerns[0].description")).getText()).toBe("Adult Concern First");
        sleep(2);
    });

    it('55 no se puede crear un Possible solution con los campos vacios',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        })
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('56 Se debe poder cancelar la creacion de un possible Solution',function () {
        var createButton = element(by.buttonText("Cancel")).click();
        browser.sleep(2000);

        expect(element(by.id("message")).getText()).toBe("No possible solutions registered. Please register one above, once you agree upon a solution.");

    });

    it('57 Crear un possible solution',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("First Possible Solution");
        element(by.buttonText("Create")).click();

        expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution")

    });

    it("58 Cuando se esta editando no se pueden dejar los campos en blanco",function () {
       var possible_solution =  element(by.binding("solution.description"));
        desplazarElemento(-200,0,possible_solution);
        browser.sleep(2000);
        element(by.id("edit_button")).click();
        element(by.model("editableSolution.description")).clear();

        expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
        browser.sleep(1000);
    });

    it("59 eDITAR UNSOLVED PROBLEMS",function () {
        element(by.model("editableSolution.description")).clear().sendKeys("First Possible Solution EDITADO");
        element(by.buttonText("Save")).click();
        browser.sleep(3000);

        expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution EDITADO");
        browser.sleep(2000);
    });


    it('60 del Invitation Step se puede hacer usar los botones de navegacion e ir al Empathy Step',function () {
        element(by.className("icon step1")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Empathy Step");
        browser.sleep(1000);
    });

    it('61 del Empathy  Step se puede hacer usar los botones de navegacion e ir al Invitation Step',function () {
        element(by.className("icon step3")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Invitation Step");
        browser.sleep(1000);
    });

    it('62 del Invitation Step se puede hacer usar los botones de navegacion e ir al Adults Concern Step',function () {
        element(by.className("icon step2")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Define Adult's Concern");
        browser.sleep(1000);
    });

    it('63 del Define Adults Concern Step se puede hacer usar los botones de navegacion e ir al Empathy Step',function () {
        element(by.className("icon step1")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Empathy Step");
        browser.sleep(1000);
    });


    it('64 de Empathy Step se puede hacer usar los botones de navegacion e ir a Define the Adults concern Step',function () {
        element(by.className("icon step2")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Define Adult's Concern");
        browser.sleep(1000);
    });

    it('65 de Define de Adults Concern Step se puede hacer usar los botones de navegacion e ir a Invitation Step',function () {
        element(by.className("icon step3")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Invitation Step");
        browser.sleep(1000);
    });



    it('66 Se debe poder cancelar en mensaje de advertencia al querer borrar un possible solution', function () {
        var possible_solution =  element(by.binding("solution.description"));
        desplazarElemento(-200,0,possible_solution);
        browser.sleep(2000);
        element(by.id("delete_button")).click();
        browser.sleep(2000);
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);
        expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution EDITADO");
        browser.sleep(5000);
    });

    it('67 borrar un possible solution', function () {
        var possible_solution =  element(by.binding("solution.description"));
        desplazarElemento(-200,0,possible_solution);
        browser.sleep(2000);
        element(by.id("delete_button")).click();
        browser.sleep(2000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);
        expect(element(by.id("message")).getText()).toBe("No possible solutions registered. Please register one above, once you agree upon a solution.")
    });

    it('68 Crear dos possible solution',function () {
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





    //===================================C O M E N T S==================================================================
    it('69 Ir a la vista de Coments',function () {
        element.all(by.binding("solution.description")).then(function (items) {
            var possible_solution =  items[0];
            desplazarElemento(-200,0,possible_solution);
            browser.sleep(3000);
        });

        element.all(by.id("comment_button")).then(function (items) {
            items[0].click();
        });
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Solution's Info");
        expect(element(by.tagName("p")).getText()).toBe("No comments registered. Please register one above.");
    });

    it('70 No se puede crear un comment vacio',function () {
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

    it('72 crear un comment ',function () {
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
            desplazarElemento(-200,0,comment);
        });
        browser.sleep(3000);
        element(by.className("button button-balanced ion-edit button")).click();
        browser.sleep(2000);
        element(by.model("editableComment.description")).clear();
        var createButton =  element(by.buttonText("Save"));
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
            desplazarElemento(-200,0,comment);
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
        desplazarElemento(-200,0,comment);
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







// //============================R A T E      A N     P O S S I B L E     S O L U T I O N=================================

    it("78 Asignarle un Rate triste al primer  possible solution",function () {
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


    it("79 Asignarle un Rate triste al segundo  possible solution",function () {
        element.all(by.className("icon ion-star")).then(function (solution) {
            var radio_button = element(by.className("icon ion-android-radio-button-off"));
            expect(radio_button.isPresent()).toBeTruthy();
            solution[1].click();
            element(by.className("button ng-binding button-energized ion-heart-broken")).click();
            // element(by.buttonText("OK")).click();
            sleep(1);
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

    it("80Mostrar el mejor rating para el unsolved problem",function () {
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


//======================================================================================================================
//====================================C R E A R    U N    S E G U N D O    C H I L D====================================
//======================================================================================================================

    it('81 Button Create disable when creating a new child when name field is empty', function() {
        browser.get('http://localhost:8100');
        addAChild.click();
        element(by.model("child.gender")).element(by.css("[value='Male']")).click();
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
//        logger.log('info','3 Button Create disable when creating a new child when name field is empty');
    });

    it('82 Cant Register a Child with tomorrows Date', function() {
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
        titleModalNewChild = element(by.id('head_New_Child'));
        expect(titleModalNewChild.getText()).toEqual("New Child");
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);

        expect(browser.getTitle()).toEqual('Manage Children');
    });

    it('84 Add Second Child', function() {
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
        element.all(by.id('moreButton')).then(function (items) {
            items[1].click();
            element(by.buttonText("Edit child")).click();
            element(by.model("editableChild.first_name")).clear().sendKeys("Guido Javier Vildozo Mendez");
            element(by.buttonText("Save")).click();
            browser.sleep(2000);
            element.all(by.repeater("child in childs")).then(function (text) {
                expect(text[0].getText()).toContain("Guido Javier Vildozo Mendez");
                expect(text[0].getText()).toContain("22/06/81");
            });
        });
    });


    it('86 When deleteing a Child you can cancel', function() {
        browser.get('http://localhost:8100');
        var moreButton= element(by.id('moreButton'));
        element.all(by.id('moreButton')).then(function (items) {
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


    it('87 Delete a Child', function() {
//         var moreButton= element(by.id('moreButton'));
            element.all(by.id('moreButton')).then(function (items) {
               items[1].click()
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




    //======================================A L S U P=======================================================================

    it('89 Acceder a ALSUP de un Child y visualizar botones de lagging Skills y unsolved problem', function () {
        // element(by.id("child_selected")).click();
        element.all(by.className("col col-50 button button-small button-balanced")).then(function (items) {
            items[0].click();
        });
        browser.sleep(2000);
        //
        expect(element(by.tagName('h2')).getText()).toBe('ALSUP');
        expect(element(by.id("laggingSkillsID")).getText()).toBe('Lagging Skills');
        expect(element(by.id("unsolvedProblemsID")).getText()).toBe('Unsolved Problems');
    });


    it('90 Ingresar a los Lagging Skills y marcar uno', function () {
        element(by.id("laggingSkillsID")).click();

        element.all(by.binding("laggingSkill.description")).then(function (items) {
            desplazarElemento(-200,0,items[1]);
            element.all(by.className("button-positive ion-checkmark button")).then(function (botones) {
                botones[1].click();
            });
            browser.sleep(2000);
            var marcado = element(by.className("positive ng-binding"));
            expect(marcado.getCssValue('color')).toBe('rgba(56, 126, 245, 1)');
        });
    });


    it('91 Ingresar a los Lagging Skills y desmarcar uno lagging Skill previamente marcado', function () {
        var marcado = element(by.className("positive ng-binding"));
        desplazarElemento(-200,0,marcado);
        element(by.className("button-dark ion-close")).click();
        browser.sleep(3000);
        element.all(by.binding("laggingSkill.description")).then(function (items) {

            expect(items[1].getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
        });
    });

    it('92 al hacer click en un lagging skills se mostrara la vista de unsolved problems', function () {
        element.all(by.binding("laggingSkill.description")).then(function (items) {
            items[1].click();
        });
        browser.sleep(4000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });

    it('95 debe mostrar el nombre del child en la vista de unsolved problems',function () {
        element(by.binding("activeChild.first_name")).getText().then(function (text) {

            expect(text).toBe("Marcos Brunet");
        });
    });

//=========================U N S O L V E D     P R O B L E M S==========================================================
    it('93 El boton para crear unsolved problem estara inhabilitado mientras este vacio el campo de unsolved problems',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });

        var createButton = element(by.buttonText("Create"));
        expect(createButton.isEnabled()).toBe(false);
    });

    it('94 Crear Primer Unsolved Problem', function () {
        element(by.model("unsolvedProblem.description")).sendKeys("Unsolved Problem 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 1");
    });


    it('95 al tener un unsolved problem creado el lagging skill correspondiente se marcara de forma automatica', function () {
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

    it('96 se puede acceder directamente desde la vista de ALSUP a la vista de unsolved problems', function () {
        browser.get('http://localhost:8100');
        element.all(by.className("col col-50 button button-small button-balanced")).then(function (items) {
            items[0].click();
        });
        browser.sleep(2000);
        waitForElementToBeClickable(element(by.id("unsolvedProblemsID")),1000);
        browser.sleep(1000);

        expect(element(by.tagName('b')).getText()).toBe('Unsolved Problems');
    });



    it('97 Crear un segundo Unsolved Problem', function () {
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

    it('98 Se puede cancelar la creacion de unsolved problem    9', function () {
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



    it('99 Al editar no se puede dejar los campos de un unsolved problem sin llenar', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales = items[1];
            desplazarElemento(-200,0,botones_adicionales);
            element.all(by.id("edit_button")).then(function (items) {
               items[1].click();
            });
        });
        element(by.model("editableUnsolvedProblem.description")).clear();

        expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
        //browser.sleep(3000);
    });


    it('100 Editar un unsolved problem', function () {
        element(by.model("editableUnsolvedProblem.description")).clear().sendKeys("Unsolved Problem 2 EDITADO");
        element(by.buttonText("Save")).click();
        //browser.sleep(3000);

        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items[1]).toBe("Unsolved Problem 2 EDITADO");
        })

    });

    it('101 Al editar y  modificar datos de un unsolved problem cuando se cancela los datos modificados no deben persistir', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales= items[1];
            desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(1000);
            element.all(by.id("edit_button")).then(function (items) {
                items[1].click();
                browser.sleep(2000);
                element(by.buttonText("Cancel"));
                browser.sleep(1000);
                element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
                   expect(items[1]).toBe("Unsolved Problem 2 EDITADO");
                });
            });
        });
    });


    it('102 Al apretar el boton de cancelar en el mensaje de confirmacion para borrar, no borrara el unsolved problem', function () {
        browser.get('http://localhost:8100');
        element.all(by.className("col col-50 button button-small button-balanced")).then(function (items) {
            items[0].click();
        });
        browser.sleep(1000);
        waitForElementToBeClickable(element(by.id("unsolvedProblemsID")),1000);
        browser.sleep(1000);
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            desplazarElemento(-200,0,botones_adicionales);
            browser.sleep(2000);
            element.all(by.id("delete_button")).then(function (items) {
               items[1].click();
            });
            browser.sleep(1000);
            element(by.buttonText("Cancel")).click();
        });
        element.all(by.binding("unsolvedProblem.description")).getText().then(function (items) {
            expect(items[1]).toBe("Unsolved Problem 2 EDITADO");
        });
    });



    it('103 Al apretar el boton de Aceptar en el mensaje de confirmacion para borrar, borrara el unsolved problem', function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            desplazarElemento(-200,0,botones_adicionales);
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






    it('104 Crear el tercer unsolved problem',function () {
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

    it('105 desde la vista de unsolved problems no se puede pasar al step 2(Adult Concern) sin haber pasado el step 1(Empathy Step)',function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            desplazarElemento(-200,0,botones_adicionales);
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




    it('106 desde la vista de unsolved problems no se puede pasar al step 3(Invitation Step) sin haber pasado el step 1(Empathy Step) y Step 2',function () {
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales=items[1];
            desplazarElemento(-200,0,botones_adicionales);
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


    // //==============================E M P A T H Y     S T E P==============================================================
    it('107 En la opciones de un unsolved problem debe permitir ingresar al step 2(Empathy step)', function () {
        browser.driver.switchTo().activeElement();
        browser.sleep(3000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);

        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
            var botones_adicionales =items[1];
            desplazarElemento(-200,0,botones_adicionales);
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

    it('108 probar mensaje de ayuda en empathy step',function () {

        expect(element(by.id("help_message")).getText()).toMatch("I've noticed that you've been having ");
        element.all(by.binding("unsolvedProblem.description")).then(function (items) {
         expect(items[0].getText()).toContain("Unsolved Problem 3");
        });
        expect(element(by.id("help_message")).getText()).toMatch(", what's up?");
    });

    it('109 No se puede crear un nuevo Child Concern con el campo child concern vacio',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
           boton[0].click();
           browser.sleep(3000);
        });
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('110 Se puede cancelar la creacion de un nuevo child concern',function () {
        element(by.buttonText("Cancel")).click();
        browser.sleep(2000);
        expect(element(by.id("no_childs_message")).getText()).toBe("No child's concern registered. Please register one above.");
    //     browser.sleep(1000);
    });

    it('111 Crear un nuevo child concern',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
           boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Child Concern 1");
        element(by.buttonText("Create")).click();
        browser.sleep(3000);

        expect(element(by.binding("childsConcern.description")).getText()).toBe("Child Concern 1");
    });

    it('112 Crear un segundo child concern',function () {
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


    it('113 Cuando se esta editando no se puede dejar el campo de Child concern vacio',function () {
        // var botones_adicionales=element(by.binding("childsConcern.description"));
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionales = items[1];
            desplazarElemento(-75,0,botones_adicionales);
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

    it('114 Cuando se esta editando se debe poder cancelar y no persistira el cambio',function () {
        element.all(by.buttonText("Cancel")).then(function (items) {
            items[1].click();
        });
        element.all(by.binding("childsConcern.description")).then(function (items) {
            expect(items[1].getText()).toBe("Child Concern 2");
        });
        browser.sleep(2000);
    });


    it('115 Cuando se esta editando y en se guarda el cambio debe persistir',function () {

        // var botones_adicionales=element(by.binding("childsConcern.description"));
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionales = items[1];
            desplazarElemento(-200,0,botones_adicionales);
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

    it('38 Al borrar cuando se visualiza el mensaje de confirmacion, se debe poder cancelar la eliminacion de un Child Concern',function () {
             // browser.get('http://localhost:8100/#/app/unsolvedProblem/show/3');
            // var botones_adicionalesCC=element(by.binding("childsConcern.description"));
            element.all(by.binding("childsConcern.description")).then(function (items) {
                var botones_adicionalesCC = items[1];
                // browser.sleep(20000);
                desplazarElemento(-200,0,botones_adicionalesCC);
                browser.sleep(7000);

            });

            // element.all(by.buttonText("No, keep drilling")).then(function (items) {
            //    items[0].click();
            // });
            browser.sleep(2000);
            element.all(by.id("delete_button")).then(function (items) {
                // printSepartorAndElement(items.length);
               // items[1].click();
            });
            // browser.sleep(2000);
            // element.all(by.buttonText("Cancel")).then(function (items) {
            //    items[1].click();
            // });
            // browser.sleep(2000);

            // element.all(by.binding("childsConcern.description")).then(function (items) {
            //    expect(items[1].getText()).toBe("Child Concern 2 EDITADO");
            // });
        });

    it('39 Al confirmar el mensaje de borrar child concern y aceptar, el child concern sera borrado', function () {
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionales=items[1];
            desplazarElemento(-200,0,botones_adicionales);
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


    it('40 se puede crear un nuevo child concern despues de haber borrado un child concern',function () {
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


    it('41 Cuando se desea pasar al step 2(Adult concern), se visualizara un mensaje',function () {
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionalesCC =items[1];
            desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        this.popupContainsHeaderText = function (text) {
            this.popupShouldExist();

            expect(this.popup.element(by.css('.popup-head')).getText()).toMatch("Have you drilled enough to get all your child's concerns?");
            element(by.buttonText("No, keep drilling")).click();
        };
        browser.sleep(2000);
    });

        it('42 Al visualizar mensaje si se desea pasar a Adults concern se puede cancelar',function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (items) {
            var botones_adicionalesCC=items[1];
            desplazarElemento(-200,0,botones_adicionalesCC);
        });
        browser.sleep(2000);
        element(by.buttonText("No, keep drilling")).click();
        browser.sleep(8000);

        expect(browser.getTitle()).toEqual('Empathy Step');
    });

    it('42 Al visualizar mensaje si se desea pasar a Adults concern se puede cancelar',function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (childConcerns) {
            var botones_adicionalesCC = childConcerns[0];
            desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        element(by.buttonText("No, keep drilling")).click();
        browser.sleep(2000);

        expect(browser.getTitle()).toEqual('Empathy Step');
    });


//===================================A D U L T ' S      C O N C E R N ==============================================
//
//


    it('43 Pasar de empathy step a adults concerns',function () {
        browser.sleep(2000);
        element.all(by.binding("childsConcern.description")).then(function (childConcerns) {
            var botones_adicionalesCC = childConcerns[0];
            desplazarElemento(-200,0,botones_adicionalesCC);
            browser.sleep(2000);
        });
        element(by.buttonText("Yes, I'm sure")).click();
        browser.sleep(8000);

        expect(browser.getTitle()).toEqual("Define Adult's Concern");
    });


     it('44 No se puede crear un adult concern con los campos vacios',function () {
        browser.sleep(2000);
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function(items){
            items[0].click();
        });
        var createButton = element(by.buttonText("Create"));

            expect(createButton.isEnabled()).toBe(false);
        browser.sleep(3000);
    });


    it('45 Cuando se esta creando un adult concern, se puede cancelar',function () {
        element(by.buttonText("Cancel")).click();
        browser.sleep(3000);

        expect(browser.getTitle()).toEqual("Define Adult's Concern");
    });



    it('46 Crear un adult concern',function () {
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

    it('47 Crear un segundo adult concern',function () {
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




// // //==========================I N V I T A T I O N     S T E P==========================================================
    it('48 pasar de adult concern a invitation step Se debe visualizar el titulo Invitation Step',function () {
        browser.sleep(2000);

        // var ac=element(by.binding("adultsConcern.description"));
        // desplazarElemento(-200,0,ac);
        element.all(by.binding("adultsConcern.description")).then(function (adultConcern) {
           var ac = adultConcern[1];
            desplazarElemento(-200,0,ac);
        });
        expect(browser.getTitle()).toBe("Invitation Step");
    });

    it("49 en el invitation step se tiene que visualizar el unsolved problema",function () {
        expect(element(by.binding("unsolvedProblem.description")).getText()).toBe("Unsolved Problem 3");
    });

     it('50 Visualizar child concern con mayor prioridad y Primer Adult adult concern',function () {
         expect(element(by.binding("childsConcerns[0].description")).getText()).toBe("Child Concern 1");
         expect(element(by.binding("adultsConcerns[0].description")).getText()).toBe("Adult Concern First");
     });


    it('51 Expandir Child Concerns',function () {
        element(by.id("expand_childs_concern")).click();
        sleep(2);
        element.all(by.binding("childConcern.description")).then(function (items) {
            expect(items[0].getText()).toBe("Child Concern 1");
            expect(items[1].getText()).toBe("Child Concern 3");
            expect(items.length).toEqual(2);
        });
        sleep(2);
    });

    it('52 Expandir Adult Concerns',function () {
        element(by.id("expand_adults_concern")).click();
        sleep(2);
        element.all(by.binding("adultConcern.description")).then(function (items) {
            expect(items[0].getText()).toBe("Adult Concern First");
            expect(items[1].getText()).toBe("Adult Concern Second");
            expect(items.length).toEqual(2);
        });
        sleep(2);
    });

    it('53 Contraer Child Concerns',function () {
        element(by.id("expand_childs_concern")).click();
        sleep(2);
        expect(element(by.binding("childsConcerns[0].description")).getText()).toBe("Child Concern 1");
        sleep(2);
    });

    it('54 Contraer Adult Concerns',function () {
        element(by.id("expand_adults_concern")).click();
        sleep(2);
        expect(element(by.binding("adultsConcerns[0].description")).getText()).toBe("Adult Concern First");
        sleep(2);
    });

    it('55 no se puede crear un Possible solution con los campos vacios',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        })
        var createButton = element(by.buttonText("Create"));

        expect(createButton.isEnabled()).toBe(false);
    });

    it('56 Se debe poder cancelar la creacion de un possible Solution',function () {
        var createButton = element(by.buttonText("Cancel")).click();
        browser.sleep(2000);

        expect(element(by.id("message")).getText()).toBe("No possible solutions registered. Please register one above, once you agree upon a solution.");

    });

    it('57 Crear un possible solution',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("First Possible Solution");
        element(by.buttonText("Create")).click();

        // expect(element(by.binding("solution.description")).getText()).toBe("First Possible Solution")
        element.all(by.binding("solution.description")).then(function (items) {
            expect(items[0].getText()).toBe("First Possible Solution");
            expect(items.length).toEqual(1);
        })


    });

    it('57 Crear un segundo possible solution',function () {
        element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (boton) {
            boton[0].click();
        });
        element(by.tagName("textarea")).sendKeys("Second Possible Solution");
        element(by.buttonText("Create")).click();

        element.all(by.binding("solution.description")).then(function (items) {
            expect(items[0].getText()).toBe("First Possible Solution");
            expect(items[1].getText()).toBe("Second Possible Solution");
            expect(items.length).toEqual(2);
        });
    });

    it("58 Cuando se esta editando no se pueden dejar los campos en blanco",function () {
        element.all(by.binding("solution.description")).then(function (items) {
            var possible_solution = items[1];
            desplazarElemento(-200,0,possible_solution);
        });

        browser.sleep(2000);
        element.all(by.id("edit_button")).then(function (items) {
           items[1].click();
        });
        element(by.model("editableSolution.description")).clear();

        expect(element(by.buttonText("Save")).isEnabled()).toBe(false);
        browser.sleep(1000);
    });

    it("59 eDITAR UNSOLVED PROBLEMS",function () {
        element(by.model("editableSolution.description")).clear().sendKeys("First Possible Solution EDITADO");
        element(by.buttonText("Save")).click();
        browser.sleep(3000);

        element.all(by.binding("solution.description")).then(function (items) {
            expect(items[1].getText()).toBe("First Possible Solution EDITADO");
        });
        browser.sleep(2000);
    });


    it('60 del Invitation Step se puede hacer usar los botones de navegacion e ir al Empathy Step',function () {
        element(by.className("icon step1")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Empathy Step");
        browser.sleep(1000);
    });

    it('61 del Empathy  Step se puede hacer usar los botones de navegacion e ir al Invitation Step',function () {
        element(by.className("icon step3")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Invitation Step");
        browser.sleep(1000);
    });

    it('62 del Invitation Step se puede hacer usar los botones de navegacion e ir al Adults Concern Step',function () {
        element(by.className("icon step2")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Define Adult's Concern");
        browser.sleep(1000);
    });

    it('63 del Define Adults Concern Step se puede hacer usar los botones de navegacion e ir al Empathy Step',function () {
        element(by.className("icon step1")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Empathy Step");
        browser.sleep(1000);
    });


    it('64 de Empathy Step se puede hacer usar los botones de navegacion e ir a Define the Adults concern Step',function () {
        element(by.className("icon step2")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Define Adult's Concern");
        browser.sleep(1000);
    });

    it('65 de Define de Adults Concern Step se puede hacer usar los botones de navegacion e ir a Invitation Step',function () {
        element(by.className("icon step3")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Invitation Step");
        browser.sleep(1000);
    });



    it('66 Se debe poder cancelar en mensaje de advertencia al querer borrar un possible solution', function () {
        element.all(by.binding("solution.description")).then(function (items) {
            var possible_solution =  items[1];
            desplazarElemento(-200,0,possible_solution);
        });

        browser.sleep(2000);
        element.all(by.id("delete_button")).then(function(items){
            items[1].click();
        });
        browser.sleep(2000);
        element.all(by.buttonText("Cancel")).then(function (items) {
           items[0].click();
        });
        browser.sleep(2000);
        element.all(by.binding("solution.description")).then(function (items) {
            expect(items.length).toEqual(2);
        });
    });

    it('67 borrar un possible solution', function () {
        element.all(by.binding("solution.description")).then(function (items) {
            var possible_solution = items[1];
            desplazarElemento(-200,0,possible_solution);
        });

        browser.sleep(2000);
        element.all(by.id("delete_button")).then(function (items) {
           items[1].click();
        });
        browser.sleep(2000);
        element(by.buttonText("OK")).click();
        browser.sleep(2000);
        element.all(by.binding("solution.description")).then(function (items) {
           expect(items.length).toEqual(1);
        });
    });

        it('68 Crear segundo possible solution',function () {
            element.all(by.className("watchlist_menu button button-small button-clear button-positive")).then(function (items) {
               items[0].click();
            });
            element(by.tagName("textarea")).sendKeys("Third Possible Solution");
            browser.sleep(2000);
            element(by.buttonText("Create")).click();
            browser.sleep(2000);


        element.all(by.binding("solution.description")).then(function (items) {

        expect(items[0].getText()).toBe("First Possible Solution");
        expect(items[1].getText()).toBe("Third Possible Solution");
        });
    });





    //===================================C O M E N T S==================================================================
    it('69 Ir a la vista de Coments',function () {
        element.all(by.binding("solution.description")).then(function (items) {
            var possible_solution =  items[1];
            desplazarElemento(-200,0,possible_solution);
            browser.sleep(2000);
        });

        element.all(by.id("comment_button")).then(function (items) {
            items[1].click();
        });
        browser.sleep(2000);
        expect(browser.getTitle()).toBe("Solution's Info");
        expect(element(by.tagName("p")).getText()).toBe("No comments registered. Please register one above.");
    });

    it('70 No se puede crear un comment vacio',function () {
        element(by.className("icon ion-plus")).click();
        var createButton = element(by.buttonText("Create"));
        expect(createButton.isEnabled()).toBe(false);
        browser.sleep(2000);
    });

    it('71 Se puede cancelar la creacion de un comment', function () {
        element(by.tagName("textarea")).sendKeys("First Comment");
        element(by.buttonText("Cancel")).click();
        browser.sleep(1000);
        expect(element(by.tagName("p")).getText()).toBe("No comments registered. Please register one above.");
    });

    it('72 crear un comment ',function () {
        element(by.className("icon ion-plus")).click();
        element(by.tagName("textarea")).sendKeys("First Comment");
        element(by.buttonText("Create")).click();
        browser.sleep(4000);
        // expect(element(by.binding("item.description")).getText()).toContain("First Comment");
        element.all(by.binding("item.description")).getText().then(function (items) {
           expect(items[0]).toContain("First Comment");
        });
    });

    it('72 crear segundo comment ',function () {
        element(by.className("icon ion-plus")).click();
        element(by.tagName("textarea")).sendKeys("Second Comment");
        element(by.buttonText("Create")).click();
        browser.sleep(4000);
        // expect(element(by.binding("item.description")).getText()).toContain("First Comment");
        element.all(by.binding("item.description")).getText().then(function (items) {
            expect(items[0]).toContain("Second Comment");
            expect(items[1]).toContain("First Comment");
        });
    });

    it('73 al editar no se puede dejar los campos vacios', function () {
        element.all(by.binding("item.description")).then(function (items) {
            var comment = items[1];
            desplazarElemento(-200,0,comment);
        });
        browser.sleep(2000);
        element.all(by.className("button button-balanced ion-edit button")).then(function (items) {
           items[1].click();
        });
        browser.sleep(1000);
        element(by.model("editableComment.description")).clear();
        var createButton =  element(by.buttonText("Save"));
        expect(createButton.isEnabled()).toBe(false);
    });


    it('74 al editar Un comment', function () {

        element(by.model("editableComment.description")).clear().sendKeys("Second Comment EDITED");
        element(by.buttonText("Save")).click();
        element.all(by.binding("item.description")).getText().then(function(items){
          expect(items[1]).toContain("Second Comment EDITED")
        });
    });

    it('75 Se puede cancelar cuando se esta borrando un comment', function () {
        element.all(by.binding("item.description")).then(function (items) {
            var comment = items[1];
            desplazarElemento(-200,0,comment);
        });

        browser.sleep(2);
        element.all(by.className("button button-assertive ion-trash-a")).then(function (items) {
           items[1].click();
        });
        browser.sleep(2);
        element(by.className("button ng-binding button-default")).click();
        browser.sleep(2);
        element.all(by.binding("item.description")).getText().then(function (items) {
            expect(items[1]).toContain("Second Comment EDITED");
        });
    });



    it('76 Se puede borrar un comment', function () {
        element.all(by.binding("item.description")).then(function (items) {
            var comment = items[1];
            desplazarElemento(-200,0,comment);
        });
        browser.sleep(1);
        element.all(by.className("button button-assertive ion-trash-a")).then(function (items) {
            items[1].click();
        });
        browser.sleep(1);
        element(by.buttonText("OK")).click();
        browser.sleep(1);
        element.all(by.binding("item.description")).getText().then(function (items) {
            expect(items.length).toBe(1);
        });
    });

    it('77 Se debe volver de los comments al invitation step', function () {
       //element(by.className("button back-button buttons button-clear header-item")).click();
        browser.navigate().back();
        browser.sleep(2);
        expect(browser.getTitle()).toBe("Invitation Step");
    });







// //============================R A T E      A N     P O S S I B L E     S O L U T I O N=================================

    it("78 Asignarle un Rate triste al primer  possible solution",function () {
        element.all(by.className("icon ion-star")).then(function (solution) {
            var radio_button = element(by.className("icon ion-android-radio-button-off"));
            expect(radio_button.isPresent()).toBeTruthy();
            solution[0].click();
            element(by.className("button ng-binding button-assertive ion-sad-outline")).click();
            element(by.buttonText("OK")).click();
            sleep(2);
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


    it("79 Asignarle un Rate triste al segundo  possible solution",function () {
        element.all(by.className("icon ion-star")).then(function (solution) {
            var radio_button = element(by.className("icon ion-android-radio-button-off"));
            expect(radio_button.isPresent()).toBeTruthy();
            solution[1].click();
            element(by.className("button ng-binding button-energized ion-heart-broken")).click();
            // element(by.buttonText("OK")).click();
            sleep(1);
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

    // it("80Mostrar el mejor rating para el unsolved problem",function () {
    //     browser.get('http://localhost:8100');
    //     element(by.id("child_selected")).click();
    //     browser.sleep(2000);
    //     element(by.id("unsolvedProblemsID")).click();
    //     var icon_sad = element(by.className("icon ion-sad"));
    //     var icon_heart_broken = element(by.className("icon ion-heart-broken"));
    //     var icon_heart_ = element(by.className("icon ion-heart"));
    //     var icon_smile_ = element(by.className("icon ion-happy"));
    //
    //     expect(icon_sad.isPresent()).toBeFalsy();
    //     expect(icon_heart_broken.isPresent()).toBeTruthy();
    //     expect(icon_heart_.isPresent()).toBeFalsy();
    //     expect(icon_smile_.isPresent()).toBeFalsy();
    // });


    it("80Mostrar el mejor rating para el unsolved problem",function () {
        browser.get('http://localhost:8100');
        element(by.className("col col-50 button button-small button-balanced")).click();
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