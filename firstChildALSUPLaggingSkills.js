var funciones = require('./funciones.js');
var funcionesAuxiliares = new funciones.auxiliares;

describe('Protractor Children Management', function() {
    it('11 Acceder a ALSUP de un Child y visualizar botones de lagging Skills y unsolved problem', function () {

        element(by.className("col col-50 button button-small button-balanced")).click();
        browser.sleep(3000);

        expect(element(by.tagName('h2')).getText()).toBe('ALSUP');
        element.all(by.className("item item-thumbnail-left")).getText().then(function (items) {
            expect(items[0]).toBe('Lagging Skills');
            expect(items[1]).toBe('Unsolved Problems');
        });
    });


    it('12 Marcar un Lagging Skills', function () {
        element.all(by.className("item item-thumbnail-left")).then(function (items) {
            items[0].click();
        });
        var ls= element(by.binding("laggingSkill.description"));
            funcionesAuxiliares.desplazarElemento(-200, 0, ls);
            browser.sleep(5000);
            element.all(by.className("button-positive ion-checkmark button")).then(function (botones) {
                botones[0].click();
            });
        browser.sleep(2000);
        var lsMarcado= element.all(by.binding("laggingSkill.description"));
            expect(lsMarcado.getAttribute('class')).toMatch('positive ng-binding');

    });


    it('13 Ingresar a los Lagging Skills y desmarcar uno lagging Skill previamente marcado', function () {
        var marcado = element(by.className("positive ng-binding"));
        funcionesAuxiliares.desplazarElemento(-200,0,marcado);
        element(by.className("button-dark ion-close")).click();
        browser.sleep(3000);
        element.all(by.binding("laggingSkill.description")).then(function (items) {

            expect(items[0].getAttribute('class')).toMatch('dark ng-binding');
            // expect(items[0].getCssValue('color')).toBe('rgba(68, 68, 68, 1)');
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
