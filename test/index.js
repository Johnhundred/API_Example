const chai = require('chai'); // eslint-disable-line
const chaiHttp = require('chai-http'); // eslint-disable-line
const server = require('../bin/testing');

chai.use(chaiHttp);
const should = chai.should(); // eslint-disable-line
const {
  assert,
  expect, // eslint-disable-line
} = chai;

// Example
describe('Array', () => {
  it('should start empty', () => {
    const arr = [];

    assert.equal(arr.length, 0);
  });
});

describe('Random undefined endpoint', () => {
  it('should return 404', (done) => {
    chai.request(server)
      .get('/e8r9iofj9iewdjfkld')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
