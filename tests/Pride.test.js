import { expect } from 'chai';
import Pride from '../src/Pride';

describe('Pride()', function() {
  it('works', () => {
    expect(Pride).to.not.be.null;
  });
  it('returns an object', () => {
    expect(Pride).to.be.an('object');
  });
  Object.getOwnPropertyNames(Pride).forEach((property) => {
    describe(`Pride.${property}`, () => {
      it('works', () => {
        expect(Pride[property]).to.not.be.null;
      });
      if ([
        'AllDatastores',
        'Messenger',
        'PreferenceEngine',
        'Settings',
        'Core',
        'Util'
      ].includes(property)) {
        it('is an object', () => {
          expect(Pride[property]).to.be.an('object');
        });
      } else {
        it('is a function', () => {
          expect(Pride[property]).to.be.a('function');
        });
      }
    });
  });
});
