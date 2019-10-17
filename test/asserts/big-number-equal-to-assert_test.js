'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumber = require('bignumber.js');
const BigNumberEqualToAssert = require('../../src/asserts/big-number-equal-to-assert');

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
  it('should throw an error if `value` is missing', () => {
    try {
      Assert.bigNumberEqualTo();

      fail();
    } catch (e) {
      expect(e.message).toBe('A value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${
      option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined
    }'`, () => {
      it('should throw an error if `value` is not a number', () => {
        try {
          Assert.bigNumberEqualTo({}, option);

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
            Assert.bigNumberEqualTo(10, option).validate(choice);

            fail();
          } catch (e) {
            expect(e).toBeInstanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is greater than the value', () => {
        try {
          Assert.bigNumberEqualTo(10, option).validate(12);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should throw an error if the input number is less than the value', () => {
        try {
          Assert.bigNumberEqualTo(10, option).validate(9);

          fail();
        } catch (e) {
          expect(e).toBeInstanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberEqualTo`', () => {
        try {
          Assert.bigNumberEqualTo(1, option).validate(0.1);

          fail();
        } catch (e) {
          expect(e.show().assert).toBe('BigNumberEqualTo');
        }
      });

      it('should expose `message` on the violation if the input value is not a number', () => {
        try {
          Assert.bigNumberEqualTo(10, option).validate({});

          fail();
        } catch (e) {
          expect(e.show().violation.message).toMatch(/Not a number/);
        }
      });

      it('should expose `value` on the violation', () => {
        try {
          Assert.bigNumberEqualTo(10, option).validate(0.1);

          fail();
        } catch (e) {
          expect(e.show().violation.value).toBe('10');
        }
      });

      it('should accept a big number as a value', () => {
        Assert.bigNumberEqualTo(new BigNumber(10), option).validate(10);
      });

      it('should accept a number that is equal to value', () => {
        Assert.bigNumberEqualTo(10, option).validate(10);
      });
    });
  });
});
