Pride.PreferenceEngine = {
  favoritedRecords: null,
  favoritedRecordsTags: null,
  selectedRecords: null,
  engine: null,

  favorited: function (record) {
    if (!this.engine) {
      return false;
    }
    return (this.favoritedRecords[record.datastore] || {})[record.uid];
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
    this.updateFavoritedRecords(this.engine.favoritesList.last);

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

  blankList: function () {
    return {
      mirlyn: {},
      articlesplus: {},
      databases: {},
      journals: {}
    };
  },

  updateFavoritedRecords: function (data) {
    this.favoritedRecords = this.favoritedRecords || this.blankList();
    this.favoritedRecordsTags = this.favoritedRecordsTags || this.blankList();
    if (!data || data.length < 1) {
      this.favoritedRecords = this.blankList();
      this.favoritedRecordsTags = this.blankList();
    }
    data.forEach(function (record) {
      var remove, id, datastore, tags;
      if ((remove = record.tags.indexOf('mirlyn-favorite')) >= 0) {
        id = record.id[0].split('/')[4];
        datastore = 'mirlyn';
      }
      else if ((remove = record.tags.indexOf('articles-favorite')) >= 0) {
        id = record.id[0].split('/')[5];
        datastore = 'articlesplus';
      }
      else if ((remove = record.tags.indexOf('databases-favorite')) >= 0) {
        id = record.id[0];
        datastore = 'databases';
      }
      else if ((remove = record.tags.indexOf('journals-favorite')) >= 0) {
        id = record.id[0];
        datastore = 'journals';
      }
      else {
        return this;
      }
      tags = record.tags.slice(0, remove)
        .concat(record.tags.slice(remove + 1, record.tags.length));
      this.favoritedRecords[datastore][id] = true;
      this.favoritedRecordsTags[datastore][id] = tags;
    }, this);
    return this;
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
