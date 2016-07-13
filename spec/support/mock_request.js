// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

if (typeof reqwest !== 'undefined') var originalRequest = reqwest;

function testRequest(request_method, request_info) {
  describe('sends a valid request', function() {
    it('is given the nessesary fields', function() {
      _.each(['url', 'data', 'method', 'contentType'], function(field) {
        expect(typeOf(request_info[field])).toEqual('string');
      });

      expect(typeOf(request_info['url'])).toEqual('string');
      expect(typeOf(request_info['method'])).toEqual('string');
      expect(typeOf(request_info['content_type'])).toEqual('string');
    });

    it('is given the expected method', function() {
      expect(request_info['method']).toEqual(request_method);
    });

    if (request_info['type'] == 'json') {
      describe('when type is "json"', function() {
        it('expects contentType to be application/json', function() {
          expect(request_info['contentType']).toEqual('application/json');
        });

        it('gives a valid JSON encoded string', function() {
          expect(JSON.parse(request_info['data'])).not.toThrow();
        });
      });
    }
  });
}

function mockRequestSuccess(request_method, result) {
  reqwest = function(request_info) {
    testRequest(request_method, request_info);
    request_info['success'](Pride.Util.safeCall(result) || {});
  };
}


function mockRequestFailure(request_method, result) {
  reqwest = function(request_info) {
    testRequest(request_method, request_info);
    request_info['error'](Pride.Util.safeCall(result) || {});
  };
}
