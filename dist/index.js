
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

/**
 * Prepare asserts to be exported.
 */

var asserts = _lodash.transform(_requireDir2['default']('./asserts'), function (result, fn, key) {
  result[_lodash.flowRight(_lodash.capitalize, _lodash.camelCase)(key).replace('Assert', '')] = fn;
});

exports['default'] = asserts;
module.exports = exports['default'];