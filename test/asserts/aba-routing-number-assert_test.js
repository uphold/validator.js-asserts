'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const AbaRoutingNumberAssert = require('../../src/asserts/aba-routing-number-assert');

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
  it('should throw an error if the input value is not a string', () => {
    [{}, []].forEach(choice => {
      try {
        Assert.abaRoutingNumber().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid ABA routing number', () => {
    try {
      Assert.abaRoutingNumber().validate('foobar');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().value).toBe('foobar');
    }
  });

  it('should expose `assert` equal to `AbaRoutingNumber`', () => {
    try {
      Assert.abaRoutingNumber().validate(123);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('AbaRoutingNumber');
    }
  });

  it('should accept a valid ABA routing number', () => {
    Assert.abaRoutingNumber().validate('123123123');
  });
});
