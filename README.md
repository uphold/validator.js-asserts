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
* BigNumberLess
* BigNumberLessThanOrEqualTo
* Boolean
* Date
* EqualKeys
* Hash
* Integer
* Ip
* Iso3166Country
* Json
* NotEmpty
* NullOrString
* PlainObject
* UsState
* Uuid

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
