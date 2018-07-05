
exports.config = {
  framework: 'jasmine',
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
      //"spec.js"
      // "child1.js"

      "firstChildManagement.js"
      , "firstChildALSUPLaggingSkills.js"
      , "firstChildALSUPUnsolvedProblems.js"
      , "firstChildEmpathyStep.js"
      , "firstChildAdultConcernStep.js"
      , "firstChildInvitationStep.js"
      // //
      //

      , "secondChildManagement.js"
      , "secondChildALSUPLaggingSills.js"
      ,"secondChildALSUPUnsolvedProblems.js"

      ,   "secondChildEmpathyStep.js"
      , "secondChildAdultConcernStep.js"
      , "secondChildInvitationStep.js"
      ],

    jasmineNodeOpts:{
      showColors: true,
        defaultTimeoutInterval: 2500000
    }
}