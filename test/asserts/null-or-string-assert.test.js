'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const NullOrStringAssert = require('../../src/asserts/null-or-string-assert.js');

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
  it('should throw an error if the input value is not a `null` or a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.nullOrString().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_null_or_a_string');
      }
    });
  });

  it('should throw an error if input is a string but is out of boundaries', ({ assert }) => {
    try {
      Assert.nullOrString({ min: 10 }).validate('foo');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.deepEqual(e.violation, { min: 10 });
    }
  });

  it('should expose `assert` equal to `NullOrString`', ({ assert }) => {
    try {
      Assert.nullOrString().validate({});

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'NullOrString');
    }
  });

  it('should expose `min` or `max` on the violation if testing boundaries of a string', ({ assert }) => {
    try {
      Assert.nullOrString({ min: 5 }).validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().violation.min, 5);
    }
  });

  it('should expose `min` or `max` on the `assert` if testing boundaries of a string', ({ assert }) => {
    try {
      Assert.nullOrString({ max: 2, min: 1 }).validate('foobar');

      assert.fail();
    } catch (e) {
      assert.equal(e.assert.min, 1);
      assert.equal(e.assert.max, 2);
    }
  });

  it('should accept `null`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrString().validate(null);
    });
  });

  it('should accept a string within boundaries', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrString({ max: 10 }).validate('foo');
    });
  });

  it('should accept a string', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrString().validate('foo');
    });
  });
});
