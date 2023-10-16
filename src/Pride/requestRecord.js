import AllDatastores from './AllDatastores';
import Record from './Core/Record';

const requestRecord = function(source, id, func) {
  if (func === undefined) {
    func = function(data) {};
  }
  var data = {
    complete: false,
    source: AllDatastores.get(source).get('url') + '/record/' + id,
    names: [ undefined ]
  };
  var record = new Record(data);
  record.renderFull(func);
  return record;
};

export default requestRecord;
