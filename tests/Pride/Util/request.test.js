import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import _ from 'underscore';
import request from '../../../src/Pride/Util/request';
import log from '../../../src/Pride/Core/log';
import Settings from '../../../src/Pride/Settings';
import safeCall from '../../../src/Pride/Util/safeCall';
// import Messenger from '../../../src/Pride/Messenger';

describe.only('request()', function() {
  beforeEach(() => {
    const dom = new JSDOM();
    global.window = dom.window;

    this.requestInfo = {
      url: 'https://lib.umich.edu',
      query: { foo: 'bar' }
    };

    this.test = function(args) {
      return args;
    };

    this.requestExample = function(requestInfo) {
      if (!requestInfo.url) throw new Error('No URL given to request()');

      log('Request', 'Sending HTTP request...');
      log('Request', 'URL', requestInfo.url);
      log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

      if (!_.isNumber(requestInfo.attempts)) requestInfo.attempts = Settings.connection_attempts;
      requestInfo.attempts -= 1;

      return {
        url: requestInfo.url,
        data: JSON.stringify(requestInfo.query),
        type: 'json',
        method: requestInfo.query ? 'post' : 'get',
        contentType: 'application/json',
        withCredentials: true,

        error: (error) => {
          if (requestInfo.attempts <= 0) {
            // log('Request', 'ERROR', error);

            safeCall(this.test, error);

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
  });

  it('works', () => {
    expect(this.requestExample).to.not.be.null;
  });

  it('is a function', () => {
    expect(this.requestExample).to.be.a('function');
  });

  describe('attempts', () => {
    it('sets attempts to `Settings.connection_attempts` if `requestInfo.attempts` is not a number', () => {
      this.requestExample(this.requestInfo);
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

  describe('url', () => {
    it('requires the argument to have a defined `url` property', () => {
      expect(() => this.requestExample({})).to.throw('No URL given to request()');
    });
    it('is a string', () => {
      expect(this.requestExample(this.requestInfo).url).to.be.a('string');
    });
  });

  describe('data', () => {
    it('is a string', () => {
      expect(this.requestExample(this.requestInfo).data).to.be.a('string');
    });
    it('stringifies the query', () => {
      expect(this.requestExample(this.requestInfo).data).to.equal(JSON.stringify(this.requestInfo.query));
    });
  });

  describe('type', () => {
    it('is a string', () => {
      expect(this.requestExample(this.requestInfo).type).to.be.a('string');
    });
    it('returns \'json\'', () => {
      expect(this.requestExample(this.requestInfo).type).to.equal('json');
    });
  });

  describe('method', () => {
    it('is a string', () => {
      expect(this.requestExample(this.requestInfo).method).to.be.a('string');
    });
    it('returns \'post\' if `requestInfo.query` exists', () => {
      expect(this.requestExample(this.requestInfo).method).to.be.equal('post');
    });
    it('defaults to \'get\' if `requestInfo.query` does not exist', () => {
      this.requestInfo.query = false;
      expect(this.requestExample(this.requestInfo).method).to.be.equal('get');
    });
  });

  describe('contentType', () => {
    it('is a string', () => {
      expect(this.requestExample(this.requestInfo).contentType).to.be.a('string');
    });
    it('returns \'application/json\'', () => {
      expect(this.requestExample(this.requestInfo).contentType).to.equal('application/json');
    });
  });

  describe('withCredentials', () => {
    it('is a boolean', () => {
      expect(this.requestExample(this.requestInfo).withCredentials).to.be.a('boolean');
    });
    it('returns \'application/json\'', () => {
      expect(this.requestExample(this.requestInfo).withCredentials).to.be.true;
    });
  });

  /**
   *describe('error', () => {
   *  it('does a thing, if requestInfo.attempts <= 0', () => {
   *    console.log(this.requestExample(this.requestInfo).error);
   *  });
   *  it('does a thing, if requestInfo.attempts > 0', () => {
   *    console.log(this.requestExample(this.requestInfo).error);
   *  });
   *});
   */
  /**
   *describe('success', () => {
   *  it('does a thing', () => {
   *    console.log(this.requestExample(this.requestInfo).success);
   *  });
   *});
   */
});
