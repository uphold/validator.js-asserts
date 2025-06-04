# validator.js-asserts

A set of extra asserts for [validator.js](https://github.com/guillaumepotier/validator.js).

## Status

[![npm version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]

## Installation

Install the package via `npm`:

```sh
npm install --save validator.js-asserts
```

### Peer dependencies

Some asserts require manually installing some _peer dependencies_. Failing to do so will result in runtime errors, as packages are required dynamically.

Peer dependencies are listed on `package.json` under `peerDependencies`.
The `peerDependenciesMeta` key identifies which peer dependencies are optional. NPM will not automatically install optional peer dependencies. See [the NPM documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#peerdependenciesmeta) for more information.

## Asserts

The following set of extra asserts are provided by this package:

| Assert                                                                          | Peer Dependency                                      |
| :------------------------------------------------------------------------------ | :--------------------------------------------------- |
| [AbaRoutingNumber](#abaroutingnumber)                                           | [`abavalidator`][abavalidator-url]                   |
| [BankIdentifierCode](#bankidentifiercode-bic) (_BIC_)                           |                                                      |
| [BigNumber](#bignumber)                                                         | [`bignumber.js`][bignumber-url]                      |
| [BigNumberEqualTo](#bignumberequalto)                                           | [`bignumber.js`][bignumber-url]                      |
| [BigNumberGreaterThan](#bignumbergreaterthan)                                   | [`bignumber.js`][bignumber-url]                      |
| [BigNumberGreaterThanOrEqualTo](#bignumbergreaterthanorequalto)                 | [`bignumber.js`][bignumber-url]                      |
| [BigNumberLessThan](#bignumberlessthan)                                         | [`bignumber.js`][bignumber-url]                      |
| [BigNumberLessThanOrEqualTo](#bignumberlessthanorequalto)                       | [`bignumber.js`][bignumber-url]                      |
| [Boolean](#boolean)                                                             |                                                      |
| [Callback](#callback)                                                           | [`callback`][callback-url]                           |
| [CaZipCode](#cazipcode)                                                         |                                                      |
| [CpfNumber](#cpfnumber)                                                         | [`cpf`][cpf-url]                                     |
| [CreditCard](#creditcard)                                                       | [`creditcard`][creditcard-url]                       |
| [CurpNumber](#curpnumber)                                                       | [`curp`][curp-url]                                   |
| [Date](#date)                                                                   | [`moment`][moment-url]                               |
| [DateDiffGreaterThan](#datediffgreaterthan)                                     | [`moment`][moment-url]                               |
| [DateDiffGreaterThanOrEqualTo](#datediffgreaterthanorequalto)                   | [`moment`][moment-url]                               |
| [DateDiffLessThan](#datedifflessthan)                                           | [`moment`][moment-url]                               |
| [DateDiffLessThanOrEqualTo](#datedifflessthanorequalto)                         | [`moment`][moment-url]                               |
| [Email](#email)                                                                 | [`validator`][validator-url]                         |
| [EqualKeys](#equalkeys)                                                         |                                                      |
| [Hash](#hash)                                                                   |                                                      |
| [Integer](#integer)                                                             |                                                      |
| [InternationalBankAccountNumber](#internationalbankaccountnumber-iban) (_IBAN_) | [`iban`][iban-url]                                   |
| [Ip](#ip)                                                                       |                                                      |
| [Iso3166Country](#iso3166country)                                               | [`isoc`][isoc-url]                                   |
| [Json](#json)                                                                   |                                                      |
| [NotEmpty](#notempty)                                                           |                                                      |
| [NullOr](#nullor)                                                               |                                                      |
| [NullOrDate](#nullordate)                                                       |                                                      |
| [NullOrBoolean](#nullorboolean)                                                 |                                                      |
| [NullOrString](#nullorstring)                                                   |                                                      |
| [Phone](#phone)                                                                 | [`google-libphonenumber`][google-libphonenumber-url] |
| [PlainObject](#plainobject)                                                     |                                                      |
| [RfcNumber](#rfcnumber)                                                         | [`validate-rfc`][validate-rfc-url]                   |
| [TaxpayerIdentificationNumber](#taxpayeridentificationnumber) (_TIN_)           | [`tin-validator`][tin-validator-url]                 |
| [UkModulusChecking](#ukmoduluschecking)                                         | [`uk-modulus-checking`][uk-modulus-checking-url]     |
| [Uri](#uri)                                                                     | [`urijs`][urijs-url]                                 |
| [UsSubdivision](#ussubdivision)                                                 |                                                      |
| [UsZipCode](#uszipcode)                                                         |                                                      |
| [Uuid](#uuid)                                                                   |                                                      |

### AbaRoutingNumber

Tests if the value is a valid [ABA Routing Number](http://www.accuity.com/PageFiles/255/ROUTING_NUMBER_POLICY.pdf).

### BankIdentifierCode (_BIC_)

Tests if the value is a valid Bank Identifier Code (_BIC_) as defined in the [ISO-9362](http://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=60390) standard.

### BigNumber

Tests if the value is a valid `BigNumber`.

### BigNumberEqualTo

Tests if a `BigNumber` is equal to a given value.

#### Arguments

- `value` (required)

### BigNumberGreaterThan

Tests if a `BigNumber` is greater than a given threshold.

#### Arguments

- `threshold` (required)

### BigNumberGreaterThanOrEqualTo

Tests if a `BigNumber` is greater than or equal to a given threshold.

#### Arguments

- `threshold` (required)

### BigNumberLessThan

Tests if a `BigNumber` is less than a given threshold.

#### Arguments

- `threshold` (required)

### BigNumberLessThanOrEqualTo

Tests if a `BigNumber` is less than or equal to a given threshold.

#### Arguments

- `threshold` (required)

### Boolean

Tests if the value is a boolean.

### Callback

Allows you to add custom rules by giving a callback function and a custom class.

#### Arguments

- `callback` (required) - the callback function.
- `customClass` (required) - the name of the class.

### CaZipCode

Tests if the value is a valid Canada zip code (postal code).
We only allow initial characters from the list on the [site](https://www.canadapost-postescanada.ca/cpc/en/support/articles/addressing-guidelines/postal-codes.page).

### CpfNumber

Tests if the value is a valid Brazilian CPF (Cadastro de Pessoas Físicas) number.

### CreditCard

Tests if the value is a valid credit card number using the Luhn10 algorithm.

### CurpNumber

Tests if the value is a valid Mexican CURP (Clave Única de Registro de Población) number.

### Date

Tests if the value is a valid date.

#### Arguments

- `format` (optional) - the format in which the date must be in.

### DateDiffGreaterThan

Tests if the difference between two dates is greater than a given threshold.

#### Arguments

- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffGreaterThanOrEqualTo

Tests if the difference between two dates is greater than or equal to a given threshold.

#### Arguments

- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffLessThan

Tests if the difference between two dates is less than a given threshold.

#### Arguments

- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffLessThanOrEqualTo

Tests if the difference between two dates is less than or equal to a given threshold.

#### Arguments

- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### Email

Tests if the value is a valid email.

### EqualKeys

Tests if the object has the exact given set of keys (missing or extra keys are not allowed).

#### Arguments

- `keys` (optional) - the keys that the object being tested must equal. If none are defined, no keys will be allowed.

### Hash

Tests if the value is a valid hash.

#### Arguments

- `algorithm` (required) - the algorithm to test the hash for. Supported algorithms are `sha1`, `sha256` and `sha512`.

### Integer

Tests if the value is an integer.

### InternationalBankAccountNumber (_IBAN_)

Tests if the value is a valid International Bank Account Number (_IBAN_) as defined in the [13616-1](http://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=41031) standard.

### Ip

Tests if the value is a valid `IP` (v4 or v6).

### Iso3166Country

Tests if the value is a valid ISO-3166 country by alpha-3 code, alpha-2 code, short name or uppercase name. All officially-assigned, transitionally-assigned and user-assigned codes are considered valid.

### Json

Tests if the value is valid `JSON`.

### NotEmpty

Tests if the value is not an empty (empty object, empty array, empty string, etc).

### NullOr

Tests if the value is a `null` or validates against the assert received as an argument.

### NullOrBoolean

Tests if the value is a `null` or `boolean`.

### NullOrString

Tests if the value is a `null` or `string`, optionally within some boundaries.

#### Arguments

- `boundaries` (optional) - `max` and/or `min` boundaries to test the string for.

### Phone

Tests if the phone is valid and optionally if it belongs to the given country. The phone can be in the national or E164 formats.

#### Arguments

- `countryCode` (optional) - the ISO-3166 alpha-2 country code to test the phone validity in.

### PlainObject

Tests if the value is a plain object.

### RfcNumber

Tests if the value is a valid Mexican `RFC` (Registro Federal de Contribuyentes) number.

### TaxpayerIdentificationNumber

Tests if the value is a valid Taxpayer Identification Number `TIN` as defined by the [U.S. IRS](http://www.irs.gov/Individuals/International-Taxpayers/Taxpayer-Identification-Numbers-TIN).

### UkModulusChecking

Tests if the given `accountNumber` and `sortCode` represent a valid `Faster Payment Account`.

### Uri

Tests if the value is a valid `URI` (Uniform Resource Identifier) which must contain at least a protocol and a hostname.

#### Arguments

- `constraints` (optional) - additional `URI` parts to test for (e.g. `{ is: 'domain', protocol: 'https' }`).

### UsSubdivision

Tests if the value is a valid US subdivision or not. By default, codes in the short ("alpha2", e.g. `CA`) or full form (e.g. `US-CA`) are allowed. All US subdivisions categories are supported: `districts` (1), `states` (50) and `outlying` territories (6).

#### Arguments

- `alpha2Only` (optional) - whether to restrict validation to the "alpha2" short code form only.
- `categories` (optional) - a list of categories to restrict code validation to (e.g. `['states', 'outlying']`).

### UsZipCode

Tests if the value is a valid US zip code.

### UUID

Tests if the value is a valid `UUID`.

#### Arguments

- `version` (optional) - the version to test the `UUID` for. Supported versions are `3`, `4`, `5`, `7`, `max`, and `nil`. Defaults to test for `all` if omitted.

## Usage

The following is an example for the extra IP assert:

```js
const Validator = require('validator.js').Validator;
const is = require('validator.js').Assert.extend(require('validator.js-asserts'));
const validator = new Validator();

// Validate IP `1.3.3.7`.
let violation = validator.validate('1.3.3.7', is.ip());

if (true === violation) {
  console.log('"1.3.3.7" is a valid IP'); // => "1.3.3.7" is a valid IP
}

// Validate IP `foo`.
violation = validator.validate('foo', is.ip());

if (true !== violation) {
  console.log('"foo" is not a valid IP. Violation:', violation[0].show());
  // => "foo" is not a valid IP. Violation: { assert: 'Ip', value: 'foo' }
}

// Make the validation nullable.
violation = validator.validate(null, is.nullOr(is.ip()));

if (true === violation) {
  console.log('null is null or a valid IP'); // => null is null or a valid IP
}
```

## Tests

```sh
npm test
```

## Release process

The release of a version is automated via the [release](https://github.com/uphold/validator.js-asserts/actions/workflows/release.yaml) GitHub workflow. Run it by clicking the "Run workflow" button.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/validator.js-asserts.svg?style=flat-square
[npm-url]: https://npmjs.org/package/validator.js-asserts
[ci-image]: https://github.com/uphold/validator.js-asserts/actions/workflows/ci.yaml/badge.svg?branch=master
[ci-url]: https://github.com/uphold/validator.js-asserts/actions/workflows/ci.yaml
[abavalidator-url]: https://www.npmjs.com/package/abavalidator
[bignumber-url]: https://www.npmjs.com/package/bignumber.js
[callback-url]: https://www.npmjs.com/package/callback
[cpf-url]: https://www.npmjs.com/package/cpf
[creditcard-url]: https://www.npmjs.com/package/creditcard
[curp-url]: https://www.npmjs.com/package/curp
[google-libphonenumber-url]: https://www.npmjs.com/package/google-libphonenumber
[iban-url]: https://www.npmjs.com/package/iban
[isoc-url]: https://www.npmjs.com/package/isoc
[moment-url]: https://www.npmjs.com/package/moment
[tin-validator-url]: https://www.npmjs.com/package/tin-validator
[uk-modulus-checking-url]: https://www.npmjs.com/package/uk-modulus-checking
[urijs-url]: https://www.npmjs.com/package/urijs
[validate-rfc-url]: https://www.npmjs.com/package/validate-rfc
[validator-url]: https://www.npmjs.com/package/validator
