
/**
* Module dependencies.
*/

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

var _URIjs = require('URIjs');

var _URIjs2 = _interopRequireDefault(_URIjs);

/**
* Export `UriAssert`.
*/

exports['default'] = function (constraints) {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Uri';

  /**
   * Constraints.
   */

  this.constraints = constraints || {};

  /**
   * Validate constraints.
   */

  _lodash.forEach(this.constraints, function (constraint, key) {
    if (!_lodash.has(_URIjs2['default'].prototype, key)) {
      throw new Error('Invalid constraint "' + key + '=' + constraint + '"');
    }
  });

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    var uri = new _URIjs2['default'](value);

    // URIs must have at least a hostname and protocol.
    if (!uri.hostname() || !uri.protocol()) {
      throw new _validatorJs.Violation(_this, value, { constraints: _this.constraints });
    }

    // Validate that each constraint matches exactly.
    _lodash.forEach(_this.constraints, function (constraint, key) {
      if (constraint === uri[key]()) {
        return;
      }

      throw new _validatorJs.Violation(_this, value, { constraints: _this.constraints });
    }, _this);

    return true;
  };

  return this;
};

module.exports = exports['default'];