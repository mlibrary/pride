import getPossibleKeys from './getPossibleKeys';

export default function hasKey(key) {
  return getPossibleKeys().indexOf(key) > -1;
}
