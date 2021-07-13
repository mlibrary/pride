import _ from 'underscore';
import RequestBuffer from './Util/RequestBuffer';
import Settings from './Settings';
import Messenger from './Messenger';
import AllDatastores from './AllDatastores';
import Datastore from './Core/Datastore';

const init = new RequestBuffer({
  url: () => Settings.datastores_url,
  attempts: () => Settings.init_attempts,
  failure_message: () => Messenger.preset('failed_init'),
  edit_response: () => undefined,
  before_success: (data) => {
    // TODO: Look for a better place for this later.
    Settings.default_institution = data.default_institution;
    Settings.affiliation = data.affiliation;
    AllDatastores.array = _.map(
      data.response,
      (datastoreData) => new Datastore(datastoreData)
    );
  }
}).request;

export default init;
