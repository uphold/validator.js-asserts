
/**
 * Module dependencies.
 */

import EmailAssert from '../../src/asserts/email-assert';
import should from 'should';
import { Assert as BaseAssert, Validator, Violation } from 'validator.js';

/**
 * Extend `Assert` with `EmailAssert`.
 */

const Assert = BaseAssert.extend({
  Email: EmailAssert
});

/**
 * Test `EmailAssert`.
 */

describe('EmailAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().Email().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if email is a string but is out of boundaries', () => {
    try {
      new Assert().Email().validate(`${'-'.repeat(247)}@bar.com`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `Email`', () => {
    try {
      new Assert().Email().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Email');
    }
  });

  it('should accept valid emails', () => {
    [
      'foo@bar.com',
      'føø@båz.com',
      'foo+bar@baz.com'
    ].forEach(choice => {
      new Assert().Email().validate(choice);
    });
  });
});
