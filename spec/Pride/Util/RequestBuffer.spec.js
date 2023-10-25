const { expect } = require('chai');
const _ = require('underscore');
const Pride = require('../../../pride').Pride;

const defaultObject = {
  success: () => { /** */ },
  failure: () => { /** */ }
};

function testRequest (requestMethod, requestInfo) {
  describe('sends a valid request', function () {
    it('is given the nessesary fields', function () {
      _.each(['url', 'data', 'method', 'contentType'], function (field) {
        expect(typeof requestInfo[field]).to.equal('string');
      });

      expect(typeof requestInfo.url).to.equal('string');
      expect(typeof requestInfo.method).to.equal('string');
      expect(typeof requestInfo.content_type).to.equal('string');
    });

    it('is given the expected method', function () {
      expect(requestInfo.method).to.equal(requestMethod);
    });

    if (requestInfo.type === 'json') {
      describe('when type is "json"', function () {
        it('expects contentType to be application/json', function () {
          expect(requestInfo.contentType).to.equal('application/json');
        });

        it('gives a valid JSON encoded string', function () {
          expect(JSON.parse(requestInfo.data)).not.to.throw();
        });
      });
    }
  });
}

function mockRequestSuccess (requestMethod, result) {
  reqwest = function (requestInfo) {
    testRequest(requestMethod, requestInfo);
    requestInfo.success(Pride.Util.safeCall(result) || {});
  };
}

function mockRequestFailure (requestMethod, result) {
  reqwest = function (requestInfo) {
    testRequest(requestMethod, requestInfo);
    requestInfo.error(Pride.Util.safeCall(result) || {});
  };
}

describe.skip('Pride.Util.RequestBuffer', function () {
  // TODO: test that url, attempts and failure_message can be delayed using a
  // function, get passed into Pride.Util.request()

  beforeEach(function () {
    const self = this;
    this.requestCount = 0;

    mockRequestSuccess('get', function () {
      self.requestCount++;
    });

    this.buffer = new Pride.Util.RequestBuffer({
      url: 'http://www.example.com',
      attempts: 1
    });
  });

  it('does not send the request when it is first created', function () {
    expect(this.requestCount).to.equal(0);
  });

  describe('request()', function () {
    it('sends the request if this is the first time request() was called', function () {
      this.buffer.request(defaultObject);

      expect(this.requestCount).to.equal(1);
    });

    it('does not send the request repeatedly if called more than once', function () {
      this.buffer.request(defaultObject)
        .request(defaultObject);

      expect(this.requestCount).to.equal(1);
    });

    describe('calling callbacks', function () {
      beforeEach(function () {
        const self = this;

        this.called = false;
        this.notCalled = true;
        this.count = 0;
        this.result = { some: 'data' };

        this.calledChecker = function () {
          self.called = true;
        };
        this.notCalledChecker = function () {
          self.notCalled = false;
        };
        this.increment = function () {
          self.count++;
        };
      });

      describe('when request is a success', function () {
        beforeEach(function () {
          const self = this;
          mockRequestSuccess('get', function () {
            return self.result;
          });
        });

        it('calls the success function, does not call the failure function', function () {
          this.buffer.request({
            success: this.calledChecker,
            failure: this.notCalledChecker
          });

          expect(this.called).to.be.true;
          expect(this.notCalled).to.be.true;
        });

        it('can chain calls', function () {
          this.buffer.request({ success: this.increment })
            .request({ success: this.increment })
            .request({ success: this.increment });

          expect(this.count).to.equal(3);
        });

        it('passes response data into given function', function () {
          let givenFirst;
          let givenSecond;
          this.buffer.request({
            success: function (data) {
              givenFirst = data;
            }
          })
            .request({
              success: function (data) {
                givenSecond = data;
              }
            });

          expect(givenFirst).to.equal(this.result);
          expect(givenSecond).to.equal(this.result);
        });
      });

      describe('when request is a failure', function () {
        beforeEach(function () {
          const self = this;
          mockRequestFailure('get', function () {
            return self.result;
          });
        });

        it('calls the failure function, does not call the success function', function () {
          this.buffer.request({
            success: this.notCalledChecker,
            failure: this.calledChecker
          });

          expect(this.notCalled).to.be.true;
          expect(this.called).to.be.true;
        });

        it('can chain calls', function () {
          this.buffer.request({ failure: this.increment })
            .request({ failure: this.increment })
            .request({ failure: this.increment });

          expect(this.count).to.equal(3);
        });
      });
    });
  });
});
