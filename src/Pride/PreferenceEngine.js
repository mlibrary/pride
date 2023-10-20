const PreferenceEngine = {
  selectedRecords: null,
  engine: null,

  selected: function (record) {
    if (!this.engine) {
      return false;
    }
    return (this.selectedRecords[record.datastore] || {})[record.uid];
  },

  registerEngine: function (engine) {
    this.engine = engine;
    if (!engine) {
      return this;
    }

    this.updateSelectedRecords(this.engine.listRecords());

    this.engine.addObserver((function (preferenceEngine) {
      return function (data) {
        preferenceEngine.updateSelectedRecords(data);
      };
    })(this));
    return this;
  },

  blankList: function () {
    return {
      mirlyn: {},
      articlesplus: {},
      databases: {},
      journals: {},
      website: {}
    };
  },

  updateSelectedRecords: function (data) {
    this.selectedRecords = this.selectedRecords || this.blankList();
    if (data.forEach) {
      data.forEach(function (record) {
        this.selectedRecords[record.datastore] = this.selectedRecords[record.datastore] || {};
        this.selectedRecords[record.datastore][record.uid] = true;
      }, this);
      return this;
    }
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        this.selectedRecords[prop] = {};
        data[prop].forEach((function (prop) {
          return function (record) {
            this.selectedRecords[prop][record.uid] = true;
          };
        })(prop), this);
      }
    }
    return this;
  }

};

export default PreferenceEngine;
