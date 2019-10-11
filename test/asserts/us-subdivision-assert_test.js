'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const UsSubdivisionAssert = require('../../src/asserts/us-subdivision-assert');
const should = require('should');

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
        Assert.usSubdivision().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if subdivision is invalid', () => {
    try {
      Assert.usSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if category is unsupported', () => {
    try {
      Assert.usSubdivision({ categories: ['foo', 'districts'] });

      should.fail();
    } catch (e) {
      e.message.should.equal('Unsupported categories "foo" given');
    }
  });

  it("should throw an error if only alpha2 codes are allowed but input isn't one", () => {
    try {
      Assert.usSubdivision({ alpha2Only: true }).validate('US-CA');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should expose `assert` equal to `UsSubdivision`', () => {
    try {
      Assert.usSubdivision().validate('FOO');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should allow restricting to `districts` subdivisions only', () => {
    try {
      Assert.usSubdivision({ categories: ['districts'] }).validate('AS');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should allow restricting to `outlying` subdivisions only', () => {
    try {
      Assert.usSubdivision({ categories: ['outlying'] }).validate('DC');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should allow restricting to `states` subdivisions only', () => {
    try {
      Assert.usSubdivision({ categories: ['states'] }).validate('AS');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UsSubdivision');
    }
  });

  it('should accept a `district` subdivision by default', () => {
    Assert.usSubdivision().validate('DC');
  });

  it('should accept an `outlying` subdivision by default', () => {
    Assert.usSubdivision().validate('AS');
  });

  it('should accept a `state` subdivision by default', () => {
    Assert.usSubdivision().validate('AK');
  });

  it('should accept a full subdivision code by default', () => {
    Assert.usSubdivision().validate('US-CA');
  });

  it('should accept an `alpha2` code if only those are allowed', () => {
    Assert.usSubdivision({ alpha2Only: true }).validate('CA');
  });
});
