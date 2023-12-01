const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.Core.Holdings', function () {
  it('works', function () {
    expect(Pride.Core.Holdings).to.not.be.null;
  });

  describe('getData()', function () {
    const data = {
      fields: [
        {
          uid: 'title',
          name: 'Title',
          value: [
            'The nation.'
          ]
        },
        {
          uid: 'published_brief',
          name: 'Published/Created',
          value: [
            'New York, N.Y. : Joseph H. Richards, [1865]-',
            'New York, N.Y. : The Nation Company, L.P.'
          ]
        },
        {
          uid: 'language',
          name: 'Language',
          value: [
            'English'
          ]
        },
        {
          uid: 'published_year',
          name: 'Published Year',
          value: [
            '1865'
          ]
        },
        {
          uid: 'institution',
          name: 'Institution Name',
          value: [
            'Flint Thompson Library',
            'UM Ann Arbor Libraries',
            'University Library'
          ]
        },
        {
          uid: 'place_of_publication',
          name: 'Place of Publication',
          value: [
            'New York, N.Y.'
          ]
        }
      ],
      holdings: [
        {
          caption: 'Online Resources',
          headings: [
            'Link',
            'Description',
            'Source'
          ],
          rows: [
            [
              {
                text: 'Available online',
                href: 'https://na04.alma.exlibrisgroup.com/view/uresolver/01UMICH_INST/openurl-UMAA?u.ignore_date_coverage=true&portfolio_pid=531161113170006381&Force_direct=true'
              },
              {
                text: ' Available from 10/06/1984 until 04/11/2005.'
              },
              {
                text: 'Gale Academic OneFile'
              }
            ],
            [
              {
                text: 'Available online',
                href: 'https://na04.alma.exlibrisgroup.com/view/uresolver/01UMICH_INST/openurl-UMAA?u.ignore_date_coverage=true&portfolio_pid=531085066960006381&Force_direct=true'
              },
              {
                text: ' Available from 01/04/1900.'
              },
              {
                text: 'EBSCOhost Points of View Reference Center'
              }
            ],
            [
              {
                text: 'Available online',
                href: 'https://na04.alma.exlibrisgroup.com/view/uresolver/01UMICH_INST/openurl-UMAA?u.ignore_date_coverage=true&portfolio_pid=531199135590006381&Force_direct=true'
              },
              {
                text: ' Available from 10/06/1984 until 04/11/2005.'
              },
              {
                text: 'Gale OneFile: Military and Intelligence'
              }
            ]
          ],
          type: 'electronic',
          preExpanded: true
        }
      ]
    };

    beforeEach(function () {
      this.holdings = new Pride.Core.Holdings(data);
    });

    describe('getData', function () {
      it('pulls in just `holdings` if `resource_access` does not exist', () => {
        const holdings = new Pride.Core.Holdings(data);
        let example;
        const func = (args) => {
          example = args;
        };
        holdings.getData(func);
        expect(example).to.deep.equal([undefined, ...data.holdings]);
      });
      it('pulls in data from `resource_access` and `holdings`', () => {
        const resourceAccess = {
          uid: 'resource_access',
          name: 'Resource Access',
          value: {
            headings: [
              'Action',
              'Description'
            ],
            name: 'online journals',
            rows: [
              [
                {
                  href: 'https://na04.alma.exlibrisgroup.com/view/uresolver/01UMICH_INST/openurl-UMAA?u.ignore_date_coverage=true&portfolio_pid=531161113170006381&Force_direct=true',
                  text: 'Go to online journal',
                  previewEligible: true
                },
                {
                  text: 'Available from 10/06/1984 until 04/11/2005. - Gale Academic OneFile'
                }
              ],
              [
                {
                  href: 'https://na04.alma.exlibrisgroup.com/view/uresolver/01UMICH_INST/openurl-UMAA?u.ignore_date_coverage=true&portfolio_pid=531085066960006381&Force_direct=true',
                  text: 'Go to online journal'
                },
                {
                  text: ' Available from 01/04/1900. - EBSCOhost Points of View Reference Center'
                }
              ],
              [
                {
                  href: 'https://na04.alma.exlibrisgroup.com/view/uresolver/01UMICH_INST/openurl-UMAA?u.ignore_date_coverage=true&portfolio_pid=531199135590006381&Force_direct=true',
                  text: 'Go to online journal'
                },
                {
                  text: ' Available from 10/06/1984 until 04/11/2005. - Gale OneFile: Military and Intelligence'
                }
              ]
            ],
            preExpanded: true,
            type: 'electronic'
          }
        };
        data.fields.push(resourceAccess);
        const holdings = new Pride.Core.Holdings(data);
        let example;
        const func = (args) => {
          example = args;
        };
        holdings.getData(func);
        expect(example).to.deep.equal([resourceAccess.value, ...data.holdings]);
      });
    });
  });
});
