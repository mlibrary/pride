// Copyright (c) 2017, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Albert Bertram (bertrama@umich.edu)

import { _ } from 'underscore';

Pride.Core.Holdings = function(data) {
  this.data = data;

  var getHoldingsUrl = function(data) {
    var ret;
    _.each(data.fields, function(field) {
      if (field.uid === 'holdings_url') {
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
    url: getHoldingsUrl(data),
    failure_message: Pride.Messenger.preset(
      'failed_holdings_load',
      data.names[0]
    ),
    edit_response: function(response) {
      data = translateData(response);
      return data;
    }
  });

  var translateData = function(input) {
    _.each(getLinks(data), function(link) {
      var row = {'type': 'online'};
      _.each(link, function(field) {
        if (field.value.constructor == Array && field.value.length == 1) {
          row[field.name] = field.value[0];
        }
        else {
          row[field.name] = field.value;
        }
      });
      input.push(row);
    });
    return input;
  };

  this.getData = function(func) {
    request_buffer.request({success: func});
  };

};