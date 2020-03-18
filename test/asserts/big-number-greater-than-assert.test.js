'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumber = require('bignumber.js');
const BigNumberGreaterThanAssert = require('../../src/asserts/big-number-greater-than-assert');

/**
 * Extend `Assert` with `BigNumberGreaterThanAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberGreaterThan: BigNumberGreaterThanAssert
});

/**
 * Test `BigNumberGreaterThanAssert`.
 */

describe('BigNumberGreaterThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      Assert.bigNumberGreaterThan();

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
          Assert.bigNumberGreaterThan({}, option);

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
            Assert.bigNumberGreaterThan(10, option).validate(choice);

            fail();
          } catch (e) {
            expect(e).toBeInstanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is equal to threshold', () => {
        try {
          Assert.bigNumberGreaterThan(10, option).validate(10);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should throw an error if the input number is less than the threshold', () => {
        try {
          Assert.bigNumberGreaterThan(10, option).validate(9.99999999);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThan`', () => {
        try {
          Assert.bigNumberGreaterThan(1, option).validate(0.1);

          fail();
        } catch (e) {
          expect(e.show().assert).toBe('BigNumberGreaterThan');
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThan` and `message` on the violation if the input value is not a number', () => {
        try {
          Assert.bigNumberGreaterThan(10, option).validate({});

          fail();
        } catch (e) {
          expect(e.show().assert).toBe('BigNumberGreaterThan');
          expect(e.show().violation.message).toMatch(/Not a number/);
        }
      });

      it('should expose `threshold` on the violation', () => {
        try {
          Assert.bigNumberGreaterThan(10, option).validate(0.1);

          fail();
        } catch (e) {
          expect(e.show().violation.threshold).toBe('10');
        }
      });

      it('should accept a big number as a `threshold` value', () => {
        Assert.bigNumberGreaterThan(new BigNumber(10), option).validate(10.00000001);
      });

      it('should accept a number that is greater than threshold', () => {
        Assert.bigNumberGreaterThan(10, option).validate(10.00000001);
      });
    });
  });
});
