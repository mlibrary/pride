import getPossibleKeys from './Paginater/getPossibleKeys';
import hasKey from './Paginater/hasKey';

const Paginater = {
  getPossibleKeys: () => getPossibleKeys(),
  hasKey: (key) => hasKey(key)
};

export default Paginater;
