'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BigNumber = require('bignumber.js');
const BigNumberEqualToAssert = require('../../src/asserts/big-number-equal-to-assert.js');

/**
 * Extend `Assert` with `BigNumberEqualToAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberEqualTo: BigNumberEqualToAssert
});

/**
 * Test `BigNumberEqualToAssert`.
 */

describe('BigNumberEqualToAssert', () => {
  it('should throw an error if `value` is missing', ({ assert }) => {
    try {
      Assert.bigNumberEqualTo();

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'A value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${
      option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined
    }'`, () => {
      it('should throw an error if `value` is not a number', ({ assert }) => {
        try {
          Assert.bigNumberEqualTo({}, option);

          assert.fail();
        } catch (e) {
          assert.ok(e instanceof Violation);
          assert.ok(e.show().violation.message.match(/Not a number/));
        }
      });

      it('should throw an error if the input value is not a number', ({ assert }) => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            Assert.bigNumberEqualTo(10, option).validate(choice);

            assert.fail();
          } catch (e) {
            assert.ok(e instanceof Violation);
          }
        });
      });

      it('should throw an error if the input number is greater than the value', ({ assert }) => {
        try {
          Assert.bigNumberEqualTo(10, option).validate(12);

          assert.fail();
        } catch (e) {
          assert.ok(e instanceof Violation);
        }
      });

      it('should throw an error if the input number is less than the value', ({ assert }) => {
        try {
          Assert.bigNumberEqualTo(10, option).validate(9);

          assert.fail();
        } catch (e) {
          assert.ok(e instanceof Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberEqualTo`', ({ assert }) => {
        try {
          Assert.bigNumberEqualTo(1, option).validate(0.1);

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumberEqualTo');
        }
      });

      it('should expose `assert` equal to `BigNumberEqualTo` and `message` on the violation if the input value is not a number', ({
        assert
      }) => {
        try {
          Assert.bigNumberEqualTo(10, option).validate({});

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumberEqualTo');
          assert.ok(e.show().violation.message.match(/Not a number/));
        }
      });

      it('should expose `value` on the violation', ({ assert }) => {
        try {
          Assert.bigNumberEqualTo(10, option).validate(0.1);

          assert.fail();
        } catch (e) {
          assert.equal(e.show().violation.value, '10');
        }
      });

      it('should accept a big number as a value', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberEqualTo(new BigNumber(10), option).validate(10);
        });
      });

      it('should accept a number that is equal to value', ({ assert }) => {
        assert.doesNotThrow(() => {
          Assert.bigNumberEqualTo(10, option).validate(10);
        });
      });
    });
  });
});
