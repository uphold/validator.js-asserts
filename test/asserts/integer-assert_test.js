'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const IntegerAssert = require('../../src/asserts/integer-assert');
const should = require('should');

/**
 * Extend `Assert` with `IntegerAssert`.
 */

const Assert = BaseAssert.extend({
  Integer: IntegerAssert
});

/**
 * Test `IntegerAssert`.
 */

describe('IntegerAssert', () => {
  it('should throw an error if the input value is not a number', () => {
    const choices = [{}, 'foo', '', [], 1.01, '2'];

    choices.forEach(choice => {
      try {
        Assert.integer().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Integer`', () => {
    try {
      Assert.integer().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Integer');
    }
  });

  it('should accept an integer', () => {
    Assert.integer().validate(1);
  });
});
