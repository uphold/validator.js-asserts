
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

var _worldCountriesDataBesDivisions = require('world-countries/data/bes.divisions');

var _worldCountriesDataBesDivisions2 = _interopRequireDefault(_worldCountriesDataBesDivisions);

var _worldCountriesDataShnDivisions = require('world-countries/data/shn.divisions');

var _worldCountriesDataShnDivisions2 = _interopRequireDefault(_worldCountriesDataShnDivisions);

var _worldCountries = require('world-countries');

var _worldCountries2 = _interopRequireDefault(_worldCountries);

/**
 * Countries data source.
 */

var countries = _worldCountries2['default'].concat(_worldCountriesDataBesDivisions2['default'], _worldCountriesDataShnDivisions2['default']);

/**
 * Export `CountryAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Country';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    // Test by `alpha-3` code.
    var country = _lodash.find(countries, { cca3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = _lodash.find(countries, { cca2: value });
    }

    var name = value.toLocaleUpperCase();

    // Test by `name`.
    if (!country) {
      country = _lodash.find(countries, function (item) {
        return item.name.common.toLocaleUpperCase() === name || item.name.official.toLocaleUpperCase() === name || _lodash.find(item.altSpellings, function (altSpelling) {
          return altSpelling.toLocaleUpperCase() === name;
        });
      });
    }

    if (!country) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];