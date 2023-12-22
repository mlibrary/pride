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

    if (Array.isArray(data)) {
      data.forEach((record) => {
        this.selectedRecords[record.datastore] = {};
        this.selectedRecords[record.datastore][record.uid] = true;
      });

      return this;
    }

    Object.keys(data).forEach((datastore) => {
      this.selectedRecords[datastore] = {};
      data[datastore].forEach((record) => {
        this.selectedRecords[datastore][record.uid] = true;
      });
    });

    return this;
  },

  registerEngine: function (engine) {
    if (!engine) {
      return this;
    }

    this.engine = engine;

    this.updateSelectedRecords(this.engine.listRecords());

    this.engine.addObserver(() => {
      return (data) => {
        this.updateSelectedRecords(data);
      };
    });

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
