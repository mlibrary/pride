import safeCall from '../Util/safeCall';

const Holdings = function (data) {
  const getResourceAccess = function (data) {
    const dataField = data.fields.find((field) => {
      return field.uid === 'resource_access';
    });

    return dataField?.value ? dataField.value : dataField;
  };

  const translateData = function (input) {
    return [getResourceAccess(data)].concat(input);
  };

  this.getData = function (func) {
    safeCall(func, translateData(data.holdings));
  };
};

export default Holdings;
