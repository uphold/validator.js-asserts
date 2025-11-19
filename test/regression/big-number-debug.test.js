'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BigNumber = require('bignumber.js');
const BigNumberEqualToAssert = require('../../src/asserts/big-number-equal-to-assert.js');
const BigNumberGreaterThanAssert = require('../../src/asserts/big-number-greater-than-assert.js');
const BigNumberGreaterThanOrEqualToAssert = require('../../src/asserts/big-number-greater-than-or-equal-to-assert.js');
const BigNumberLessThanAssert = require('../../src/asserts/big-number-less-than-assert.js');
const BigNumberLessThanOrEqualToAssert = require('../../src/asserts/big-number-less-than-or-equal-to-assert.js');

/**
 * Extend `Assert` with all BigNumber asserts.
 */

const Assert = BaseAssert.extend({
  BigNumberEqualTo: BigNumberEqualToAssert,
  BigNumberGreaterThan: BigNumberGreaterThanAssert,
  BigNumberGreaterThanOrEqualTo: BigNumberGreaterThanOrEqualToAssert,
  BigNumberLessThan: BigNumberLessThanAssert,
  BigNumberLessThanOrEqualTo: BigNumberLessThanOrEqualToAssert
});

/**
 * Test BigNumber asserts regression - BigNumber.DEBUG preservation.
 */

describe('BigNumber DEBUG Regression', () => {
  const asserts = [
    {
      constructor: options => Assert.bigNumberEqualTo(10, options),
      invalidValue: 5,
      name: 'BigNumberEqualTo',
      validValue: 10
    },
    {
      constructor: options => Assert.bigNumberGreaterThan(10, options),
      invalidValue: 5,
      name: 'BigNumberGreaterThan',
      validValue: 11
    },
    {
      constructor: options => Assert.bigNumberGreaterThanOrEqualTo(10, options),
      invalidValue: 5,
      name: 'BigNumberGreaterThanOrEqualTo',
      validValue: 10
    },
    {
      constructor: options => Assert.bigNumberLessThan(10, options),
      invalidValue: 15,
      name: 'BigNumberLessThan',
      validValue: 9
    },
    {
      constructor: options => Assert.bigNumberLessThanOrEqualTo(10, options),
      invalidValue: 15,
      name: 'BigNumberLessThanOrEqualTo',
      validValue: 10
    }
  ];

  const debugValues = [true, false];
  const validateSignificantDigitsOptions = [true, false];

  asserts.forEach(({ constructor, invalidValue, name, validValue }) => {
    describe(name, () => {
      debugValues.forEach(initialDebugValue => {
        validateSignificantDigitsOptions.forEach(validateSignificantDigits => {
          describe(`with DEBUG=${initialDebugValue} and validateSignificantDigits=${validateSignificantDigits}`, () => {
            it('should restore original BigNumber.DEBUG value after successful validation', ({ assert }) => {
              BigNumber.DEBUG = initialDebugValue;

              assert.equal(BigNumber.DEBUG, initialDebugValue);

              constructor({ validateSignificantDigits }).validate(validValue);

              assert.equal(BigNumber.DEBUG, initialDebugValue);
            });

            it('should restore original BigNumber.DEBUG value after failed validation', ({ assert }) => {
              BigNumber.DEBUG = initialDebugValue;

              assert.equal(BigNumber.DEBUG, initialDebugValue);

              try {
                constructor({ validateSignificantDigits }).validate(invalidValue);
                assert.fail();
              } catch (e) {
                assert.ok(e instanceof Violation);
              }

              assert.equal(BigNumber.DEBUG, initialDebugValue);
            });

            it('should restore original BigNumber.DEBUG value after validation with invalid input', ({ assert }) => {
              BigNumber.DEBUG = initialDebugValue;

              assert.equal(BigNumber.DEBUG, initialDebugValue);

              try {
                constructor({ validateSignificantDigits }).validate('invalid');
                assert.fail();
              } catch (e) {
                assert.ok(e instanceof Violation);
              }

              assert.equal(BigNumber.DEBUG, initialDebugValue);
            });
          });
        });
      });
    });
  });
});
