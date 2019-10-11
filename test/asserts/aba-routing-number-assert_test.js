
/**
 * Module dependencies.
 */

const AbaRoutingNumberAssert = require('../../src/asserts/aba-routing-number-assert');
const should = require('should');
const { Assert: BaseAssert, Violation } = require('validator.js');

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
        new Assert().AbaRoutingNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid ABA routing number', () => {
    try {
      new Assert().AbaRoutingNumber().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `AbaRoutingNumber`', () => {
    try {
      new Assert().AbaRoutingNumber().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('AbaRoutingNumber');
    }
  });

  it('should accept a valid ABA routing number', () => {
    new Assert().AbaRoutingNumber().validate('123123123');
  });
});
