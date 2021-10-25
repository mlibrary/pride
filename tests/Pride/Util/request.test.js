import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import _ from 'underscore';
import request from '../../../src/Pride/Util/request';
import log from '../../../src/Pride/Core/log';
import Settings from '../../../src/Pride/Settings';
import safeCall from '../../../src/Pride/Util/safeCall';
// import Messenger from '../../../src/Pride/Messenger';

describe('request()', function() {
  beforeEach(() => {
    const dom = new JSDOM();
    global.window = dom.window;

    this.requestInfo = {
      url: 'https://lib.umich.edu',
      type: 'json',
      contentType: 'application/json',
      withCredentials: true
    };

    this.requestExample = function(requestInfo) {
      if (!requestInfo.url) throw new Error('No URL given to request()');

      log('Request', 'Sending HTTP request...');
      log('Request', 'URL', requestInfo.url);
      log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

      if (!_.isNumber(requestInfo.attempts)) requestInfo.attempts = Settings.connection_attempts;
      requestInfo.attempts -= 1;

      let requestMethod = 'get';
      if (requestInfo.query) requestMethod = 'post';

      return {
        url: requestInfo.url,
        data: JSON.stringify(requestInfo.query),
        type: 'json',
        method: requestMethod,
        contentType: 'application/json',
        withCredentials: true,

        error: (error) => {
          if (requestInfo.attempts <= 0) {
            // log('Request', 'ERROR', error);

            safeCall(requestInfo.failure, error);

            /*
             * Messenger.sendMessage({
             *   summary: requestInfo.failure_message,
             *   class: 'error'
             * });
             */
          } else {
            log('Request', 'Trying request again...');
            window.setTimeout(
              () => request(requestInfo),
              Settings.ms_between_attempts
            );
          }
        },

        success: (response) => {
          // log('Request', 'SUCCESS', response);

          safeCall(requestInfo.success, response);

          /*
           * Messenger.sendMessage({
           *   summary: requestInfo.success_message,
           *   class: 'success'
           * });
           */

          // Messenger.sendMessageArray(response.messages);
        }
      };
    };

    this.requestExample(this.requestInfo);
  });

  it('works', () => {
    expect(request).to.not.be.null;
  });

  it('is a function', () => {
    expect(request).to.be.a('function');
  });

  describe('url', () => {
    it('requires the argument to have a defined `url` property', () => {
      expect(() => request()).to.throw();
    });
  });

  describe('method', () => {
    it('defaults the method to \'get\'', () => {
      expect(this.requestExample(this.requestInfo).method).to.equal('get');
    });

    it('changes the method to \'post\' if query exists', () => {
      this.requestInfo.query = true;
      expect(this.requestExample(this.requestInfo).method).to.equal('post');
    });
  });

  describe('attempts', () => {
    it('sets attempts to `Settings.connection_attempts` if `requestInfo.attempts` is not a number', () => {
      expect(this.requestInfo.attempts).to.equal(Settings.connection_attempts - 1);
    });

    it('reduces total attempts by 1 for every call', () => {
      const attempts = 42;
      this.requestInfo.attempts = attempts;
      const requests = 3;
      for (let i = 0; i < requests; i++) this.requestExample(this.requestInfo);
      expect(this.requestInfo.attempts).to.equal(attempts - requests);
    });
  });

  describe('reqwest', () => {
    beforeEach(() => {
      this.requestInfo.query = { some: 'data' };
    });
    ['url', 'data', 'type', 'method', 'contentType'].forEach((property) => {
      it(`\`${property}\` returns a string`, () => {
        expect(this.requestExample(this.requestInfo)[property]).to.be.a('string');
      });
    });
    it('expects `withCredentials` to be true', () => {
      expect(this.requestExample(this.requestInfo).withCredentials)
        .to.be.a('boolean')
        .and.to.be.true;
    });
    describe('JSON type', () => {
      it('expects contentType to be application/json', () => {
        expect(this.requestExample(this.requestInfo).contentType).to.equal('application/json');
      });

      it('gives a valid JSON encoded string', () => {
        const jsonString = this.requestExample(this.requestInfo).data;
        expect(jsonString)
          .to.be.a('string')
          .and.to.equal(JSON.stringify(this.requestInfo.query));
        expect(JSON.parse(jsonString))
          .to.be.an('object')
          .and.to.deep.equal(this.requestInfo.query);
      });
    });
  });
});
