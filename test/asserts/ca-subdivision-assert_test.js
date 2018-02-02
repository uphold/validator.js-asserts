
/**
 * Module dependencies.
 */

import CaSubdivisionAssert from '../../src/asserts/ca-subdivision-assert';
import should from 'should';
import { Assert as BaseAssert, Validator, Violation } from 'validator.js';

/**
 * Extend `Assert` with `CaSubdivisionAssert`.
 */

const Assert = BaseAssert.extend({
  CaSubdivision: CaSubdivisionAssert
});

/**
 * Test `CaSubdivisionAssert`.
 */

describe('CaSubdivisionAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().CaSubdivision().validate(choice);

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
      new Assert().CaSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if subdivision prefix is invalid', () => {
    try {
      new Assert().CaSubdivision().validate(`US-AB`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `CaSubdivision`', () => {
    try {
      new Assert().CaSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('CaSubdivision');
    }
  });

  it('should accept a valid subdivision', () => {
    ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'].forEach(subdivision => {
      new Assert().CaSubdivision().validate(`CA-${subdivision}`);
      new Assert().CaSubdivision().validate(subdivision);
    });
  });
});
