class Holdings {
  constructor (data) {
    this.data = data;
  }

  getData (func) {
    const dataField = this.data.fields.find((field) => {
      return field.uid === 'resource_access';
    });
    const resourceAccessValue = dataField?.value ?? dataField;
    func([resourceAccessValue].concat(this.data.holdings || []));
  }
}

export default Holdings;
