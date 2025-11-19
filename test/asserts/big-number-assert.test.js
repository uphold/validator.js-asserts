'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BigNumberAssert = require('../../src/asserts/big-number-assert.js');

/**
 * Extend `Assert` with `BigNumberAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumber: BigNumberAssert
});

/**
 * Test `BigNumberAssert`.
 */

describe('BigNumberAssert', () => {
  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${
      option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined
    }'`, () => {
      it('should throw an error if the input value is not a big number', ({ assert }) => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            Assert.bigNumber(option).validate(choice);

            assert.fail();
          } catch (e) {
            assert.ok(e instanceof Violation);
          }
        });
      });

      it('should expose `assert` equal to `BigNumber`', ({ assert }) => {
        try {
          Assert.bigNumber(option).validate();

          assert.fail();
        } catch (e) {
          assert.equal(e.show().assert, 'BigNumber');
        }
      });

      it('should accept a big number', () => {
        const choices = [1.01, 1.0111111111, '1.0111111111'];

        choices.forEach(choice => {
          Assert.bigNumber(option).validate(choice);
        });
      });

      if (!option || option.validateSignificantDigits === true) {
        it('should throw an error if a number has more than 15 significant digits', ({ assert }) => {
          try {
            // eslint-disable-next-line no-loss-of-precision
            Assert.bigNumber(option).validate(1.011111111111111111111111111111111111111111);

            assert.fail();
          } catch (e) {
            assert.ok(e instanceof Violation);
            assert.equal(e.show().assert, 'BigNumber');
            assert.equal(
              e.show().violation.message,
              '[BigNumber Error] Number primitive has more than 15 significant digits: 1.011111111111111'
            );
          }
        });
      } else {
        it('should accept a big number with more than 15 significant digits', () => {
          const choices = [
            1.01,
            1.0111111111,
            // eslint-disable-next-line no-loss-of-precision
            1.011111111111111111111111111111111111111111,
            '1.0111111111',
            '1.011111111111111111111111111111111111111111'
          ];

          choices.forEach(choice => {
            Assert.bigNumber({ validateSignificantDigits: false }).validate(choice);
          });
        });
      }
    });
  });

  it('should restore the original BigNumber.DEBUG value after validation', ({ assert }) => {
    const BigNumber = require('bignumber.js');

    BigNumber.DEBUG = false;

    Assert.bigNumber({ validateSignificantDigits: true }).validate('1.01');

    assert.equal(BigNumber.DEBUG, false);

    BigNumber.DEBUG = true;

    Assert.bigNumber({ validateSignificantDigits: false }).validate('1.01');

    assert.equal(BigNumber.DEBUG, true);
  });

  it('should restore the original BigNumber.DEBUG value even when validation fails', ({ assert }) => {
    const BigNumber = require('bignumber.js');

    BigNumber.DEBUG = false;

    try {
      Assert.bigNumber({ validateSignificantDigits: true }).validate('invalid');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }

    assert.equal(BigNumber.DEBUG, false);
  });
});
