
/**
 * Module dependencies.
 */

var BigNumber = require('bignumber.js');
var Violation = require('validator.js').Violation;

/**
 * Export `BigNumberGreaterThanAssert`.
 */

module.exports = function(threshold) {

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThan';

  if ('undefined' === typeof threshold) {
    throw new Error('A threshold value is required.');
  }

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    try {
      var number = new BigNumber(value);

      if (!number.greaterThan(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      var context = { threshold: this.threshold.toString() };

      if ('BigNumber Error' === e.name) {
        context.message = e.message;
      }

      throw new Violation(this, value, context);
    }

    return true;
  };

  return this;
};
