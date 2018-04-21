var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {
    it('11 Acceder a ALSUP de un Child y visualizar botones de lagging Skills y unsolved problem', function () {
        element(by.id("child_selected")).click();
        browser.sleep(2000);

        expect(element(by.tagName('h2')).getText()).toBe('ALSUP');
        expect(element(by.id("laggingSkillsID")).getText()).toBe('Lagging Skills');
        expect(element(by.id("unsolvedProblemsID")).getText()).toBe('Unsolved Problems');
    });


    it('12 Ingresar a los Lagging Skills y marcar uno', function () {
        element(by.id("laggingSkillsID")).click();

        element.all(by.binding("laggingSkill.description")).then(function (items) {
            funcionesAuxiliares.desplazarElemento(-200,0,items[0]);
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
        funcionesAuxiliares.desplazarElemento(-200,0,marcado);
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

});
