import getPossibleKeys from './getPossibleKeys';

const hasKey = function (key) {
  return getPossibleKeys().indexOf(key) > -1;
};

export default hasKey;
