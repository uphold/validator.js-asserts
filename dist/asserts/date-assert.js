'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateAssert;

var _validator = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `DateAssert`.
 */

/**
 * Module dependencies.
 */

function dateAssert() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  let format = _ref.format;

  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Optional peer dependency.
   */

  let moment;

  /**
   * Validate format.
   */

  if (format) {
    moment = require('moment');
  }

  /**
   * Format to match the input.
   */

  this.format = format;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validator.Violation(this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new _validator.Violation(this, value);
    }

    if (!this.format) {
      return true;
    }

    if (!moment(value, this.format, true).isValid()) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];