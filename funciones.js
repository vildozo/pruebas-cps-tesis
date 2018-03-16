
function desplazarElemento(ejeX, ejeY, elemento) {
    browser.actions()
        .mouseDown(elemento)
        .mouseMove({x: ejeX, y: ejeY}) // try different value of x
        .mouseUp()
        .perform();
};

function waitForElementToBeClickable(elemento, tiempo) {
    var EC = protractor.ExpectedConditions;
    var elm = elemento;

    browser.wait(EC.elementToBeClickable(elm), tiempo);
    elm.click();
// or browser.actions().touchActions().tap(elm).perform();
};

function printSepartorAndElement(elemento) {
    console.log("====================================================================================================");
    console.log(elemento);
};

function sleep(segundos) {
    var tiempo = segundos * 1000;
    browser.sleep(tiempo);
};

exports.browserDisplay = function (){
    browser.driver.manage().window().setSize(750, 800);
    browser.driver.manage().window().setPosition(800, 0);
};