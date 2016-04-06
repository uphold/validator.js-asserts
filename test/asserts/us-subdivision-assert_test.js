
/**
 * Module dependencies.
 */

import UsSubdivisionAssert from '../../src/asserts/us-subdivision-assert';
import should from 'should';
import { Assert as BaseAssert, Validator, Violation } from 'validator.js';

/**
 * Extend `Assert` with `UsSubdivisionAssert`.
 */

const Assert = BaseAssert.extend({
  UsSubdivision: UsSubdivisionAssert
});

/**
 * Test `UsSubdivisionAssert`.
 */

describe('UsSubdivisionAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().UsSubdivision().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if subdivision is invalid', () => {
    try {
      new Assert().UsSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if category is unsupported', () => {
    try {
      new Assert().UsSubdivision({ categories: ['foo', 'districts'] });

      should.fail();
    } catch (e) {
      e.message.should.equal('Unsupported categories "foo" given');
    }
  });

  it('should throw an error if only alpha2 codes are allowed but input isn\'t one', () => {
    try {
      new Assert().UsSubdivision({ alpha2Only: true }).validate('US-CA');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should expose `assert` equal to `UsSubdivision`', () => {
    try {
      new Assert().UsSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should allow restricting to `districts` subdivisions only', () => {
    try {
      new Assert().UsSubdivision({ categories: ['districts'] }).validate('AS');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should allow restricting to `outlying` subdivisions only', () => {
    try {
      new Assert().UsSubdivision({ categories: ['outlying'] }).validate('DC');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should allow restricting to `states` subdivisions only', () => {
    try {
      new Assert().UsSubdivision({ categories: ['states'] }).validate('AS');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should accept a `district` subdivision by default', () => {
    new Assert().UsSubdivision().validate('DC');
  });

  it('should accept an `outlying` subdivision by default', () => {
    new Assert().UsSubdivision().validate('AS');
  });

  it('should accept a `state` subdivision by default', () => {
    new Assert().UsSubdivision().validate('AK');
  });

  it('should accept a full subdivision code by default', () => {
    new Assert().UsSubdivision().validate('US-CA');
  });

  it('should accept an `alpha2` code if only those are allowed', () => {
    new Assert().UsSubdivision({ alpha2Only: true }).validate('CA');
  });
});
