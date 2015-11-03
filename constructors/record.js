var Pride = Pride || {};

Pride.Record = function(data) {
  this.renderPart = function(func) {
    callWithData(func);
    updateThen();
  };

  this.renderFull = function(func) {
    callWithData(func);
    updateThen(function() { callWithData(func); });
  };

  var callWithData = function(func) {
    func(_.omit(Pride.deepClone(data), 'complete', 'source'));
  };

  var updateThen = function(func) {
    func = func || function() {};

    if (!data.complete) {
      Pride.request({
        url: data.source,
        success: function(response) {
          data = translateData(response.results[0]);

          func();
        },
        failure_message: 'Failed to load ' + data.name[0]
      });
    }
  };

  var translateData = function(new_data) {
    new_data = Pride.deepClone(new_data);

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
