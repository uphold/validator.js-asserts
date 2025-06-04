'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BigNumber = require('bignumber.js');
const BigNumberGreaterThanOrEqualToAssert = require('../../src/asserts/big-number-greater-than-or-equal-to-assert.js');

/**
 * Extend `Assert` with `BigNumberGreaterThanOrEqualToAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberGreaterThanOrEqualTo: BigNumberGreaterThanOrEqualToAssert
});

/**
 * Test `BigNumberGreaterThanOrEqualToAssert`.
 */

describe('BigNumberGreaterThanOrEqualToAssert', () => {
  it('should throw an error if `threshold` is missing', ({ assert }) => {
    try {
      Assert.bigNumberGreaterThanOrEqualTo();

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
          Assert.bigNumberGreaterThanOrEqualTo({}, option);

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
            Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(choice);

            assert.fail();
          } catch (e) {
            assert.ok(e instanceof Violation);
          }
        });
      });

      it('should throw an error if the input number is less than the threshold', ({ assert }) => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(9.99999999);

          assert.fail();
        } catch (e) {
          assert.ok(e instanceof Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThanOrEqualTo`', ({ assert }) => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(1, option).validate(0.1);

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumberGreaterThanOrEqualTo');
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThanOrEqualTo` and `message` on the violation if the input value is not a number', ({
        assert
      }) => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate({});

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumberGreaterThanOrEqualTo');
          assert.match(e.show().violation.message, /Not a number/);
        }
      });

      it('should expose `threshold` on the violation', ({ assert }) => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(0.1);

          assert.fail();
        } catch (e) {
          assert.equal(e.show().violation.threshold, '10');
        }
      });

      it('should accept a big number as a `threshold` value', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberGreaterThanOrEqualTo(new BigNumber(10), option).validate(10.00000001);
        });
      });

      it('should accept a number that is greater than threshold', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(10.00000001);
        });
      });

      it('should accept a number that is equal to threshold', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(10);
        });
      });
    });
  });
});
