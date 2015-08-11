
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';
import { find } from 'lodash';
import besDivisions from 'world-countries/data/bes.divisions';
import shnDivisions from 'world-countries/data/shn.divisions';
import worldCountries from 'world-countries';

/**
 * Countries data source.
 */

const countries = worldCountries.concat(besDivisions, shnDivisions);

/**
 * Export `CountryAssert`.
 */

export default function() {

  /**
   * Class name.
   */

  this.__class__ = 'Country';

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    // Test by `alpha-3` code.
    let country = find(countries, { cca3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = find(countries, { cca2: value });
    }

    const name = value.toLocaleUpperCase();

    // Test by `name`.
    if (!country) {
      country = find(countries, (item) => {
        return item.name.common.toLocaleUpperCase() === name ||
          item.name.official.toLocaleUpperCase() === name ||
          find(item.altSpellings, (altSpelling) => altSpelling.toLocaleUpperCase() === name);
      });
    }

    if (!country) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
