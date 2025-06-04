'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BigNumber = require('bignumber.js');
const BigNumberLessThanOrEqualToAssert = require('../../src/asserts/big-number-less-than-or-equal-to-assert.js');

/**
 * Extend `Assert` with `BigNumberLessThanOrEqualToAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberLessThanOrEqualTo: BigNumberLessThanOrEqualToAssert
});

/**
 * Test `BigNumberLessThanOrEqualToAssert`.
 */

describe('BigNumberLessThanOrEqualToAssert', () => {
  it('should throw an error if `threshold` is missing', ({ assert }) => {
    try {
      Assert.bigNumberLessThanOrEqualTo();

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'A threshold value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${
      option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined
    }'`, () => {
      it('should throw an error if `threshold` is not a number', ({ assert }) => {
        try {
          Assert.bigNumberLessThanOrEqualTo({}, option);

          assert.fail();
        } catch (e) {
          assert.ok(e instanceof Violation);
          assert.match(e.show().violation.message, /Not a number/);
        }
      });

      it('should throw an error if the input value is not a number', ({ assert }) => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            Assert.bigNumberLessThanOrEqualTo(10, option).validate(choice);

            assert.fail();
          } catch (e) {
            assert.ok(e instanceof Violation);
          }
        });
      });

      it('should throw an error if the input number is greater than the threshold', ({ assert }) => {
        try {
          Assert.bigNumberLessThanOrEqualTo(10, option).validate(10.0000000001);

          assert.fail();
        } catch (e) {
          assert.ok(e instanceof Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberLessThanOrEqualTo`', ({ assert }) => {
        try {
          Assert.bigNumberLessThanOrEqualTo(10, option).validate(10.01);

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumberLessThanOrEqualTo');
        }
      });

      it('should expose `assert` equal to `BigNumberLessThanOrEqualTo` and `message` on the violation if the input value is not a number', ({
        assert
      }) => {
        try {
          Assert.bigNumberLessThanOrEqualTo(10, option).validate({});

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumberLessThanOrEqualTo');
          assert.match(e.show().violation.message, /Not a number/);
        }
      });

      it('should expose `threshold` on the violation', ({ assert }) => {
        try {
          Assert.bigNumberLessThanOrEqualTo(10, option).validate(10.01);

          assert.fail();
        } catch (e) {
          assert.equal(e.show().violation.threshold, '10');
        }
      });

      it('should accept a big number as a `threshold` value', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberLessThanOrEqualTo(new BigNumber(10), option).validate(9.99999999);
        });
      });

      it('should accept a number that is less than threshold', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberLessThanOrEqualTo(10, option).validate(9.99999999);
        });
      });

      it('should accept a number that is equal to threshold', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberLessThanOrEqualTo(10, option).validate(10);
        });
      });
    });
  });
});
