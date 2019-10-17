'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumber = require('bignumber.js');
const BigNumberLessThanAssert = require('../../src/asserts/big-number-less-than-assert');

/**
 * Extend `Assert` with `BigNumberLessThanAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberLessThan: BigNumberLessThanAssert
});

/**
 * Test `BigNumberLessThanAssert`.
 */

describe('BigNumberLessThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      Assert.bigNumberLessThan();

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
          Assert.bigNumberLessThan({}, option);

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
            Assert.bigNumberLessThan(10, option).validate(choice);

            fail();
          } catch (e) {
            expect(e).toBeInstanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is equal to threshold', () => {
        try {
          Assert.bigNumberLessThan(10, option).validate(10);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should throw an error if the input number is greater than the threshold', () => {
        try {
          Assert.bigNumberLessThan(10, option).validate(10.01);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberLessThan`', () => {
        try {
          Assert.bigNumberLessThan(10, option).validate(10.01);

          fail();
        } catch (e) {
          expect(e.show().assert).toBe('BigNumberLessThan');
        }
      });

      it('should expose `message` on the violation if the input value is not a number', () => {
        try {
          Assert.bigNumberLessThan(10, option).validate({});

          fail();
        } catch (e) {
          expect(e.show().violation.message).toMatch(/Not a number/);
        }
      });

      it('should expose `threshold` on the violation', () => {
        try {
          Assert.bigNumberLessThan(10, option).validate(10.01);

          fail();
        } catch (e) {
          expect(e.show().violation.threshold).toBe('10');
        }
      });

      it('should accept a big number as a `threshold` value', () => {
        Assert.bigNumberLessThan(new BigNumber(10), option).validate(9.99999999);
      });

      it('should accept a number that is less than threshold', () => {
        Assert.bigNumberLessThan(10, option).validate(9.99999999);
      });
    });
  });
});
