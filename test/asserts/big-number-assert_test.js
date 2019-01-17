
/**
 * Module dependencies.
 */

import BigNumberAssert from '../../src/asserts/big-number-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

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
    describe(`with option '${option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined }'`, () => {
      it('should throw an error if the input value is not a big number', () => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            new Assert().BigNumber(option).validate(choice);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
          }
        });
      });

      it('should expose `assert` equal to `BigNumber`', () => {
        try {
          new Assert().BigNumber(option).validate();

          should.fail();
        } catch (e) {
          e.show().assert.should.equal('BigNumber');
        }
      });

      it('should accept a big number', () => {
        const choices = [
          1.01,
          1.0111111111,
          '1.0111111111'
        ];

        choices.forEach(choice => {
          new Assert().BigNumber(option).validate(choice);
        });
      });

      if (!option || option.validateSignificantDigits === true) {
        it('should throw an error if a number has more than 15 significant digits', () => {
          try {
            new Assert().BigNumber(option).validate(1.011111111111111111111111111111111111111111);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
            e.show().assert.should.equal('BigNumber');
            e.show().violation.message.should.equal('[BigNumber Error] Number primitive has more than 15 significant digits: 1.011111111111111');
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
            new Assert().BigNumber({ validateSignificantDigits: false }).validate(choice);
          });
        });
      }
    });
  });
});
