
/**
 * Module dependencies.
 */

var BigNumber = require('bignumber.js');
var Violation = require('validator.js').Violation;

/**
 * Export `BigNumberLessThanOrEqualToAssert`.
 */

module.exports = function(threshold) {

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberLessThanOrEqualTo';

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

      if (!number.lessThanOrEqualTo(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      var data = { threshold: this.threshold.toString() };

      if ('BigNumber Error' === e.name) {
        data.message = e.message;
      }

      throw new Violation(this, value, data);
    }

    return true;
  };

  return this;
};
