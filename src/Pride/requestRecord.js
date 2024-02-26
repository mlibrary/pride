import AllDatastores from './AllDatastores';
import Record from './Core/Record';

const requestRecord = (source, id, func = () => { /** */ }) => {
  const record = new Record({
    complete: false,
    source: `${AllDatastores.get(source)?.get('url') ?? ''}/record/${id}`,
    names: [undefined]
  });
  record.renderFull(func);
  return record;
};

export default requestRecord;
