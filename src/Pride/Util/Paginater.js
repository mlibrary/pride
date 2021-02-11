import getPossibleKeys from './Paginater/getPossibleKeys';
import hasKey from './Paginater/hasKey';

const Paginater = {
  getPossibleKeys: () => getPossibleKeys(),
  hasKey: (args) => hasKey(args)
};

export default Paginater;
