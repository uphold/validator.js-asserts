'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NotEmptyAssert = require('../../src/asserts/not-empty-assert');

/**
 * Extend `Assert` with `NotEmptyAssert`.
 */

const Assert = BaseAssert.extend({
  NotEmpty: NotEmptyAssert
});

/**
 * Test `NotEmptyAssert`.
 */

describe('NotEmptyAssert', () => {
  it('should throw an error if the input value is empty', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.notEmpty().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `NotEmpty`', () => {
    try {
      Assert.notEmpty().validate({});

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('NotEmpty');
    }
  });

  it('should accept not empty values', () => {
    const choices = [['foo'], { foo: 'bar' }, 'foo'];

    choices.forEach(choice => {
      Assert.notEmpty().validate(choice);
    });
  });
});
