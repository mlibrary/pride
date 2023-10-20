import _ from 'underscore';
import RequestBuffer from '../Util/RequestBuffer';
import Messenger from '../Messenger';

const GetThis = function (barcode, data) {
  this.barcode = barcode;
  this.data = data;

  const getGetThisUrl = function (data) {
    let ret;
    _.each(data.fields, function (field) {
      if (field.uid === 'get_this_url') {
        ret = field.value;
      }
    });
    return ret;
  };

  const getLinks = function (data) {
    let ret;
    _.each(data.fields, function (field) {
      if (field.uid == 'links') {
        ret = field.value;
      }
    });
    return ret;
  };

  const request_buffer = new RequestBuffer({
    url: getGetThisUrl(data) + '/' + this.barcode,
    failure_message: Messenger.preset(
      'failed_get_this_load',
      data.names[0]
    ),
    edit_response: function (response) {
      data = translateData(response);
      return data;
    }
  });

  var translateData = function (input) {
    return input;
  };

  this.getData = function (func) {
    request_buffer.request({ success: func });
  };
};

export default GetThis;
