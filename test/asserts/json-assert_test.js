'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const JsonAssert = require('../../src/asserts/json-assert');
const should = require('should');

/**
 * Extend `Assert` with `JsonAssert`.
 */

const Assert = BaseAssert.extend({
  Json: JsonAssert
});

/**
 * Test `JsonAssert`.
 */

describe('JsonAssert', () => {
  it('should throw an error if the input value is not valid JSON', () => {
    const choices = [[], '["foo":"bar"}'];

    choices.forEach(choice => {
      try {
        Assert.json().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Json`', () => {
    try {
      Assert.json().validate([]);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('JSON');
    }
  });

  it('should accept valid JSON strings', () => {
    ['"foo"', '10', '{"foo":"bar"}', 123, Boolean(true), Number(10)].forEach(choice => {
      Assert.json().validate(choice);
    });
  });
});
