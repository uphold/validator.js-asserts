'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const UsZipCodeAssert = require('../../src/asserts/us-zip-code-assert');
const should = require('should');

/**
 * Extend `Assert` with `UsZipCodeAssert`.
 */

const Assert = BaseAssert.extend({
  UsZipCode: UsZipCodeAssert
});

/**
 * Test `UsZipCodeAssert`.
 */

describe('UsZipCodeAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.usZipCode().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if `value` is invalid', () => {
    const choices = ['#', '12345--1234', '12345\t1234', '1234-12345', '1234'];

    choices.forEach(choice => {
      try {
        Assert.usZipCode().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.show().assert.should.equal('UsZipCode');
      }
    });
  });

  it('should accept 5-digit zip codes', () => {
    Assert.usZipCode().validate('12345');
  });

  it('should accept 9-digit zip codes', () => {
    ['12345-1234', '12345 1234', '123456789'].forEach(choice => {
      Assert.usZipCode().validate(choice);
    });
  });
});
