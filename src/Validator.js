import {isOpenApiv2, Spectral} from '@stoplight/spectral';

function validate(input, done) {
  const spectral = new Spectral();

  console.dir('validating1');
  spectral.registerFormat("oas2", isOpenApiv2);
  console.dir('validating2');

//  spectral.run(input).then(console.log);
  spectral
    .loadRuleset("spectral:oas")
    .then(() => spectral.run(input))
    .then(results => {
      console.log("here are the results", results);
      done(results);
    });
}

export {
  validate,
};