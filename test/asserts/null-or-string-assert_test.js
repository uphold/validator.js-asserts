
/**
 * Module dependencies.
 */

import NullOrStringAssert from '../../src/asserts/null-or-string-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `NullOrStringAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrString: NullOrStringAssert
});

/**
 * Test `NullOrStringAssert`.
 */

describe('NullOrStringAssert', () => {
  it('should throw an error if the input value is not a `null` or a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().NullOrString().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_null_or_a_string');
      }
    });
  });

  it('should throw an error if input is a string but is out of boundaries', () => {
    try {
      new Assert().NullOrString({ min: 10 }).validate('foo');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.violation.should.eql({ min: 10 });
    }
  });

  it('should expose `assert` equal to `NullOrString`', () => {
    try {
      new Assert().NullOrString().validate({});

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('NullOrString');
    }
  });

  it('should expose `min` or `max` on the violation if testing boundaries of a string', () => {
    try {
      new Assert().NullOrString({ min: 5 }).validate('foo');

      should.fail();
    } catch (e) {
      e.show().violation.min.should.equal(5);
    }
  });

  it('should expose `min` or `max` on the `assert` if testing boundaries of a string', () => {
    try {
      new Assert().NullOrString({ max: 2, min: 1 }).validate('foobar');

      should.fail();
    } catch (e) {
      e.assert.min.should.equal(1);
      e.assert.max.should.equal(2);
    }
  });

  it('should accept `null`', () => {
    new Assert().NullOrString().validate(null);
  });

  it('should accept a string within boundaries', () => {
    new Assert().NullOrString({ max: 10 }).validate('foo');
  });

  it('should accept a string', () => {
    new Assert().NullOrString().validate('foo');
  });
});
