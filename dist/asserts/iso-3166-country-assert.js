
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

var _isoc = require('isoc');

var _isoc2 = _interopRequireDefault(_isoc);

/**
 * Export `Iso3166CountryAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Iso3166Country';

  /**
   * Data source.
   */

  this.countries = _isoc2['default'];

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    // Test by `alpha-3` code.
    var country = _lodash.find(_this.countries, { alpha3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = _lodash.find(_this.countries, { alpha2: value });
    }

    // Test by `name`.
    var name = value.toLocaleUpperCase();

    if (!country) {
      country = _lodash.find(_isoc2['default'], function (item) {
        return item.name.short.toLocaleUpperCase() === name || item.name.uppercase.toLocaleUpperCase() === name;
      });
    }

    // Country is invalid or not in a `ISO 3166-1` compatible format.
    if (!country) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];