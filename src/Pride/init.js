import RequestBuffer from './Util/RequestBuffer';
import Settings from './Settings';
import Messenger from './Messenger';
import AllDatastores from './AllDatastores';
import Datastore from './Core/Datastore';

const init = new RequestBuffer({
  url: () => {
    return Settings.datastores_url;
  },
  attempts: () => {
    return Settings.init_attempts;
  },
  failure_message: () => {
    return Messenger.preset('failed_init');
  },

  edit_response: () => {
    return undefined;
  },
  before_success: (data) => {
    Settings.default_institution = data.default_institution;
    Settings.affiliation = data.affiliation;
    AllDatastores.array = data.response.map((datastoreData) => {
      return new Datastore(datastoreData);
    });
  }
}).request;

export default init;
