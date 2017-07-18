
/**
 * Module dependencies.
 */

import StringOfLengthAssert from '../../src/asserts/string-of-length-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `StringOfLengthAssert`.
 */

const Assert = BaseAssert.extend({
  StringOfLength: StringOfLengthAssert
});

/**
 * Test `StringOfLengthAssert`,
 */

describe('StringOfLengthAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    [{}, []].forEach(choice => {
      try {
        new Assert().StringOfLength().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is empty', () => {
    try {
      new Assert().StringOfLength().validate('');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().should.have.properties({ assert: 'Length', violation: { min: 1 } });
    }
  });

  it('should throw an error if the input value is longer than the maximum length', () => {
    try {
      new Assert().StringOfLength({ max: 2 }).validate('foo');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().should.have.properties({ assert: 'Length', violation: { max: 2 } });
    }
  });

  it('should throw an error if the input value is shorter than the minimum length', () => {
    try {
      new Assert().StringOfLength({ min: 4 }).validate('foo');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().should.have.properties({ assert: 'Length', violation: { min: 4 } });
    }
  });

  it('should accept a string within the length boundaries', () => {
    new Assert().StringOfLength({ max: 4, min: 2 }).validate('foo');
  });
});
