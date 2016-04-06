'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iso3166CountryAssert;

var _lodash = require('lodash');

var _validator = require('validator.js');

/**
 * Export `Iso3166CountryAssert`.
 */

/**
 * Module dependencies.
 */

function iso3166CountryAssert() {
  /**
   * Optional peer dependencies.
   */

  const countries = require('isoc');

  /**
   * Class name.
   */

  this.__class__ = 'Iso3166Country';

  /**
   * Data source.
   */

  this.countries = countries;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    // Test by `alpha-3` code.
    let country = (0, _lodash.find)(this.countries, { alpha3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = (0, _lodash.find)(this.countries, { alpha2: value });
    }

    // Test by `name`.
    const name = value.toLocaleUpperCase();

    if (!country) {
      country = (0, _lodash.find)(countries, item => {
        return item.name.short.toLocaleUpperCase() === name || item.name.uppercase.toLocaleUpperCase() === name;
      });
    }

    // Country is invalid or not in a `ISO 3166-1` compatible format.
    if (!country) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];