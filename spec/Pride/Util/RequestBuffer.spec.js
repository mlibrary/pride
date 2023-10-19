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

describe('Pride.Util.RequestBuffer', function () {
  // TODO: test that url, attempts and failure_message can be delayed using a
  // function, get passed into Pride.Util.request()

  beforeEach(function () {
    const self = this
    this.request_count = 0

    mockRequestSuccess('get', function () {
      self.request_count++
    })

    this.buffer = new Pride.Util.RequestBuffer({
      url: 'http://www.example.com',
      attempts: 1
    })
  })

  it('does not send the request when it is first created', function () {
    expect(this.request_count).to.equal(0)
  })

  describe('request()', function () {
    it('sends the request if this is the first time request() was called', function () {
      this.buffer.request({ success: function () {}, failure: function () {} })

      expect(this.request_count).to.equal(1)
    })

    it('does not send the request repeatedly if called more than once', function () {
      this.buffer.request({ success: function () {}, failure: function () {} })
        .request({ success: function () {}, failure: function () {} })

      expect(this.request_count).to.equal(1)
    })

    describe('calling callbacks', function () {
      beforeEach(function () {
        const self = this

        this.called = false
        this.not_called = true
        this.count = 0
        this.result = { some: 'data' }

        this.called_checker = function () { self.called = true }
        this.not_called_checker = function () { self.not_called = false }
        this.increment = function () { self.count++ }
      })

      describe('when request is a success', function () {
        beforeEach(function () {
          const self = this
          mockRequestSuccess('get', function () { return self.result })
        })

        it('calls the success function, does not call the failure function', function () {
          this.buffer.request({
            success: this.called_checker,
            failure: this.not_called_checker
          })

          expect(this.called).to.be.true
          expect(this.not_called).to.be.true
        })

        it('can chain calls', function () {
          this.buffer.request({ success: this.increment })
            .request({ success: this.increment })
            .request({ success: this.increment })

          expect(this.count).to.equal(3)
        })

        it('passes response data into given function', function () {
          let given_first
          let given_second
          this.buffer.request({ success: function (data) { given_first = data } })
            .request({ success: function (data) { given_second = data } })

          expect(given_first).to.equal(this.result)
          expect(given_second).to.equal(this.result)
        })
      })

      describe('when request is a failure', function () {
        beforeEach(function () {
          const self = this
          mockRequestFailure('get', function () { return self.result })
        })

        it('calls the failure function, does not call the success function', function () {
          this.buffer.request({
            success: this.not_called_checker,
            failure: this.called_checker
          })

          expect(this.not_called).to.be.true
          expect(this.called).to.be.true
        })

        it('can chain calls', function () {
          this.buffer.request({ failure: this.increment })
            .request({ failure: this.increment })
            .request({ failure: this.increment })

          expect(this.count).to.equal(3)
        })
      })
    })
  })
})
