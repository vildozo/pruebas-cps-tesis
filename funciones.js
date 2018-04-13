var auxiliares = function (){

    this.browserDisplay = function (){
        browser.driver.manage().window().setSize(750, 800);
        browser.driver.manage().window().setPosition(800, 0);
    };

    this.desplazarElemento = function (ejeX, ejeY, elemento) {
        browser.actions()
            .mouseDown(elemento)
            .mouseMove({x: ejeX, y: ejeY}) // try different value of x
            .mouseUp()
            .perform();
    };


    this.printSepartorAndElement = function (elemento) {
        console.log("====================================================================================================");
        console.log(elemento);
    };


    this.sleep = function (segundos) {
        var tiempo = segundos * 1000;
        browser.sleep(tiempo);
    };

    this.waitForElementToBeClickable = function (elemento, tiempo) {
        var EC = protractor.ExpectedConditions;
        var elm = elemento;

        browser.wait(EC.elementToBeClickable(elm), tiempo);
        elm.click();
        // or browser.actions().touchActions().tap(elm).perform();
    };







};

exports.auxiliares = auxiliares;
