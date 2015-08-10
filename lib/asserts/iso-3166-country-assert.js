
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var countries = require('isoc');
var find = require('lodash/collection/find');

/**
 * Export `Iso3166CountryAssert`.
 */

module.exports = function() {

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

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    // Test by `alpha-3` code.
    var country = find(this.countries, { alpha3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = find(this.countries, { alpha2: value });
    }

    // Test by `name`.
    var name = value.toLocaleUpperCase();

    if (!country) {
      country = find(countries, function(country) {
        return country.name.short.toLocaleUpperCase() === name
          || country.name.uppercase.toLocaleUpperCase() === name
      });
    }

    // Country is invalid or not in a `ISO 3166-1` compatible format.
    if (!country) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
