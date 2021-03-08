import { _ } from 'underscore';
// import RequestBuffer from '../Util/RequestBuffer';
// import Messenger from '../Messenger';
// import request from '../Util/request';
// import Holdings from '../Core/Holdings';
// import GetThis from '../Core/GetThis';
// import escape from '../Util/escape';
// import PreferenceEngine from '../PreferenceEngine';

const Record = function(data) {
  const requestBuffer = new RequestBuffer({
    url: data.source,
    failure_message: Messenger.preset(
      'failed_record_load',
      data.names[0]
    ),
    edit_response: (response) => {
      data = translateData(response);

      return data;
    }
  });

  let holdings = null;
  const getThis = {};

  this.placeHold = function(item, pickupLocation, notNeededAfter, callbackFunction) {
    this.renderFull((data) => {
      const getHoldingsUrl = () => {
        let ret;
        _.each(data.fields, (field) => {
          if (field.uid === 'holdings_url') {
            ret = field.value;
          }
        });
        return ret;
      };

      const response = request({
        url: [getHoldingsUrl(), item, pickupLocation, notNeededAfter].join('/'),
        query: true,
        failure: (data) => {
          Messenger.sendMessage({
            summary: 'Failed to place hold',
            class: 'error'
          });
        },
        success: callbackFunction,
        failure_message: 'placeHold failed',
        success_message: 'placeHold succeeded'
      });
    });
  };

  this.getHoldings = (func) => {
    if (holdings) {
      holdings.getData(func);
    } else if (data.complete) {
      holdings = new Holdings(data);
      holdings.getData(func);
    } else {
      requestBuffer.request({
        success: (data) => {
          holdings = new Holdings(data);
          holdings.getData(func);
        }
      });
    }
  };

  this.getGetThis = (barcode, func) => {
    if (getThis[barcode]) {
      getThis[barcode].getData(func);
    } else if (data.complete) {
      getThis[barcode] = new GetThis(barcode, data);
      getThis[barcode].getData(func);
    } else {
      requestBuffer.request({
        success: (data) => {
          getThis[barcode] = new GetThis(barcode, data);
          getThis[barcode].getData(func);
        }
      });
    }
  };

  this.renderPart = (func) => {
    callWithData(func);
  };

  this.renderPartThenCache = (func) => {
    callWithData(func);
    requestBuffer.request();
  };

  this.renderFull = (func) => {
    if (data.complete) {
      callWithData(func);
    } else {
      requestBuffer.request({ success: func });
    }
  };

  this.renderCSL = function(func) {
    this.renderFull((data) => {
      let ret;
      _.each(data.fields, (field) => {
        if (field.uid === 'csl') {
          ret = field.value;
        }
      });

      func(ret);
    });
  };

  const callWithData = (func) => {
    func(_.omit(data, 'complete', 'source'), data.complete);
  };

  const translateData = (newData) => {
    newData.fields = _.map(
      newData.fields,
      (field) => {
        if (!field.value_has_html) {
          field.value = escape(field.value);
        }

        return _.omit(field, 'value_has_html');
      }
    );

    if (!newData.names_have_html) {
      newData.names = _.map(
        newData.names,
        (name) => {
          return escape(name);
        }
      );
    }

    if (newData.uid) {
      newData.status = 200;
    } else {
      newData.status = 404;
    }

    if (PreferenceEngine.favorited(newData)) {
      newData.favorited = true;
      newData.favorite_tags = PreferenceEngine.favoriteTags(newData);
    }

    if (PreferenceEngine.selected(newData)) {
      newData.selected = true;
    }

    return _.omit(newData, 'names_have_html');
  };

  data = translateData(data);
};

export default Record;
