// Copyright (c) 2017, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Albert Bertram (bertrama@umich.edu)

import { _ } from 'underscore';

Pride.Core.GetThis = function(barcode, data) {
  this.barcode = barcode;
  this.data = data;

  var getGetThisUrl = function(data) {
    var ret;
    _.each(data.fields, function(field) {
      if (field.uid === 'get_this_url') {
        ret = field.value;
      }
    });
    return ret;
  };

  var getLinks = function(data) {
    var ret;
    _.each(data.fields, function(field) {
      if (field.uid == 'links') {
        ret = field.value;
      }
    });
    return ret;
  };

  var request_buffer = new Pride.Util.RequestBuffer({
    url: getGetThisUrl(data) + '/' + this.barcode,
    failure_message: Pride.Messenger.preset(
      'failed_get_this_load',
      data.names[0]
    ),
    edit_response: function(response) {
      data = translateData(response);
      return data;
    }
  });

  var translateData = function(input) {
    return input;
  };

  this.getData = function(func) {
    request_buffer.request({success: func});
  };

};
