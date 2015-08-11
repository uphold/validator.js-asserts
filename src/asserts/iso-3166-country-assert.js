
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';
import { find } from 'lodash';
import countries from 'isoc';

/**
 * Export `Iso3166CountryAssert`.
 */

export default function() {

  /**
   * Class name.
   */

  this.__class__ = 'Iso3166Country';

  /**
   * Data source.
   */

  this.countries = countries;

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    // Test by `alpha-3` code.
    let country = find(this.countries, { alpha3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = find(this.countries, { alpha2: value });
    }

    // Test by `name`.
    const name = value.toLocaleUpperCase();

    if (!country) {
      country = find(countries, (item) => {
        return item.name.short.toLocaleUpperCase() === name ||
          item.name.uppercase.toLocaleUpperCase() === name;
      });
    }

    // Country is invalid or not in a `ISO 3166-1` compatible format.
    if (!country) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
