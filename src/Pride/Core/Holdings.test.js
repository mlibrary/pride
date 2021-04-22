import { expect } from 'chai';
import Holdings from './Holdings';

describe('Holdings()', () => {
  beforeEach(() => {
    this.data = {
      fields: [
        {
          uid: 'links',
          value: 'linksValue'
        },
        {
          uid: 'resource_access',
          value: 'resourceAccessValue'
        },
        {
          uid: 'holdings_url',
          value: 'holdingsURLValue'
        },
        {
          uid: 'csl',
          value: 'cslValue'
        }
      ],
      holdings: [
        {
          prop0: 'value0',
          prop1: 'value1'
        },
        {
          prop2: 'value2',
          prop3: 'value3'
        }
      ]
    };
    this.holdingsExample = new Holdings();
    this.getResourceAccessExample = function(data) {
      const dataField = data.fields.find((field) => field.uid === 'resource_access');
      if (dataField && dataField.value) {
        return dataField.value;
      }
      return dataField;
    };
    this.translateDataExample = function(input) {
      return [this.getResourceAccessExample(this.data)].concat(input);
    };
  });
  it('works', () => {
    expect(this.holdingsExample).to.not.be.null;
  });
  describe('getResourceAccess()', () => {
    it('requires `data.fields` for getResourceAccess() to be called', () => {
      expect(() => this.getResourceAccessExample()).to.throw("Cannot read property 'fields' of undefined");
    });
    it('returns undefined if there is no `uid` equalling `resource_access`', () => {
      expect(this.getResourceAccessExample({ fields: [] })).to.be.undefined;
    });
    it('returns the `value` of the first `uid` equalling `resource_access`', () => {
      expect(this.getResourceAccessExample({ fields: this.data.fields })).to.equal(this.data.fields[1].value);
    });
  });
  describe('translateData()', () => {
    it('returns an array', () => {
      expect(this.translateDataExample()).to.be.an('array');
    });
    it('returns at least two elements', () => {
      expect(this.translateDataExample().length).to.be.above(1);
    });
    it('returns the found data, along with holdings', () => {
      expect(this.translateDataExample(this.data.holdings)).to.deep.equal([this.data.fields[1].value, ...this.data.holdings]);
    });
  });
  describe('getData()', () => {
    it('works', () => {
      expect(this.holdingsExample.getData).to.not.be.null;
    });
    it('is a function', () => {
      expect(this.holdingsExample.getData).to.be.a('function');
    });
    it('runs safeCall()', () => {
      this.holdingsExample = new Holdings(this.data);
      let example;
      const func = (args) => {
        example = args;
      };
      this.holdingsExample.getData(func);
      expect(example).to.deep.equal([this.data.fields[1].value, ...this.data.holdings]);
    });
  });
});
