
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var countries = require('world-countries').concat(
  require('world-countries/data/bes.divisions'),
  require('world-countries/data/shn.divisions')
);
var find = require('lodash/collection/find');

/**
 * Export `CountryAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'Country';

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
    var country = find(countries, { cca3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = find(countries, { cca2: value });
    }

    var name = value.toLocaleUpperCase();

    // Test by `name`.
    if (!country) {
      country = find(countries, function(country) {
        return country.name.common.toLocaleUpperCase() === name
          || country.name.official.toLocaleUpperCase() === name
          || find(country.altSpellings, function(altSpelling) {
              return altSpelling.toLocaleUpperCase() === name;
          });
      });
    }

    if (!country) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
