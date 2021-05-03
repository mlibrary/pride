import { _ } from 'underscore';
import safeCall from '../Util/safeCall';

const Holdings = function(data) {
  this.data = data;

  const getResourceAccess = function(data) {
    const dataField = data.fields.find((field) => field.uid === 'resource_access');
    if (dataField && dataField.value) {
      return dataField.value;
    }
    return dataField;
  };

  const translateData = function(input) {
    return [getResourceAccess(data)].concat(input);
  };

  this.getData = function(func) {
    safeCall(func, translateData(this.data.holdings));
  };
};

export default Holdings;
