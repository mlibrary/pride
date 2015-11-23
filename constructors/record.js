// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

var Pride = Pride || {};

Pride.Record = function(data) {
  var request_buffer = new Pride.RequestBuffer({
                         url: data.source,
                         failure_message: Pride.Messenger.preset(
                                            'failed_record_load',
                                            data.names[0]
                                          ),
                         edit_response: function(response) {
                           data = translateData(response.results[0]);

                           return data;
                         }
                       });

  this.renderPart = function(func) {
    callWithData(func);
  };

  this.renderPartThenCache = function(func) {
    callWithData(func);
    request_buffer.request();
  };

  this.renderFull = function(func) {
    callWithData(func);

    if (!data.complete) {
      request_buffer.request({ success: func });
    }
  };

  var callWithData = function(func) {
    func(Pride.deepClone(_.omit(data, 'complete', 'source')), data.complete);
  };

  var translateData = function(new_data) {
    new_data.fields = _.map(
                        new_data.fields,
                        function(field) {
                          if (!field.value_has_html) {
                            field.value = Pride.escape(field.value);
                          }

                          return _.omit(field, 'value_has_html');
                        }
                      );

    if (!new_data.names_have_html) {
      new_data.names = _.map(
                         new_data.names,
                         function(name) {
                           return Pride.escape(name);
                         }
                       );
    }

    return _.omit(new_data, 'names_have_html');
  };

  data = translateData(data);
};
