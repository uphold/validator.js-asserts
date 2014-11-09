
/**
 * Module dependencies.
 */

var BigNumber = require('bignumber.js');
var Violation = require('validator.js').Violation;

/**
 * Export `BigNumberAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'BigNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    try {
      new BigNumber(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
