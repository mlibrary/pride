// import AllDatastores from './AllDatastores';
// import Record from './Core/Record';

export default function requestRecord(source, id, func) {
  if (func === undefined) {
    func = function(data) {
      //
    };
  }
  const data = {
    complete: false,
    source: AllDatastores.get(source).get('url') + '/record/' + id,
    names: [undefined]
  };
  const record = new Record(data);
  record.renderFull(func);
  return record;
};
