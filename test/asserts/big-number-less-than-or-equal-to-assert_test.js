'use strict';

/**
 * Module dependencies.
 */

const BigNumber = require('bignumber.js');
const BigNumberLessThanOrEqualToAssert = require('../../src/asserts/big-number-less-than-or-equal-to-assert');
const should = require('should');
const { Assert: BaseAssert, Violation } = require('validator.js');

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
  it('should throw an error if `threshold` is missing', () => {
    try {
      new Assert.BigNumberLessThanOrEqualTo();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined }'`, () => {
      it('should throw an error if `threshold` is not a number', () => {
        try {
          new Assert.BigNumberLessThanOrEqualTo({}, option);

          should.fail();
        } catch (e) {
          e.should.be.instanceOf(Violation);
          e.show().violation.message.should.match(/Not a number/);
        }
      });

      it('should throw an error if the input value is not a number', () => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            new Assert.BigNumberLessThanOrEqualTo(10, option).validate(choice);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is greater than the threshold', () => {
        try {
          new Assert.BigNumberLessThanOrEqualTo(10, option).validate(10.0000000001);

          should.fail();
        } catch (e) {
          e.should.be.instanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberLessThanOrEqualTo`', () => {
        try {
          new Assert.BigNumberLessThanOrEqualTo(10, option).validate(10.01);

          should.fail();
        } catch (e) {
          e.show().assert.should.equal('BigNumberLessThanOrEqualTo');
        }
      });

      it('should expose `message` on the violation if the input value is not a number', () => {
        try {
          new Assert.BigNumberLessThanOrEqualTo(10, option).validate({});

          should.fail();
        } catch (e) {
          e.show().violation.message.should.match(/Not a number/);
        }
      });

      it('should expose `threshold` on the violation', () => {
        try {
          new Assert.BigNumberLessThanOrEqualTo(10, option).validate(10.01);

          should.fail();
        } catch (e) {
          e.show().violation.threshold.should.equal('10');
        }
      });

      it('should accept a big number as a `threshold` value', () => {
        new Assert.BigNumberLessThanOrEqualTo(new BigNumber(10), option).validate(9.99999999);
      });

      it('should accept a number that is less than threshold', () => {
        new Assert.BigNumberLessThanOrEqualTo(10, option).validate(9.99999999);
      });

      it('should accept a number that is equal to threshold', () => {
        new Assert.BigNumberLessThanOrEqualTo(10, option).validate(10);
      });
    });
  });
});
