
/**
 * Module dependencies.
 */

import JsonAssert from '../../src/asserts/json-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

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
        new Assert().Json().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Json`', () => {
    try {
      new Assert().Json().validate([]);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('JSON');
    }
  });

  it('should accept valid JSON strings', () => {
    [
      '"foo"',
      '10',
      '{"foo":"bar"}',
      123,
      Boolean(true),
      Number(10)
    ].forEach(choice => {
      new Assert().Json().validate(choice);
    });
  });
});
