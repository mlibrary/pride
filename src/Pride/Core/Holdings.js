class Holdings {
  constructor (data) {
    this.data = data;
  }

  getResourceAccess = (data) => {
    const dataField = data.fields.find((field) => {
      return field.uid === 'resource_access';
    });
    return dataField?.value ?? dataField;
  };

  translateData = (input) => {
    return [this.getResourceAccess(this.data)].concat(input);
  };

  getData = (func) => {
    func(...[this.translateData(this.data.holdings)]);
  };
}

export default Holdings;
