
/**
 * Module dependencies.
 */

import { camelCase, flow, transform } from 'lodash';
import requireDir from 'require-dir';

/**
 * Naming function (capitalized camel case).
 */

const name = flow(
  camelCase,
  (string) => string.replace('Assert', ''),
  (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
);

/**
 * Prepare asserts to be exported.
 */

export default transform(requireDir('./asserts'), (result, fn, key) => {
  result[name(key)] = fn;
});
