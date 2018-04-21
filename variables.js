var elementoACapturar = function(){

    this.factoryNewChild = function(){
        element(by.css('title title-left'));
    };

    this.clickOnAddAChild = function(){
        element(by.id('new-child-btn')).click();
    };
    this.childsName = function(){
        (by.id('childs_name'));
    };



    // var factoryNewChild = element(by.css('title title-left'));
    // var addAChild = element(by.id('new-child-btn'));
    // var childsName = element(by.id('childs_name'));
};

exports.elementos = elementoACapturar;
