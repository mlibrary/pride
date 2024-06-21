import AllDatastores from './AllDatastores';
import Record from './Core/Record';

const requestRecord = (
  source,
  id,
  func = () => {
    /** */
  }
) => {
  const record = new Record({
    complete: false,
    names: [],
    source: `${AllDatastores.get(source)?.get('url') ?? ''}/record/${id}`
  });
  record.renderFull(func);
  return record;
};

export default requestRecord;
