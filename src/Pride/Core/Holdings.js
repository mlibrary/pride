import { _ } from 'underscore';
// import RequestBuffer from '../Util/RequestBuffer';
// import Messenger from '../Messenger';

const Holdings = function(data) {
  this.data = data;

  const getHoldingsUrl = function(data) {
    let ret;
    _.each(data.fields, function(field) {
      if (field.uid === 'holdings_url') {
        ret = field.value;
      }
    });
    return ret;
  };

  const getResourceAccess = function(data) {
    let ret;
    _.each(data.fields, function(field) {
      if (field.uid === 'resource_access') {
        ret = field.value;
      }
    });
    return ret;
  };

  const requestBuffer = new RequestBuffer({
    url: getHoldingsUrl(data),
    failure_message: Messenger.preset(
      'failed_holdings_load',
      data.names[0]
    ),
    edit_response: function(response) {
      data = translateData(response);
      return data;
    }
  });

  const translateData = function(input) {
    return [getResourceAccess(data)].concat(input);
  };

  this.getData = function(func) {
    requestBuffer.request({ success: func });
  };
};

export default Holdings;
