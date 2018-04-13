//
//exports.config = {
//  directConnect: true,//runs selenium webdriver y el browser por defecto solo para chrome y firefox
//  framework: 'jasmine',
//  //seleniumAddress: 'http://localhost:4444/wd/hub', //Se comenta porque se puso directConnect:true y ya no se necesita
//  specs: ['firstTest.js'],
//  
////Options to be passed to Jasmine.
//  jasmineNodeOpts: {
//    defaultTimeoutInterval: 30000 //time to kill test 30 seconds
//  }
//
//}

exports.config = {
  framework: 'jasmine',
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ["firstChildManagement.js","firstChildALSUPLaggingSkills.js","firstChildALSUPUnsolvedProblems.js"],

    jasmineNodeOpts:{
      showColors: true,
        defaultTimeoutInterval: 2500000
    }
}