
/**
* Module dependencies.
*/

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

/**
* Export `EmailAssert`.
*/

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Email';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    if (!_validator2['default'].isEmail(value)) {
      throw new _validatorJs.Violation(_this, value);
    }

    try {
      new _validatorJs.Assert().Length({ max: 254 }).validate(value);
    } catch (e) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];