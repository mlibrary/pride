const { expect } = require('chai');
const sinon = require('sinon');
const Messenger = require('../../../pride').Pride.Messenger;
const GetThis = require('../../../pride').Pride.Core.GetThis;

describe('Pride.Core.GetThis', function() {
  const data = {
    fields: [
      {
        uid: 'get_this_url',
        name: 'Get This URL',
        value: 'https://search-staging.www.lib.umich.edu/spectrum/mirlyn/get-this/9876543210'
      }
    ],
    names: ['Test Item']
  };
  const barcode = '123';
  let sandbox;
  let getThis;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
    sandbox.stub(Messenger, 'preset').returns('default failure message');
    getThis = new GetThis(barcode, data);
    requestBufferStub = sandbox.stub(getThis.requestBuffer, 'request').callsFake(function (funcHash) {
      if (funcHash.success) {
        funcHash.success({ ...data, dataFromRequest: 'value' });
      }
      return this;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('works', function () {
    expect(GetThis).to.not.be.null;
  });

  describe('getData', function () {
    it('generates the URL', function() {
      expect(getThis.requestBuffer.requestOptions).to.have.property('url').that.includes(getThis.barcode);
      expect(getThis.requestBuffer.requestOptions.url).to.equal(`${data.fields[0].value}/${barcode}`);
    });

    it('defines the failure message', function () {
      expect(getThis.requestBuffer.requestOptions.failure_message).to.equal('default failure message');
    });

    it('edits the response', function (done) {
      expect(getThis.requestBuffer.requestOptions).to.have.property('edit_response');
      getThis.getData((data) => {
        expect(data).to.have.property('dataFromRequest');
        expect(data.dataFromRequest).to.equal('value');
        done();
      });
    });

    it('handles success response', function () {
      const spy = sinon.spy();
      getThis.getData(spy);
      sinon.assert.calledOnce(requestBufferStub);
      const firstCallArgs = requestBufferStub.firstCall.args[0];
      expect(firstCallArgs).to.be.an('object').and.to.have.property('success').that.is.a('function');
      expect(firstCallArgs.success).to.equal(spy);
    });
  });
});
