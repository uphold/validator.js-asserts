
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var countries = require('world-countries').concat(
  require('world-countries/data/bes.divisions'),
  require('world-countries/data/shn.divisions')
);

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
    var country = _.find(countries, { cca3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = _.find(countries, { cca2: value });
    }

    var name = value.toLocaleUpperCase();

    // Test by `name`.
    if (!country) {
      country = _.find(countries, function(country) {
        return country.name.common.toLocaleUpperCase() === name
          || country.name.official.toLocaleUpperCase() === name
          || _.find(country.altSpellings, function(altSpelling) {
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
