import RequestBuffer from '../Util/RequestBuffer';
import Messenger from '../Messenger';

class GetThis {
  constructor (barcode, data) {
    this.barcode = barcode;
    this.data = data;
    this.requestBuffer = new RequestBuffer({
      url: `${this.getGetThisUrl(data)}/${this.barcode}`,
      failure_message: Messenger.preset('failed_get_this_load', data.names[0]),
      edit_response: (response) => {
        this.data = this.translateData(response);
        return this.data;
      }
    });
  }

  getGetThisUrl (data) {
    const ret = data.fields.find((field) => {
      return field.uid === 'get_this_url';
    });

    return ret?.value;
  }

  translateData (input) {
    return input;
  }

  getData (func) {
    this.requestBuffer.request({ success: func });
  }
}

export default GetThis;
