'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const PlainObjectTSAssert = require('../../src/asserts/plain-object-ts-assert');

/**
 * Extend `Assert` with `PlainObjectTSAssert`.
 */

const Assert = BaseAssert.extend({
  PlainObjectTS: PlainObjectTSAssert
});

/**
 * Test `PlainObjectTSAssert`.
 */

describe('PlainObjectTSAssert', () => {
  it(`should throw an error if the input value's prototype is not a plain object`, () => {
    const choices = ['foobar', 123];

    choices.forEach(choice => {
      try {
        Assert.plainObjectTS().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `plainObjectTS`', () => {
    try {
      Assert.plainObjectTS().validate('FOO');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('PlainObjectTS');
    }
  });

  it('should accept an object', () => {
    const foo = Object.create(Object.prototype);

    Assert.plainObjectTS().validate(foo);
  });
});
