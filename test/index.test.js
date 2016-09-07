'use strict';

/**
 * Module dependencies.
 */

const asserts = require('../src');

/**
 * Test `validator.js-assert`.
 */

describe('validator.js-asserts', () => {
  it('should export all asserts', () => {
    const assertNames = Object.keys(asserts);

    expect(assertNames).toHaveLength(38);
    expect(assertNames).toEqual(
      expect.arrayContaining([
        'AbaRoutingNumber',
        'BankIdentifierCode',
        'BigNumber',
        'BigNumberEqualTo',
        'BigNumberGreaterThan',
        'BigNumberGreaterThanOrEqualTo',
        'BigNumberLessThan',
        'BigNumberLessThanOrEqualTo',
        'Boolean',
        'Callback',
        'CpfNumber',
        'CreditCard',
        'Date',
        'DateDiffGreaterThan',
        'DateDiffGreaterThanOrEqualTo',
        'DateDiffLessThan',
        'DateDiffLessThanOrEqualTo',
        'Email',
        'EqualKeys',
        'Hash',
        'Integer',
        'InternationalBankAccountNumber',
        'Ip',
        'Iso3166Country',
        'Json',
        'NotEmpty',
        'NullOr',
        'NullOrBoolean',
        'NullOrDate',
        'NullOrString',
        'Phone',
        'PlainObject',
        'TaxpayerIdentificationNumber',
        'UkModulusChecking',
        'Uri',
        'UsSubdivision',
        'UsZipCode',
        'Uuid'
      ])
    );
  });
});
