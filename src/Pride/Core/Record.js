import _ from 'underscore';
import RequestBuffer from '../Util/RequestBuffer';
import Messenger from '../Messenger';
import request from '../Util/request';
import Holdings from './Holdings';
import GetThis from './GetThis';
import escape from '../Util/escape';
import PreferenceEngine from '../PreferenceEngine';

const Record = function (data) {
  const requestBuffer = new RequestBuffer({
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
  const getThis = {};

  this.placeHold = function (item, pickupLocation, notNeededAfter, callbackFunction) {
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
        url: [getHoldingsUrl(), item, pickupLocation, notNeededAfter].join('/'),
        query: true,
        failure: function () {
          Messenger.sendMessage({
            summary: 'Failed to place hold',
            class: 'error'
          });
        },
        success: callbackFunction,
        failure_message: 'placeHold failed',
        success_message: 'placeHold succeeded'
      });

      console.log(response);
    });
  };

  this.getHoldings = function (func) {
    if (holdings) {
      holdings.getData(func);
    } else if (data.complete) {
      holdings = new Holdings(data);
      holdings.getData(func);
    } else {
      requestBuffer.request({
        success: function (data) {
          holdings = new Holdings(data);
          holdings.getData(func);
        }
      });
    }
  };

  this.getGetThis = function (barcode, func) {
    if (getThis[barcode]) {
      getThis[barcode].getData(func);
    } else if (data.complete) {
      getThis[barcode] = new GetThis(barcode, data);
      getThis[barcode].getData(func);
    } else {
      requestBuffer.request({
        success: function (data) {
          getThis[barcode] = new GetThis(barcode, data);
          getThis[barcode].getData(func);
        }
      });
    }
  };

  this.renderPart = function (func) {
    callWithData(func);
  };

  this.renderPartThenCache = function (func) {
    callWithData(func);
    requestBuffer.request();
  };

  this.renderFull = function (func) {
    if (data.complete) {
      callWithData(func);
    } else {
      requestBuffer.request({ success: func });
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

  const callWithData = function (func) {
    func(_.omit(data, 'complete', 'source'), data.complete);
  };

  const translateData = function (newData) {
    newData.fields = _.map(
      newData.fields,
      function (field) {
        if (!field.value_has_html) {
          field.value = escape(field.value);
        }

        return _.omit(field, 'value_has_html');
      }
    );

    if (!newData.names_have_html) {
      newData.names = _.map(
        newData.names,
        function (name) {
          return escape(name);
        }
      );
    }

    if (newData.uid) {
      newData.status = 200;
    } else {
      newData.status = 404;
    }

    if (PreferenceEngine.selected(newData)) {
      newData.selected = true;
    }

    return _.omit(newData, 'names_have_html');
  };

  data = translateData(data);
};

export default Record;
