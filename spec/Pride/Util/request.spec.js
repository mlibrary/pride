const { expect } = require('chai');
const sinon = require('sinon');
const { Core, Settings } = require('../../../pride').Pride;

async function request (requestInfo) {
  if (!requestInfo.url) {
    throw new Error('No URL given to Pride.Util.request()');
  }

  Core.log('Request', 'Sending HTTP request...');
  Core.log('Request', 'URL', requestInfo.url);
  Core.log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

  if (typeof requestInfo.attempts !== 'number') {
    requestInfo.attempts = Settings.connection_attempts;
  }

  requestInfo.attempts -= 1;

  try {
    const response = await fetch(requestInfo.url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: requestInfo.query ? 'post' : 'get',
      ...(requestInfo.query && { body: JSON.stringify(requestInfo.query) })
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
}

const requestInfo = {
  url: 'https://example.com/data'
};

describe('Pride.Util.request', function () {
  let fetchStub, logSpy, sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    fetchStub = sandbox.stub(global, 'fetch');
    logSpy = sandbox.spy(Core, 'log');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('works', function () {
    expect(request).to.not.be.null;
  });

  it('throws an error if `url` is not provided', async function () {
    const mockRequest = {};
    expect(Object.hasOwn(mockRequest, 'url')).to.be.false;
    try {
      await request(mockRequest);
    } catch (error) {
      expect(error.message).to.equal('No URL given to Pride.Util.request()');
    }
  });

  it('calls the `log` function with correct parameters', async function () {
    fetchStub.resolves({ 
      json: () => {
        return Promise.resolve({});
      },
      ok: true
    });

    await request(requestInfo);

    sinon.assert.calledWith(logSpy, 'Request', 'Sending HTTP request...');
    sinon.assert.calledWith(logSpy, 'Request', 'URL', requestInfo.url);
    sinon.assert.calledWith(logSpy, 'Request', 'CONTENT', JSON.stringify(requestInfo.query));
  });

  it('defines the number of attempts if a number is not provided', async function () {
    fetchStub.resolves({
      json: () => {
        return Promise.resolve({});
      },
      ok: true
    });

    requestInfo.attempts = 'string';

    expect(requestInfo.attempts).to.not.be.a('number');

    await request(requestInfo);

    expect(requestInfo.attempts).to.be.a('number');
    expect(requestInfo.attempts).to.equal(Settings.connection_attempts - 1);
  });

  it('reduces the number of attempts by 1 for each try', async function () {
    fetchStub.resolves({
      json: () => {
        return Promise.resolve({});
      },
      ok: true
    });

    const numberOfAttempts = 5;

    requestInfo.attempts = numberOfAttempts;

    await request(requestInfo);

    expect(requestInfo.attempts).to.equal(numberOfAttempts - 1);
  });

  ['get', 'post'].forEach((methodType) => {
    it(`should call fetch correctly for ${methodType.toUpperCase()} requests`, async function () {
      fetchStub.resolves({
        json: () => {
          return Promise.resolve({ data: 'test' });
        },
        ok: true
      });

      const requestInfoForMethod = {
        url: 'https://example.com/data'
      };

      if (methodType === 'post') {
        requestInfoForMethod.query = 'query';
      }

      await request(requestInfoForMethod);

      expect(fetchStub.calledOnce).to.be.true;

      const [fetchURL, fetchOptions] = fetchStub.getCall(0).args;
      expect(fetchURL).to.equal(requestInfoForMethod.url);
      const { body, credentials, headers, method } = fetchOptions;
      if (methodType === 'post') {
        expect(body).to.equal(`"${requestInfoForMethod.query}"`);
      } else {
        expect(body).to.be.undefined;
      }
      expect(credentials).to.equal('include');
      expect(headers).to.deep.equal({ 'Content-Type': 'application/json' });
      expect(method).to.equal(methodType);
    });
  });

  it('returns data when fetch is successful', async function () {
    const mockResponse = { data: 'test' };
    fetchStub.resolves({
      json: () => {
        return Promise.resolve(mockResponse);
      },
      ok: true
    });

    const data = await request(requestInfo);
    expect(data).to.deep.equal(mockResponse);
  });

  it('should throw an error when fetch fails', async function() {
    const errorMessage = 'Network error!';
    fetchStub.rejects(new Error(errorMessage));

    try {
      await request(requestInfo);
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  });

  it('should throw an error when response is not ok', async function() {
    fetchStub.resolves({
      json: () => {
        return Promise.resolve();
      },
      ok: false,
      status: 404
    });

    try {
      await request(requestInfo);
    } catch (error) {
      expect(error.message).to.equal('HTTP error! status: 404');
    }
  });
});
