const chai = require('chai');
const expect = chai.expect;

const Response = require('../lib/response');

describe('Response', () => {
  describe('Constructor', () => {
    it('should set the response data', () => {
      const res = new Response('theresponse');
      expect(res._data).to.equal('theresponse');
    });
  });

  describe('Parse', () => {

  });

  describe('Parse status line', () => {
    it('should extract version', () => {
      const r = 'RTSP/1.0 200 OK response';
      const res = new Response();
      const rs = res._parseStatusLine(r);

      expect(rs.version).to.equal('RTSP/1.0');
      expect(rs.statusCode).to.equal(200);
      expect(rs.reasonPhrase).to.equal('OK response');
    });
  });

  describe('Getters and setters', () => {
    it('should get and set the status code', () => {
      const res = new Response();
      res.status = 200;
      expect(res.status).to.equal(200);
    });
  });

  describe('Get version', () => {
    it('should get and set the version', () => {
      const res = new Response();
      res.version = 'RTSP/1.0';
      expect(res.version).to.equal('RTSP/1.0');
    });
  });

  describe('Get reason phrase', () => {
    it('should get and set the reason phrase', () => {
      const res = new Response();
      res.reasonPhrase = 'reason';
      expect(res.reasonPhrase).to.equal('reason');
    });
  });
});
