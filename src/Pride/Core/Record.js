import _ from 'underscore';
import RequestBuffer from '../Util/RequestBuffer';
import Messenger from '../Messenger';
import request from '../Util/request';
import Holdings from './Holdings';
import GetThis from './GetThis';
import escape from '../Util/escape';
import PreferenceEngine from '../PreferenceEngine';

const Record = function (data) {
  const request_buffer = new RequestBuffer({
    url: data.source,
    failure_message: Messenger.preset(
      'failed_record_load',
      data.names[0]
    ),
    edit_response: function (response) {
      data = translateData(response);

      return data;
    }
  });

  let holdings = null;
  const get_this = {};

  this.placeHold = function (item, pickup_location, not_needed_after, callback_function) {
    this.renderFull(function (data) {
      const getHoldingsUrl = function () {
        let ret;
        _.each(data.fields, function (field) {
          if (field.uid === 'holdings_url') {
            ret = field.value;
          }
        });
        return ret;
      };

      const response = request({
        url: [getHoldingsUrl(), item, pickup_location, not_needed_after].join('/'),
        query: true,
        failure: function (data) {
          Messenger.sendMessage({
            summary: 'Failed to place hold',
            class: 'error'
          });
        },
        success: callback_function,
        failure_message: 'placeHold failed',
        success_message: 'placeHold succeeded'
      });
    });
  };

  this.getHoldings = function (func) {
    if (holdings) {
      holdings.getData(func);
    } else if (data.complete) {
      holdings = new Holdings(data);
      holdings.getData(func);
    } else {
      request_buffer.request({
        success: function (data) {
          holdings = new Holdings(data);
          holdings.getData(func);
        }
      });
    }
  };

  this.getGetThis = function (barcode, func) {
    if (get_this[barcode]) {
      get_this[barcode].getData(func);
    } else if (data.complete) {
      get_this[barcode] = new GetThis(barcode, data);
      get_this[barcode].getData(func);
    } else {
      request_buffer.request({
        success: function (data) {
          get_this[barcode] = new GetThis(barcode, data);
          get_this[barcode].getData(func);
        }
      });
    }
  };

  this.renderPart = function (func) {
    callWithData(func);
  };

  this.renderPartThenCache = function (func) {
    callWithData(func);
    request_buffer.request();
  };

  this.renderFull = function (func) {
    if (data.complete) {
      callWithData(func);
    } else {
      request_buffer.request({ success: func });
    }
  };

  this.renderCSL = function (func) {
    this.renderFull(function (data) {
      let ret;
      _.each(data.fields, function (field) {
        if (field.uid === 'csl') {
          ret = field.value;
        }
      });

      func(ret);
    });
  };

  var callWithData = function (func) {
    func(_.omit(data, 'complete', 'source'), data.complete);
  };

  var translateData = function (new_data) {
    new_data.fields = _.map(
      new_data.fields,
      function (field) {
        if (!field.value_has_html) {
          field.value = escape(field.value);
        }

        return _.omit(field, 'value_has_html');
      }
    );

    if (!new_data.names_have_html) {
      new_data.names = _.map(
        new_data.names,
        function (name) {
          return escape(name);
        }
      );
    }

    if (new_data.uid) {
      new_data.status = 200;
    } else {
      new_data.status = 404;
    }

    if (PreferenceEngine.selected(new_data)) {
      new_data.selected = true;
    }

    return _.omit(new_data, 'names_have_html');
  };

  data = translateData(data);
};

export default Record;
