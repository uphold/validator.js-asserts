
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Validator, Violation } from 'validator.js';
import CountryAssert from '../../src/asserts/country-assert';
import should from 'should';

/**
 * Extend `Assert` with `CountryAssert`.
 */

const Assert = BaseAssert.extend({
  Country: CountryAssert
});

/**
 * Test `CountryAssert`.
 */

describe('CountryAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach((choice) => {
      try {
        new Assert().Country().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if country is invalid', () => {
    try {
      new Assert().Country().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('FOO');
    }
  });

  it('should expose `assert` equal to `Country`', () => {
    try {
      new Assert().Country().validate([]);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Country');
    }
  });

  it('should accept an `alpha-3` code', () => {
    new Assert().Country().validate('PRT');
  });

  it('should accept an `alpha-3` code belonging to a division', () => {
    new Assert().Country().validate('SHN');
  });

  it('should accept an `alpha-2` code', () => {
    new Assert().Country().validate('PT');
  });

  it('should accept an `alpha-2` code belonging to a division', () => {
    new Assert().Country().validate('BQ');
  });

  it('should accept a country `official` name', () => {
    new Assert().Country().validate('Portuguese Republic');
  });

  it('should accept a country `common` name', () => {
    new Assert().Country().validate('Portugal');
  });

  it('should accept a country `altSpelling` name', () => {
    new Assert().Country().validate('República Portuguesa');
  });
});
