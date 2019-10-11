'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumberAssert = require('../../src/asserts/big-number-assert');
const should = require('should');

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
      it('should throw an error if the input value is not a big number', () => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            Assert.bigNumber(option).validate(choice);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
          }
        });
      });

      it('should expose `assert` equal to `BigNumber`', () => {
        try {
          Assert.bigNumber(option).validate();

          should.fail();
        } catch (e) {
          e.show().assert.should.equal('BigNumber');
        }
      });

      it('should accept a big number', () => {
        const choices = [1.01, 1.0111111111, '1.0111111111'];

        choices.forEach(choice => {
          Assert.bigNumber(option).validate(choice);
        });
      });

      if (!option || option.validateSignificantDigits === true) {
        it('should throw an error if a number has more than 15 significant digits', () => {
          try {
            Assert.bigNumber(option).validate(1.011111111111111111111111111111111111111111);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
            e.show().assert.should.equal('BigNumber');
            e.show().violation.message.should.equal(
              '[BigNumber Error] Number primitive has more than 15 significant digits: 1.011111111111111'
            );
          }
        });
      } else {
        it('should accept a big number with more than 15 significant digits', () => {
          const choices = [
            1.01,
            1.0111111111,
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
});
