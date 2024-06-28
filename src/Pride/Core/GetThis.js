import requestBuffer from '../Util/requestBuffer';
import Messenger from '../Messenger';

class GetThis {
  constructor (barcode, data) {
    this.barcode = barcode;
    this.data = data;
    const getThisUrlField = data.fields.find((field) => {
      return field.uid === 'get_this_url';
    });
    this.requestBuffer = requestBuffer({
      url: `${getThisUrlField?.value ?? ''}/${this.barcode}`,
      failure_message: Messenger.preset('failed_get_this_load', data.names[0]),
      edit_response: (response) => {
        this.data = response;
        return this.data;
      }
    });
  }

  getData (func) {
    this.requestBuffer.request({ success: func });
  }
}

export default GetThis;
