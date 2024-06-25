const { expect } = require('chai');
const sinon = require('sinon');
const { Core, Messenger, Settings } = require('../../../pride').Pride;

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


    const responseData = await response.json();

    Core.log('Request', 'SUCCESS', responseData);

    requestInfo.success?.(responseData);

    Messenger.sendMessage({
      class: 'success',
      summary: requestInfo.success_message
    });

    if (responseData.messages) {
      Messenger.sendMessageArray(responseData.messages);
    }
  } catch (error) {
    if (requestInfo.attempts > 0) {
      Core.log('Request', 'Trying request again...');

      setTimeout(() => {
        return request(requestInfo);
      }, Settings.ms_between_attempts);
    } else {
      Core.log('Request', 'ERROR', error);

      requestInfo.failure?.(error);

      Messenger.sendMessage({
        class: 'error',
        summary: requestInfo.failure_message
      });
    }
  }
}

const requestInfo = {
  failure: (data) => {
    return data;
  },
  failure_message: 'This is a failure message',
  success: (data) => {
    return data;
  },
  success_message: 'This is a success message',
  url: 'https://example.com/data'
};

describe('Pride.Util.request', function () {
  let clock, failureSpy, fetchStub, logSpy, sendMessageArraySpy, sendMessageSpy, successSpy, sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    clock = sinon.useFakeTimers();
    fetchStub = sandbox.stub(global, 'fetch');
    logSpy = sandbox.spy(Core, 'log');
    sendMessageSpy = sandbox.spy(Messenger, 'sendMessage');
    sendMessageArraySpy = sandbox.spy(Messenger, 'sendMessageArray');
    successSpy = sandbox.spy(requestInfo, 'success');
    failureSpy = sandbox.spy(requestInfo, 'failure');
  });

  afterEach(function () {
    sandbox.restore();
    clock.restore();
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

    const requestInfoWithQuery = {
      ...requestInfo,
      query: 'query'
    }

    await request(requestInfoWithQuery);

    sinon.assert.calledWith(logSpy, 'Request', 'Sending HTTP request...');
    sinon.assert.calledWith(logSpy, 'Request', 'URL', requestInfoWithQuery.url);
    sinon.assert.calledWith(logSpy, 'Request', 'CONTENT', JSON.stringify(requestInfoWithQuery.query));
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

    await request(requestInfo);

    expect(requestInfo.attempts).to.equal(numberOfAttempts - 2);
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

  it('calls the `log` function with correct parameters when fetch is successful', async function () {
    const mockResponse = { data: 'test' };
    fetchStub.resolves({
      json: () => {
        return Promise.resolve(mockResponse);
      },
      ok: true
    });

    await request(requestInfo);

    sinon.assert.calledWith(logSpy, 'Request', 'SUCCESS', mockResponse);
  });

  it('calls `requestInfo.success` with the response data', async function () {
    const mockResponse = { data: 'test' };
    fetchStub.resolves({
      json: () => {
        return Promise.resolve(mockResponse);
      },
      ok: true
    });

    await request(requestInfo);

    sinon.assert.calledWith(successSpy, mockResponse);
  });

  it('calls `Messenger.sendMessage` with a class and summary', async function () {
    fetchStub.resolves({
      json: () => {
        return Promise.resolve({});
      },
      ok: true
    });

    await request(requestInfo);

    sinon.assert.calledWith(sendMessageSpy, {
      class: 'success',
      details: '',
      summary: requestInfo.success_message
    });
  });

  it('calls `Messenger.sendMessageArray` when `responseData.messages` exists', async function () {
    const mockResponse = {
      messages: ['Message 1', 'Message 2']
    };
    fetchStub.resolves({
      json: () => {
        return Promise.resolve(mockResponse);
      },
      ok: true
    });

    await request(requestInfo);

    sinon.assert.calledOnce(sendMessageArraySpy);
    sinon.assert.calledWithExactly(sendMessageArraySpy, mockResponse.messages);
  });

  it('does not call `Messenger.sendMessageArray` when `responseData.messages` does not exist', async function () {
    fetchStub.resolves({
      json: () => {
        return Promise.resolve({});
      },
      ok: true
    });

    await request(requestInfo);

    sinon.assert.notCalled(sendMessageArraySpy);
  });

  it('on error, the `log` function is called with correct parameters', async function() {
    const errorMessage = 'Promise rejected.';
    fetchStub.resolves({
      json: () => {
        return Promise.reject(errorMessage);
      }
    });

    await request(requestInfo);

    sinon.assert.calledWith(logSpy.getCall(3), 'Request', 'ERROR', errorMessage);
  });

  it('on error, with attempts remaining, the `log` function is called with correct parameters', async function() {
    const errorMessage = 'Promise rejected.';
    fetchStub.resolves({
      json: () => {
        return Promise.reject(errorMessage);
      }
    });

    requestInfo.attempts = 2;

    await request(requestInfo);

    sinon.assert.calledWith(logSpy.getCall(3), 'Request', 'Trying request again...');
  });

  it('on error, with attempts remaining, will rerun request', async function () {
    fetchStub.onFirstCall().rejects(new Error('Network Error'));
    fetchStub.onSecondCall().resolves({
      json: () => {
        return Promise.resolve({});
      }
    });

    requestInfo.attempts = 2;
    await request(requestInfo);

    clock.tick(Settings.ms_between_attempts);

    expect(fetchStub.calledTwice).to.be.true;
  });

  it('on error, `requestInfo.failure` is called with the error message', async function () {
    const mockResponse = { data: 'test' };
    fetchStub.resolves({
      json: () => {
        return Promise.reject(mockResponse);
      }
    });

    await request(requestInfo);

    sinon.assert.calledWith(failureSpy, mockResponse);
  });

  it('on error, `Messenger.sendMessage` is called with a class and summary', async function () {
    fetchStub.resolves({
      json: () => {
        return Promise.reject({});
      }
    });

    await request(requestInfo);

    sinon.assert.calledWith(sendMessageSpy, {
      class: 'error',
      details: '',
      summary: requestInfo.failure_message
    });
  });
});
