
/**
 * Module dependencies.
 */

import AuSubdivisionAssert from '../../src/asserts/au-subdivision-assert';
import should from 'should';
import { Assert as BaseAssert, Validator, Violation } from 'validator.js';

/**
 * Extend `Assert` with `AuSubdivisionAssert`.
 */

const Assert = BaseAssert.extend({
  AuSubdivision: AuSubdivisionAssert
});

/**
 * Test `AuSubdivisionAssert`.
 */

describe('AuSubdivisionAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().AuSubdivision().validate(choice);

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
      new Assert().AuSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if subdivision prefix is invalid', () => {
    try {
      new Assert().AuSubdivision().validate(`US-NSW`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `AuSubdivision`', () => {
    try {
      new Assert().AuSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('AuSubdivision');
    }
  });

  it('should accept a valid subdivision', () => {
    ['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'NT'].forEach(subdivision => {
      new Assert().AuSubdivision().validate(`AU-${subdivision}`);
      new Assert().AuSubdivision().validate(subdivision);
    });
  });
});
