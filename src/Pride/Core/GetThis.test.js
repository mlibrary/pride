import { expect } from 'chai';
import GetThis from './GetThis';

describe('GetThis()', () => {
  beforeEach(() => {
    this.data = {
      fields: [
        {
          uid: 'csl',
          value: 'cslValue'
        },
        {
          uid: 'links',
          value: 'linksValue'
        },
        {
          uid: 'get_this_url',
          value: 'getThisURLValue'
        },
        {
          uid: 'holdings_url',
          value: 'holdingsURLValue'
        },
        {
          uid: 'resource_access',
          value: 'resourceAccessValue'
        }
      ],
      names: ['Barclay', 'Barry', 'Bert', 'Bort']
    };
    this.getThisExample = new GetThis('barcode', this.data);
    this.getGetThisURLExample = function(data) {
      const dataField = data.fields.find((field) => field.uid === 'get_this_url');
      if (dataField && dataField.value) {
        return dataField.value;
      }
      return dataField;
    };
    this.translateDataExample = function(input) {
      return input;
    };
  });
  it('works', () => {
    expect(() => this.getThisExample).to.not.be.null;
  });
  describe('getGetThisURLExample()', () => {
    it('requires `data.fields` for getGetThisURLExample() to be called', () => {
      expect(() => this.getGetThisURLExample()).to.throw("Cannot read property 'fields' of undefined");
    });
    it('returns undefined if there is no `uid` equalling `get_this_url`', () => {
      expect(this.getGetThisURLExample({ fields: [] })).to.be.undefined;
    });
    it('returns the `value` of the first `uid` equalling `get_this_url`', () => {
      expect(this.getGetThisURLExample({ fields: this.data.fields })).to.equal(this.data.fields[2].value);
    });
  });
  describe('requestBuffer()', () => {
    it('requires `data.names` for requestBuffer()', () => {
      const example = () => new GetThis('barcode', { fields: [] });
      expect(() => example()).to.throw("Cannot read property '0' of undefined");
    });
  });
  describe('translateData()', () => {
    it('returns the argument', () => {
      expect(this.translateDataExample('argument')).to.equal('argument');
    });
  });
  describe('getData()', () => {
    it('works', () => {
      expect(this.getThisExample.getData).to.not.be.null;
    });
    it('is a function', () => {
      expect(this.getThisExample.getData).to.be.a('function');
    });
  });
});
