/**
 * The instance‐side of an Assert (no static factory methods).
 * All core “is.X()” methods and custom asserts produce this.
 */
interface AssertInstance {
  /** Returns `true` if the value passes, otherwise returns a Violation/object. */
  check(value: unknown, group?: string | string[], context?: unknown): true | any;
  /** Throws on failure; returns `true` if the value passes. */
  validate(value: unknown, group?: string | string[], context?: unknown): true;
  /** Does this assert apply to the given validation group(s)? */
  requiresValidation(group?: string | string[]): boolean;
  /** Is this assert assigned to the given group? */
  hasGroup(group: string | string[]): boolean;
  /** Is this assert in any of the provided groups? */
  hasOneOf(groups: string[]): boolean;
  /** Does this assert belong to at least one group? */
  hasGroups(): boolean;
}

/**
 * Core `validator.js-asserts` methods (lower-cased).
 */
export interface ValidatorJSAsserts {
  /**
   * Valid ABA (American Bankers Association) Routing Number used in ACH payments.
   * @requires abavalidator
   */
  abaRoutingNumber(): AssertInstance;

  /** Valid BIC (Bank Identifier Code) used for international wire transfers. */
  bankIdentifierCode(): AssertInstance;

  /** Valid `BigNumber`. @requires bignumber.js */
  bigNumber(options?: { validateSignificantDigits?: boolean }): AssertInstance;

  /** `BigNumber` equal to the given value. @requires bignumber.js */
  bigNumberEqualTo(value: string | number, options?: { validateSignificantDigits?: boolean }): AssertInstance;

  /** `BigNumber` > threshold. @requires bignumber.js */
  bigNumberGreaterThan(threshold: string | number, options?: { validateSignificantDigits?: boolean }): AssertInstance;

  /** `BigNumber` ≥ threshold. @requires bignumber.js */
  bigNumberGreaterThanOrEqualTo(
    threshold: string | number,
    options?: { validateSignificantDigits?: boolean }
  ): AssertInstance;

  /** `BigNumber` < threshold. @requires bignumber.js */
  bigNumberLessThan(threshold: string | number, options?: { validateSignificantDigits?: boolean }): AssertInstance;

  /** `BigNumber` ≤ threshold. @requires bignumber.js */
  bigNumberLessThanOrEqualTo(
    threshold: string | number,
    options?: { validateSignificantDigits?: boolean }
  ): AssertInstance;

  /** Value is a boolean. */
  boolean(): AssertInstance;

  /** Valid Canadian ZIP code (postal code). */
  caZipCode(): AssertInstance;

  /**
   * Run a custom callback function, passing a custom class name.
   * @param fn - Callback function that receives the value to validate, which should return `true` if valid.
   * @param customClass - Custom class name to use for the assert. Must match the pattern `/^[a-zA-Z\d]+$/`.
   * @example
   * ```js
   * is.callback(
   *   (value) => typeof value === 'string' && value.length > 0,
   *   'NonEmptyString'
   * );
   * ```
   */
  callback(fn: (value: unknown) => boolean, customClass: string): AssertInstance;

  /** Valid Brazilian CPF number. @requires cpf */
  cpfNumber(): AssertInstance;

  /** Valid credit card number. @requires creditcard */
  creditCard(): AssertInstance;

  /**
   * Valid Mexican CURP number.
   * @requires curp
   */
  curpNumber(): AssertInstance;

  /**
   * Valid `moment` date, (optionally with format).
   * - If `moment` is not available, returns `true` by default.
   * @requires moment
   */
  date(options?: { format?: string }): AssertInstance;

  /** Date difference > threshold. @requires moment */
  dateDiffGreaterThan(
    threshold: number,
    options?: {
      absolute?: boolean;
      asFloat?: boolean;
      fromDate?: Date | string | null;
      unit?: string;
    }
  ): AssertInstance;

  /** Date difference ≥ threshold. @requires moment */
  dateDiffGreaterThanOrEqualTo(
    threshold: number,
    options?: {
      absolute?: boolean;
      asFloat?: boolean;
      fromDate?: Date | string | null;
      unit?: string;
    }
  ): AssertInstance;

  /** Date difference < threshold. @requires moment */
  dateDiffLessThan(
    threshold: number,
    options?: {
      absolute?: boolean;
      asFloat?: boolean;
      fromDate?: Date | string | null;
      unit?: string;
    }
  ): AssertInstance;

  /** Date difference ≤ threshold. @requires moment */
  dateDiffLessThanOrEqualTo(
    threshold: number,
    options?: {
      absolute?: boolean;
      asFloat?: boolean;
      fromDate?: Date | string | null;
      unit?: string;
    }
  ): AssertInstance;

  /**
   * Extends base email address assert.
   * - Max length is 254 characters.
   * - Returns `true` if email ends in `.deleted`.
   * @requires validator
   */
  email(): AssertInstance;

  /** Object has exactly the specified keys. */
  equalKeys(...keys: string[] | [string[]]): AssertInstance;

  /** Validate a hash string using a specific algorithm. */
  hash(algorithm: 'sha1' | 'sha256' | 'sha512'): AssertInstance;

  /** Valid integer. */
  integer(): AssertInstance;

  /** Valid IBAN (International Bank Account Number). @requires iban */
  internationalBankAccountNumber(): AssertInstance;

  /** Value is an IP address. */
  ip(): AssertInstance;

  /** Valid ISO 3166 country code. @requires isoc */
  iso3166Country(): AssertInstance;

  /** Value is a JSON string. */
  json(): AssertInstance;

  /** Value is not empty. */
  notEmpty(): AssertInstance;

  /** Value is null or passes the provided assert. */
  nullOr(assert: AssertInstance): AssertInstance;

  /** Value is null or a boolean. */
  nullOrBoolean(): AssertInstance;

  /** Value is null or a date. */
  nullOrDate(): AssertInstance;

  /** Value is null or a string (length within `[min, max]`). */
  nullOrString(boundaries?: { min?: number; max?: number }): AssertInstance;

  /** Valid phone number (optionally by country code). @requires google-libphonenumber */
  phone(options?: { countryCode?: string }): AssertInstance;

  /** Value is a plain object. */
  plainObject(): AssertInstance;

  /** Valid Mexican RFC number. @requires validate-rfc */
  rfcNumber(): AssertInstance;

  /** Valid TIN (Taxpayer Identification Number). @requires tin-validator */
  taxpayerIdentificationNumber(): AssertInstance;

  /** Valid UK bank account with modulus checking. @requires uk-modulus-checking */
  ukModulusChecking(): AssertInstance;

  /** Valid `URI`. @requires uri-js */
  uri(constraints?: Record<string, any>): AssertInstance;

  /** Valid US subdivision code (state). */
  usSubdivision(options?: { categories?: string[]; alpha2Only?: boolean }): AssertInstance;

  /** Valid US ZIP code. */
  usZipCode(): AssertInstance;

  /**
   * Valid `UUID`.
   * @param [version] - UUID version `3`, `4`, `5`, `7`, `max` or `nil`. Defaults to `all` if omitted.
   */
  uuid(version?: '3' | '4' | '5' | '7' | 'max' | 'nil'): AssertInstance;
}
