import _ from 'underscore';
import RequestBuffer from './Util/RequestBuffer';
import Settings from './Settings';
import Messenger from './Messenger';
import AllDatastores from './AllDatastores';
import Datastore from './Core/Datastore';

const init = new RequestBuffer({
  url: function () {
    return Settings.datastores_url;
  },
  attempts: function () {
    return Settings.init_attempts;
  },
  failure_message: function () {
    return Messenger.preset('failed_init');
  },

  edit_response: function () {
    return undefined;
  },
  before_success: function (data) {
    // TODO: Look for a better place for this later.
    Settings.default_institution = data.default_institution;
    Settings.affiliation = data.affiliation;
    AllDatastores.array = _.map(
      data.response,
      function (datastoreData) {
        return new Datastore(datastoreData);
      }
    );
  }
}).request;

export default init;
