const chai = require('chai'); // eslint-disable-line
const chaiHttp = require('chai-http'); // eslint-disable-line
const server = require('../bin/testing');

chai.use(chaiHttp);
const should = chai.should(); // eslint-disable-line
const {
  assert,
} = chai;

// Example
describe('Array', () => { // eslint-disable-line
  it('should start empty', () => { // eslint-disable-line
    const arr = [];

    assert.equal(arr.length, 0);
  });
});

// Example
describe('Heartbeat', () => { // eslint-disable-line
  it('should return a response', (done) => { // eslint-disable-line
    chai.request(server)
      .get('/api/public/heartbeat')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
