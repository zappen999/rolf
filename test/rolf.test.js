const chai = require('chai');
const expect = chai.expect;

const Rolf = require('../lib/rolf');

describe('Rolf', () => {
  describe('End reach check', () => {
    it('should return true if the buffer contains the end message', () => {
      const r = new Rolf(null, 0, null, {test: true});
      expect(r._hasReachedEnd()).to.equal(false);
      r._buf = Buffer.from('asdfjoiasdjfoijdf\r\n\r\n');
      expect(r._hasReachedEnd()).to.equal(true);
    });
  });

  describe('Handle incoming data', () => {
    it('should append the buffer on incoming data', () => {
      const r = new Rolf(null, 0, null, {test: true});
      expect(r._buf.length).to.equal(0);
      r._handleData('the new data');
      expect(r._buf.length).to.equal(12);
      r._handleData('more');
      expect(r._buf.length).to.equal(16);
    });
  });
});
