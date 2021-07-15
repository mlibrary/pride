import { expect } from 'chai';

export default function testRequest(requestMethod, requestInfo) {
  describe('sends a valid request', () => {
    it('is given the nessesary fields', () => {
      ['url', 'data', 'method', 'contentType'].forEach((field) => {
        expect(requestInfo[field]).to.be.a('string');
      });
    });

    it('is given the expected method', () => {
      expect(requestInfo.method).to.equal(requestMethod);
    });

    if (requestInfo.type === 'json') {
      describe('when type is "json"', () => {
        it('expects contentType to be application/json', () => {
          expect(requestInfo.contentType).to.equal('application/json');
        });

        it('gives a valid JSON encoded string', () => {
          expect(JSON.parse(requestInfo.data)).to.not.throw();
        });
      });
    }
  });
}
