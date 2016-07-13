// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

describe("RequestBuffer", function() {
  // TODO: test that url, attempts and failure_message can be delayed using a
  // function, get passed into Pride.Util.request()

  beforeEach(function() {
    var self = this;
    this.request_count = 0;

    mockRequestSuccess('get', function() {
      self.request_count++;
    });

    this.buffer = new Pride.Util.RequestBuffer({
                    url: "http://www.example.com",
                    attempts: 1
                  });
  });

  it("does not send the request when it is first created", function() {
    expect(this.request_count).toBe(0);
  });

  describe("request()", function() {
    it("sends the request if this is the first time request() was called", function() {
      this.buffer.request({ success: function() {}, failure: function() {} });

      expect(this.request_count).toBe(1);
    });

    it("does not send the request repeatedly if called more than once", function() {
      this.buffer.request({ success: function() {}, failure: function() {} })
                 .request({ success: function() {}, failure: function() {} });

      expect(this.request_count).toBe(1);
    });

    describe("calling callbacks", function() {
      beforeEach(function() {
        var self = this;

        this.called     = false;
        this.not_called = true;
        this.count      = 0;
        this.result     = { some: 'data' };

        this.called_checker     = function() { self.called = true; };
        this.not_called_checker = function() { self.not_called = false; };
        this.increment          = function() { self.count++; };
      });

      describe("when request is a success", function() {
        beforeEach(function() {
          var self = this;
          mockRequestSuccess('get', function() { return self.result; });
        });

        it("calls the success function, does not call the failure function", function() {
          this.buffer.request({
            success: this.called_checker,
            failure: this.not_called_checker
          });

          expect(this.called).toBe(true);
          expect(this.not_called).toBe(true);
        });

        it("can chain calls", function() {
          this.buffer.request({ success: this.increment })
                     .request({ success: this.increment })
                     .request({ success: this.increment });

          expect(this.count).toBe(3);
        });

        it("passes response data into given function", function() {
          var given_first;
          var given_second;
          this.buffer.request({ success: function(data) { given_first  = data; } })
                     .request({ success: function(data) { given_second = data; } });

          expect(given_first).toBe(this.result);
          expect(given_second).toBe(this.result);
        });
      });

      describe("when request is a failure", function() {
        beforeEach(function() {
          var self = this;
          mockRequestFailure('get', function() { return self.result; });
        });

        it("calls the failure function, does not call the success function", function() {
          this.buffer.request({
            success: this.not_called_checker,
            failure: this.called_checker
          });

          expect(this.not_called).toBe(true);
          expect(this.called).toBe(true);
        });

        it("can chain calls", function() {
          this.buffer.request({ failure: this.increment })
                     .request({ failure: this.increment })
                     .request({ failure: this.increment });

          expect(this.count).toBe(3);
        });
      });
    });
  });
});
