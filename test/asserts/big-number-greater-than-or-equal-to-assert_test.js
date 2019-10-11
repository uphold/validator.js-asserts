'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumber = require('bignumber.js');
const BigNumberGreaterThanOrEqualToAssert = require('../../src/asserts/big-number-greater-than-or-equal-to-assert');
const should = require('should');

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

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${
      option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined
    }'`, () => {
      it('should throw an error if `threshold` is not a number', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo({}, option);

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
            Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(choice);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is less than the threshold', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(9.99999999);

          should.fail();
        } catch (e) {
          e.should.be.instanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThanOrEqualTo`', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(1, option).validate(0.1);

          should.fail();
        } catch (e) {
          e.show().assert.should.equal('BigNumberGreaterThanOrEqualTo');
        }
      });

      it('should expose `message` on the violation if the input value is not a number', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate({});

          should.fail();
        } catch (e) {
          e.show().violation.message.should.match(/Not a number/);
        }
      });

      it('should expose `threshold` on the violation', () => {
        try {
          Assert.bigNumberGreaterThanOrEqualTo(10, option).validate(0.1);

          should.fail();
        } catch (e) {
          e.show().violation.threshold.should.equal('10');
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
