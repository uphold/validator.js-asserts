
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var countries = require('iso-3166-1-data');

/**
 * Export `Iso3166CountryAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'Iso3166Country';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    // Test by alpha-3 code.
    var country = _.find(countries, { alpha3: value });

    // Test by alpha-2 code if a country was not found.
    if (!country) {
      country = _.find(countries, { alpha2: value });
    }

    // Test by full country name if a country was not found.
    if (!country) {
      country = _.find(countries, function(country) {
        return country.name.toLowerCase() === value.toLowerCase();
      });
    }

    // Country is invalid or not in a ISO 3166-1 compatible format.
    if (!country) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
