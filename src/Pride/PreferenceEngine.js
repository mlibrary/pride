const PreferenceEngine = {
  selectedRecords: null,
  engine: null,

  updateSelectedRecords: function (data) {
    this.selectedRecords = this.selectedRecords ||
      {
        mirlyn: {},
        articlesplus: {},
        databases: {},
        journals: {},
        website: {}
      };

    if (data.forEach) {
      data.forEach(function (record) {
        this.selectedRecords[record.datastore] = this.selectedRecords[record.datastore] || {};
        this.selectedRecords[record.datastore][record.uid] = true;
      }, this);
      return this;
    }

    for (const prop in data) {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        this.selectedRecords[prop] = {};
        data[prop].forEach((function (prop) {
          return function (record) {
            this.selectedRecords[prop][record.uid] = true;
          };
        })(prop), this);
      }
    }

    return this;
  },

  registerEngine: function (engine) {
    if (!engine) {
      return this;
    }

    this.engine = engine;

    this.updateSelectedRecords(this.engine.listRecords());

    this.engine.addObserver((function (preferenceEngine) {
      return function (data) {
        preferenceEngine.updateSelectedRecords(data);
      };
    })(this));

    return this;
  },

  selected: function (record) {
    if (!this.engine) {
      return false;
    }

    return (this.selectedRecords[record.datastore] || {})[record.uid];
  }

};

export default PreferenceEngine;
