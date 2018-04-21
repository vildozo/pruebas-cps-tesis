// exports.config = {
//     framework: 'jasmine2',
//     directConnect: true,
//
//     seleniumAddress: 'http://localhost:4444/wd/hub',
//     specs: ["firstChildManagement.js", "firstChildALSUPLaggingSkills.js", "firstChildALSUPUnsolvedProblems.js", "firstChildEmpathyStep.js",
//         "firstChildAdultConcernStep.js", "firstChildInvitationStep.js", "secondChildManagement.js", "secondChildALSUPLaggingSills.js",
//         "secondChildALSUPUnsolvedProblems.js"],
//
//
//     jasmineNodeOpts: {
//         showColors: true,
//         defaultTimeoutInterval: 2500000
//     },
//
//     capabilities: {
//         browserName: 'chrome'
//     },
//
//     onPrepare: function () {
//         var jasmineReporters = require('jasmine-reporters');
//         jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
//             consolidateAll: true,
//             filePrefix: 'xmloutput',
//             savePath: 'testresults'
//         }));
//     }
// }



// exports.config = {
//
//     seleniumAddress: 'http://localhost:4444/wd/hub',
//     specs: ["firstChildManagement.js","firstChildALSUPLaggingSkills.js","firstChildALSUPUnsolvedProblems.js","firstChildEmpathyStep.js",
//         "firstChildAdultConcernStep.js","firstChildInvitationStep.js","secondChildManagement.js","secondChildALSUPLaggingSills.js",
//         "secondChildALSUPUnsolvedProblems.js"],
//     onPrepare: function() {
//         var SpecReporter = require('jasmine-spec-reporter');
//         // add jasmine spec reporter
//         jasmine.getEnv().addReporter(new SpecReporter({
//             displayStacktrace: 'all',
//             displayPendingSpec: true
//         }));
//     },
// };






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
  specs: [
      // "firstChildManagement.js", "firstChildALSUPLaggingSkills.js", "firstChildALSUPUnsolvedProblems.js",
      //     "firstChildEmpathyStep.js", "firstChildAdultConcernStep.js", "firstChildInvitationStep.js",
          "secondChildManagement.js", "secondChildALSUPLaggingSills.js"
      //,"secondChildALSUPUnsolvedProblems.js"
      // ,   "secondChildEmpathyStep.js"
      ],

    jasmineNodeOpts:{
      showColors: true,
        defaultTimeoutInterval: 2500000
    }
}