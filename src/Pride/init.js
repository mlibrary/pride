import AllDatastores from './AllDatastores';
import Datastore from './Core/Datastore';
import Messenger from './Messenger';
import RequestBuffer from './Util/RequestBuffer';
import Settings from './Settings';

const init = new RequestBuffer({
  attempts: () => {
    return Settings.init_attempts;
  },
  before_success: (data) => {
    Settings.default_institution = data.default_institution;
    Settings.affiliation = data.affiliation;
    AllDatastores.array = data.response.map((datastoreData) => {
      return new Datastore(datastoreData);
    });
  },
  edit_response: () => {
    return null;
  },
  failure_message: () => {
    return Messenger.preset('failed_init');
  },
  url: () => {
    return Settings.datastores_url;
  }
}).request;

export default init;
