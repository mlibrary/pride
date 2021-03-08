import { _ } from 'underscore';

// import RequestBuffer from './Util/RequestBuffer';
// import Settings from './Settings';
// import Messenger from './Messenger';
// import AllDatastores from './AllDatastores';
// import Datastore from './Core/Datastore';

const init = new RequestBuffer({
  url: () => {
    return Settings.datastoresUrl;
  },
  attempts: () => {
    return Settings.initAttempts;
  },
  failure_message: () => {
    return Messenger.preset('failed_init');
  },

  edit_response: () => {
    return undefined;
  },
  before_success: (data) => {
    // TODO: Look for a better place for this later.
    Settings.defaultInstitution = data.defaultInstitution;
    Settings.affiliation = data.affiliation;
    AllDatastores.array = _.map(
      data.response,
      (datastoreData) => {
        return new Datastore(datastoreData);
      }
    );
  }
}).request;

export default init;
