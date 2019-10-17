'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const PlainObjectAssert = require('../../src/asserts/plain-object-assert');

/**
 * Extend `Assert` with `PlainObjectAssert`.
 */

const Assert = BaseAssert.extend({
  PlainObject: PlainObjectAssert
});

/**
 * Test `PlainObjectAssert`.
 */

describe('PlainObjectAssert', () => {
  it('should throw an error if the input value is not a plain object', () => {
    const choices = [[], 123];

    choices.forEach(choice => {
      try {
        Assert.plainObject().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `PlainObject`', () => {
    try {
      Assert.plainObject().validate('FOO');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('PlainObject');
    }
  });

  it('should accept a plain object', () => {
    Assert.plainObject().validate({ foo: 'bar' });
  });
});
