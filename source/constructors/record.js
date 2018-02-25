// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import { _ } from 'underscore';

Pride.Core.Record = function(data) {
  var request_buffer = new Pride.Util.RequestBuffer({
                         url: data.source,
                         failure_message: Pride.Messenger.preset(
                                            'failed_record_load',
                                            data.names[0]
                                          ),
                         edit_response: function(response) {
                           data = translateData(response);

                           return data;
                         }
                       });

  var holdings = null;
  var get_this = {};

  this.placeHold = function(item, pickup_location, not_needed_after, callback_function) {
    this.renderFull(function (data) {
      var getHoldingsUrl = function() {
        var ret;
        _.each(data.fields, function(field) {
          if (field.uid === 'holdings_url') {
            ret = field.value;
          }
        });
        return ret;
      };

      var response = Pride.Util.request({
        url: [getHoldingsUrl(), item, pickup_location, not_needed_after].join('/'),
        query: true,
        failure: function(data) { Pride.Messenger.sendMessage({
          summary: 'Failed to place hold',
          class: 'error'
        });},
        success: callback_function,
        failure_message: 'placeHold failed',
        success_message: 'placeHold succeeded',
      });
    });
  };


  this.getHoldings = function(func) {
    if (holdings) {
      holdings.getData(func);
    }
    else if (data.complete) {
      holdings = new Pride.Core.Holdings(data);
      holdings.getData(func);
    }
    else {
      request_buffer.request({success: function(data) {
        holdings = new Pride.Core.Holdings(data);
        holdings.getData(func);
      }});
    }
  };

  this.getGetThis = function(barcode, func) {
    if (get_this[barcode]) {
      get_this[barcode].getData(func);
    }
    else if (data.complete) {
      get_this[barcode] = new Pride.Core.GetThis(barcode, data);
      get_this[barcode].getData(func);
    }
    else {
      request_buffer.request({success: function(data) {
        get_this[barcode] = new Pride.Core.GetThis(barcode, data);
        get_this[barcode].getData(func);
      }});
    }
  };

  this.renderPart = function(func) {
    callWithData(func);
  };

  this.renderPartThenCache = function(func) {
    callWithData(func);
    request_buffer.request();
  };

  this.renderFull = function(func) {
    if (data.complete) {
      callWithData(func);
    }
    else {
      request_buffer.request({success: func});
    }
  };

  var callWithData = function(func) {
    func(_.omit(data, 'complete', 'source'), data.complete);
  };

  var translateData = function(new_data) {
    new_data.fields = _.map(
                        new_data.fields,
                        function(field) {
                          if (!field.value_has_html) {
                            field.value = Pride.Util.escape(field.value);
                          }

                          return _.omit(field, 'value_has_html');
                        }
                      );

    if (!new_data.names_have_html) {
      new_data.names = _.map(
                         new_data.names,
                         function(name) {
                           return Pride.Util.escape(name);
                         }
                       );
    }

    return _.omit(new_data, 'names_have_html');
  };

  data = translateData(data);
};
