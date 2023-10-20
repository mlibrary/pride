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

  const requestBuffer = new RequestBuffer({
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

  const translateData = function (input) {
    return input;
  };

  this.getData = function (func) {
    requestBuffer.request({ success: func });
  };
};

export default GetThis;
