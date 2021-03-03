import getPossibleKeys from './getPossibleKeys';

export default function hasKey(key) {
  return getPossibleKeys().includes(key);
};
