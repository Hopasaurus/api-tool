import {isOpenApiv2, Spectral} from '@stoplight/spectral';


// these desperately need to move to an external file:
const rules = {
  functions: {},
  exceptions: {},
  rules: {
    rule0: {
      description: "swagger falsey",
      severity: "info",
      given: "$.info",
      then: {
        field: "version",
        function: "falsy"
      }
    },
    'post-return-code': {
      description: "{{path}} return code is not allowed for POST",
      message: "Return code for POST must be one of: 200, 201, 400, 401, 404",  // look for the rest
      given: "$..post.responses",
      severity: "error",
      then: {
        field: "@key",
        function: "enumeration",
        functionOptions: {
          values: ['200', '201', '400', '401', '404', '418']
        }
      }
    },
    'short-and-stout': {
      message: "I'm a little teapot, short and stout",  // look for the rest
      given: "$..post.responses",
      severity: "info",
      then: {
        field: "@key",
        function: "pattern",
        functionOptions: {
          notMatch: '^418$'
        }
      }
    },
    'no-x-tag-path-in-info': {
      message: "x.y.z - x-tag must NOT be in $.info",
      given: "$.info",
      severity: "error",
      then: {
        field: "x-tag-path",
        function: "falsy"
      }
    },
    'x-tag-info-must-be-in-info': {
      message: "x.y.z - x-tag-into must be in $.info",
      given: "$.info",
      severity: "error",
      then: {
        field: "x-tag-info",
        function: "truthy"
      }
    },
    'x-tag-path-in-each-path': {
      message: "x.y.z - x-tag-path must be in endpoints",
      given: "$..[delete,get,patch,post,put]",
      severity: "error",
      then: {
        field: "x-tag-path",
        function: "truthy"
      }
    },
    'x-tag-info-must-not-be-in-path': {
      message: "x.y.z - x-tag-info must NOT be in endpoints",
      given: "$..[delete,get,patch,post,put]",
      severity: "error",
      then: {
        field: "x-tag-info",
        function: "falsy"
      }
    },
  }
};

export default class Validator {
  constructor() {
    this.spectral = new Spectral();
    this.spectral.registerFormat("oas2", isOpenApiv2);
    this.initialized = false;
    this.pending = false;

    // I am not sure how to get rules in a local object to play nice with loadRuleSet.
    this.spectral.setRuleset(rules);
    //this.spectral
    //  .loadRuleset("spectral:oas")
    //  .then(() => this.initialized = true);
    this.initialized = true;
  }

  validate(input, done) {
    if (!this.initialized) {
      console.log('waiting for spectral initialization...');
      setTimeout(() => this.validate(input, done), 100);
    }

    // this debouncing could be replaced with rxjs
    // also if doing that, reset the time out each time to make typing smoother
    this.input = input;
    if (this.pending) {
      console.log("validation pending");
      return;
    }
    this.pending = true;


    console.dir('validation queued');

    setTimeout(() => {
      console.dir('validation start');
      const start = new Date();
      this.spectral.run(this.input)
        .then(results => {
          console.log("here are the results", results);
          done(results);
          console.dir('validation done');
          const end = new Date();
          const diff = end - start;
          console.log(`Elapsed: ${diff / 1000}`);
          this.pending = false;
        });
    }, 1500);
  }
}
