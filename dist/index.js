'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Naming function (capitalized camel case).
 */

/**
 * Module dependencies.
 */

const name = (0, _lodash.flow)(_lodash.camelCase, string => string.replace('Assert', ''), string => `${ string.charAt(0).toUpperCase() }${ string.slice(1) }`);

/**
 * Prepare asserts to be exported.
 */

exports.default = (0, _lodash.transform)((0, _requireDir2.default)('./asserts'), (result, fn, key) => {
  result[name(key)] = fn;
});