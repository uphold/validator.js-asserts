'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const UsSubdivisionAssert = require('../../src/asserts/us-subdivision-assert.js');

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
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.usSubdivision().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if subdivision is invalid', ({ assert }) => {
    try {
      Assert.usSubdivision().validate('FOO');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should throw an error if category is unsupported', ({ assert }) => {
    try {
      Assert.usSubdivision({ categories: ['foo', 'districts'] });

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'Unsupported categories "foo" given');
    }
  });

  it("should throw an error if only alpha2 codes are allowed but input isn't one", ({ assert }) => {
    try {
      Assert.usSubdivision({ alpha2Only: true }).validate('US-CA');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'UsSubdivision');
    }
  });

  it('should expose `assert` equal to `UsSubdivision`', ({ assert }) => {
    try {
      Assert.usSubdivision().validate('FOO');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'UsSubdivision');
    }
  });

  it('should allow restricting to `districts` subdivisions only', ({ assert }) => {
    try {
      Assert.usSubdivision({ categories: ['districts'] }).validate('AS');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'UsSubdivision');
    }
  });

  it('should allow restricting to `outlying` subdivisions only', ({ assert }) => {
    try {
      Assert.usSubdivision({ categories: ['outlying'] }).validate('DC');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'UsSubdivision');
    }
  });

  it('should allow restricting to `states` subdivisions only', ({ assert }) => {
    try {
      Assert.usSubdivision({ categories: ['states'] }).validate('AS');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'UsSubdivision');
    }
  });

  it('should accept a `district` subdivision by default', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.usSubdivision().validate('DC');
    });
  });

  it('should accept an `outlying` subdivision by default', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.usSubdivision().validate('AS');
    });
  });

  it('should accept a `state` subdivision by default', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.usSubdivision().validate('AK');
    });
  });

  it('should accept a full subdivision code by default', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.usSubdivision().validate('US-CA');
    });
  });

  it('should accept an `alpha2` code if only those are allowed', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.usSubdivision({ alpha2Only: true }).validate('CA');
    });
  });
});
