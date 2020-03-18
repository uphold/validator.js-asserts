'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumber = require('bignumber.js');
const BigNumberGreaterThanOrEqualToAssert = require('../../src/asserts/big-number-greater-than-or-equal-to-assert');

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
  it('should throw an error if `threshold` is missing', () => {
    try {
      Assert.bigNumberGreaterThanOrEqualTo();

      fail();
    } catch (e) {
      expect(e.message).toBe('A threshold value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${
      option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined
    }'`, () => {
      it('should throw an error if `threshold` is not a number', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo({}, option);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
          expect(e.show().violation.message).toMatch(/Not a number/);
        }
      });

      it('should throw an error if the input value is not a number', () => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(choice);

            fail();
          } catch (e) {
            expect(e).toBeInstanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is less than the threshold', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(9.99999999);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThanOrEqualTo`', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(1, option).validate(0.1);

          fail();
        } catch (e) {
          expect(e.show().assert).toBe('BigNumberGreaterThanOrEqualTo');
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThanOrEqualTo` and `message` on the violation if the input value is not a number', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate({});

          fail();
        } catch (e) {
          expect(e.show().assert).toBe('BigNumberGreaterThanOrEqualTo');
          expect(e.show().violation.message).toMatch(/Not a number/);
        }
      });

      it('should expose `threshold` on the violation', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(0.1);

          fail();
        } catch (e) {
          expect(e.show().violation.threshold).toBe('10');
        }
      });

      it('should accept a big number as a `threshold` value', () => {
        Assert.bigNumberGreaterThanOrEqualTo(new BigNumber(10), option).validate(10.00000001);
      });

      it('should accept a number that is greater than threshold', () => {
        Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(10.00000001);
      });

      it('should accept a number that is equal to threshold', () => {
        Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(10);
      });
    });
  });
});
