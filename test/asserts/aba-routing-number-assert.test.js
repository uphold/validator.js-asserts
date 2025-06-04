'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const AbaRoutingNumberAssert = require('../../src/asserts/aba-routing-number-assert.js');

/**
 * Extend `Assert` with `AbaRoutingNumberAssert`.
 */

const Assert = BaseAssert.extend({
  AbaRoutingNumber: AbaRoutingNumberAssert
});

/**
 * Test `RoutingNumberAssert`.
 */

describe('AbaRoutingNumberAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    [{}, []].forEach(choice => {
      try {
        Assert.abaRoutingNumber().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid ABA routing number', ({ assert }) => {
    try {
      Assert.abaRoutingNumber().validate('foobar');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().value, 'foobar');
    }
  });

  it('should expose `assert` equal to `AbaRoutingNumber`', ({ assert }) => {
    try {
      Assert.abaRoutingNumber().validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'AbaRoutingNumber');
    }
  });

  it('should accept a valid ABA routing number', () => {
    Assert.abaRoutingNumber().validate('123123123');
  });
});
