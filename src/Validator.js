import {isOpenApiv2, Spectral} from '@stoplight/spectral';
import rules from './spectral.json';
// enable use delegate
// use this for mvn build and node check:
// https://github.com/eirslett/frontend-maven-plugin

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
