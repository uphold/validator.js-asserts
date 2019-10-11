'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const PlainObjectAssert = require('../../src/asserts/plain-object-assert');
const should = require('should');

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

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `PlainObject`', () => {
    try {
      Assert.plainObject().validate('FOO');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('PlainObject');
    }
  });

  it('should accept a plain object', () => {
    Assert.plainObject().validate({ foo: 'bar' });
  });
});
