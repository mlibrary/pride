const PreferenceEngine = {
  selectedRecords: null,
  engine: null,

  updateSelectedRecords (data) {
    this.selectedRecords ||= {
      mirlyn: {},
      articlesplus: {},
      databases: {},
      journals: {},
      website: {}
    };

    if (Array.isArray(data)) {
      data.forEach((record) => {
        this.selectedRecords[record.datastore] ||= {};
        this.selectedRecords[record.datastore][record.uid] = true;
      });
    } else {
      Object.keys(data).forEach((datastore) => {
        this.selectedRecords[datastore] = {};
        data[datastore].forEach((record) => {
          this.selectedRecords[datastore][record.uid] = true;
        });
      });
    }

    return this;
  },

  registerEngine (engine) {
    if (!engine) {
      return this;
    }

    this.engine = engine;
    this.updateSelectedRecords(this.engine.listRecords());

    this.engine.addObserver((data) => {
      this.updateSelectedRecords(data);
    });

    return this;
  },

  selected (record) {
    return !!this.selectedRecords?.[record.datastore]?.[record.uid];
  }
};

export default PreferenceEngine;
