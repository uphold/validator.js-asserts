# validator.js-asserts

A set of extra asserts for [validator.js](https://github.com/guillaumepotier/validator.js).

## Status

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

## Installation

Install the package via `npm`:

```
$ npm install --save validator.js-asserts
```

## Asserts

The following set of extra asserts are provided by this package:

* BigNumber
* BigNumberGreaterThan
* BigNumberGreaterThanOrEqualTo
* BigNumberLessThan
* BigNumberLessThanOrEqualTo
* Boolean
* Date
* DateDiffGreaterThan
* DateDiffLessThan
* Email
* EqualKeys
* Hash
* Integer
* Ip
* Iso3166Country
* Json
* NotEmpty
* NotEqualTo
* NullOrString
* PlainObject
* UsState
* Uuid

### Boolean

Tests if the value is a boolean.

### BigNumber

Tests if the value is a valid `BigNumber`.

### BigNumberGreaterThan

Tests if a `BigNumber` is greater than a given threshold.

* `threshold` (required)

### BigNumberGreaterThanOrEqualTo

Tests if a `BigNumber` is greater than or equal to a given threshold.

* `threshold` (required)

### BigNumberLessThan

Tests if a `BigNumber` is less than a given threshold.

* `threshold` (required)

### BigNumberLessThanOrEqualTo

Tests if a `BigNumber` is less than or equal to a given threshold.

* `threshold` (required)

### Date

Tests if the value is a valid date.

### DateDiffGreaterThan

Tests if the difference between two dates is greater than a given threshold.

* `threshold` (required)
* `options`
	* `absolute` - whether the comparison should use the absolute value of the measured difference.
	* `asFloat` - whether to return the difference rounded down or as float.
	* `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
	* `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffLessThan

Tests if the difference between two dates is less than a given threshold.

* `threshold` (required)
* `options`
	* `absolute` - whether the comparison should use the absolute value of the measured difference.
	* `asFloat` - whether to return the difference rounded down or as float.
	* `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
	* `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### Email

Tests if the value is a valid email.

### EqualKeys

Tests if the object has the exact given set of keys.

* `keys` (required) - the keys that the object being tested must equal.

### Hash

Tests if the value is a valid hash.

* `algorithm` (required) - the algorithm to test the hash for. Supported algorithms are `sha1`, `sha256` and `sha512`.

### Integer

Tests if the value is an integer.

### Ip

Tests if the value is a valid ip (v4 or v6).

### Iso3166Country

Tests if the value is a valid ISO-3166 country by alpha-3 code, alpha-2 code or name.

### Json

Tests if the value is valid json.

### NotEmpty

Tests if the value is not an empty (empty object, empty array, empty string, etc).

### NotEqualTo

Tests if the value is not equal to the given reference.

* `reference` (required)

### NullOrString

Tests if the value is a `null` or `string`, optionally within some boundaries.

* `boundaries` (optional) - `max` and/or `min` boundaries to test the string for.

### PlainObject

Tests if the value is a plain object.

### UsState

Tests if the value is a valid US state short code (e.g. `CA`).

### Uuid

Tests if the value is a valid uuid.

* `version` (optional) - the version to test the uuid for. Supported version are `3`, `4` and `5`. Defaults to test for all three if omitted.

## Usage

The following is an example for the extra ip assert:

```js
require('validator.js-asserts');

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var validator = new Validator();

var violation = validator.validate('1.3.3.7', new Assert().Ip());

if (true === violation) {
  console.log('"1.3.3.7" is a valid IP');
}

violation = validator.validate('foo', new Assert().Ip());

if (true !== violation) {
  console.log('"foo" is not a valid IP. Violation:', violation[0].show());
}

// "1.3.3.7" is a valid IP
// "foo" is not a valid IP. Violation: { assert: 'Ip', value: 'foo' }
```

## Tests

```
$ npm test
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/validator.js-asserts.svg?style=flat-square
[npm-url]: https://npmjs.org/package/validator.js-asserts
[travis-image]: https://img.shields.io/travis/seegno/validator.js-asserts.svg?style=flat-square
[travis-url]: https://travis-ci.org/seegno/validator.js-asserts
