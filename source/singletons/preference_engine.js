Pride.PreferenceEngine = {
  favoritedRecords: {},
  favoritedRecordsTags: {},
  selectedRecords: {},
  engine: null,

  favorited: function (record) {
    if (!this.engine) {
      return false;
    }
    return (this.selectedRecords[record.datastore] || {})[record.uid];
  },

  selected: function (record) {
    if (!this.engine) {
      return false;
    }
    return (this.selectedRecords[record.datastore] || {})[record.uid];
  },

  favoriteTags: function (record) {
    if (!this.engine) {
      return [];
    }
    return (this.favoritedRecordsTags[record.datastore] || {})[record.uid] || [];
  },

  registerEngine: function (engine) {
    this.engine = engine;
    if (!engine) {
      return this;
    }

    this.updateSelectedRecords(this.engine.listRecords());
    //this.updateFavoritedRecords({});

    this.engine.addFavoritesListObserver((function (preferenceEngine) {
      return function (data) {
        preferenceEngine.updateFavoritedRecords(data);
      };
    })(this));
    this.engine.addObserver((function (preferenceEngine) {
      return function (data) {
        preferenceEngine.updateSelectedRecords(data);
      };
    })(this));
    return this;
  },

  updateFavoritedRecords: function (data) {
  },

  updateSelectedRecords: function (data) {
    if (data.forEach) {
      data.forEach(function (record) {
        this.selectedRecords[record.datastore] = this.selectedRecords[record.datastore] || {};
        this.selectedRecords[record.datastore][record.uid] = true;
      }, this);
      return this;
    }
    for (var prop in data) {
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
  },

};
