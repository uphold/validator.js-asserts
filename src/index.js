
/**
 * Module dependencies.
 */

import { capitalize, camelCase, transform, flowRight } from 'lodash';
import requireDir from 'require-dir';

/**
 * Prepare asserts to be exported.
 */

const asserts = transform(requireDir('./asserts'), (result, fn, key) => {
  result[flowRight(capitalize, camelCase)(key).replace('Assert', '')] = fn;
});

export default asserts;
