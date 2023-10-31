const fs = require('fs');
const { expect } = require('chai');
const Pride = require('../../pride').Pride;

const siblingFileIsProperty = (callProperty, property) => {
  // Get list of nested properties
  const propertyPath = callProperty.split('.');
  // Check associated `src` directory
  fs.readdirSync(`src/${propertyPath.join('/')}`).forEach((listing) => {
    // Check if current listing is a non-index JavaScript file
    if (listing.endsWith('.js') && !listing.endsWith('index.js')) {
      // Remove the file extension
      const propertyName = listing.replace('.js', '');
      // Return test to see if the file exists as a property
      it(`'${propertyName}' is a property of '${propertyPath.slice(-1)}'`, () => {
        expect(property).to.have.property(propertyName);
      });
    }
  });
};

describe('Pride', function () {
  it('works', function () {
    expect(Pride).to.not.be.null;
  });
  it('is a non-empty object', function () {
    expect(Pride).to.be.an('object');
    expect(Pride).to.not.be.empty;
  });
  describe('sibling files are defined as properties', () => {
    siblingFileIsProperty('Pride', Pride);
  });
});

exports.siblingFileIsProperty = siblingFileIsProperty;
