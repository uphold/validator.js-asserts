
/**
 * Module dependencies.
 */

import asserts from '../src';

/**
 * Test `validator.js-assert`.
 */

describe('validator.js-asserts', () => {
  it('should export all asserts', () => {
    Object.keys(asserts).should.eql([
      'AbaRoutingNumber',
      'BankIdentifierCode',
      'BigNumber',
      'BigNumberGreaterThan',
      'BigNumberGreaterThanOrEqualTo',
      'BigNumberLessThan',
      'BigNumberLessThanOrEqualTo',
      'Boolean',
      'CreditCard',
      'Date',
      'DateDiffGreaterThan',
      'DateDiffLessThan',
      'Email',
      'EqualKeys',
      'Hash',
      'Integer',
      'InternationalBankAccountNumber',
      'Ip',
      'Iso3166Country',
      'Json',
      'NotEmpty',
      'NullOrDate',
      'NullOrString',
      'Phone',
      'PlainObject',
      'UkAccountNumber',
      'UkSortCode',
      'Uri',
      'UsSubdivision',
      'UsZipCode',
      'Uuid'
    ]);
  });
});
