'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const AbaRoutingNumberAssert = require('../../src/asserts/aba-routing-number-assert');
const should = require('should');

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

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid ABA routing number', () => {
    try {
      Assert.abaRoutingNumber().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `AbaRoutingNumber`', () => {
    try {
      Assert.abaRoutingNumber().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('AbaRoutingNumber');
    }
  });

  it('should accept a valid ABA routing number', () => {
    Assert.abaRoutingNumber().validate('123123123');
  });
});
