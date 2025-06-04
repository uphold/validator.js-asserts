'use strict';

/**
 * Module dependencies.
 */

const { describe, it } = require('node:test');
const asserts = require('../src/index.js');

/**
 * Test `validator.js-assert`.
 */

describe('validator.js-asserts', () => {
  it('should export all asserts', ({ assert }) => {
    const assertNames = Object.keys(asserts);

    assert.equal(assertNames.length, 41);
    assert.deepEqual(assertNames, [
      'AbaRoutingNumber',
      'BankIdentifierCode',
      'BigNumber',
      'BigNumberEqualTo',
      'BigNumberGreaterThan',
      'BigNumberGreaterThanOrEqualTo',
      'BigNumberLessThan',
      'BigNumberLessThanOrEqualTo',
      'Boolean',
      'CaZipCode',
      'Callback',
      'CpfNumber',
      'CreditCard',
      'CurpNumber',
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
      'RfcNumber',
      'TaxpayerIdentificationNumber',
      'UkModulusChecking',
      'Uri',
      'UsSubdivision',
      'UsZipCode',
      'Uuid'
    ]);
  });
});
