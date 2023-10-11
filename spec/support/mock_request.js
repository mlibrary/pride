function testRequest (request_method, request_info) {
  describe('sends a valid request', function () {
    it('is given the nessesary fields', function () {
      _.each(['url', 'data', 'method', 'contentType'], function (field) {
        expect(typeof request_info[field]).to.equal('string')
      })

      expect(typeof request_info.url).to.equal('string')
      expect(typeof request_info.method).to.equal('string')
      expect(typeof request_info.content_type).to.equal('string')
    })

    it('is given the expected method', function () {
      expect(request_info.method).to.equal(request_method)
    })

    if (request_info.type == 'json') {
      describe('when type is "json"', function () {
        it('expects contentType to be application/json', function () {
          expect(request_info.contentType).to.equal('application/json')
        })

        it('gives a valid JSON encoded string', function () {
          expect(JSON.parse(request_info.data)).not.to.throw()
        })
      })
    }
  })
}

function mockRequestSuccess (request_method, result) {
  reqwest = function (request_info) {
    testRequest(request_method, request_info)
    request_info.success(Pride.Util.safeCall(result) || {})
  }
}

function mockRequestFailure (request_method, result) {
  reqwest = function (request_info) {
    testRequest(request_method, request_info)
    request_info.error(Pride.Util.safeCall(result) || {})
  }
}
