/**
 * Type declarations for `validator.js-asserts`.
 *
 * Provides 41 additional assert factories for use with the `validator.js` library.
 * Each assert is a constructor function that configures `this.__class__` and
 * `this.validate()`, then returns `this`.
 *
 * @example Basic usage with `validator.js`:
 * ```ts
 * import { Assert } from 'validator.js';
 * import asserts from 'validator.js-asserts';
 *
 * const is = Assert.extend(asserts);
 * is.uuid('4').validate('550e8400-e29b-41d4-a716-446655440000'); // true
 * ```
 *
 * @example With `@uphold/validator.js`:
 * ```ts
 * import validator from '@uphold/validator.js';
 *
 * const { is, validate } = validator({ ValidationError });
 * validate(data, { id: is.uuid('4') });
 * ```
 *
 * @module validator.js-asserts
 */

/**
 * A simplified Violation object produced by `validator.js` when an assert's
 * `validate()` method throws.
 *
 * The full `Violation` class is defined in `validator.js`. This interface
 * represents the common shape relevant to assert consumers and is used as
 * the failure branch of `check()`.
 */
export interface DefaultViolation {
  /** Always `'Violation'` — runtime class identifier. */
  readonly __class__: 'Violation';
  /** The assert instance that produced this violation. */
  assert: DefaultAssertInstance;
  /** The value that failed validation. */
  value: unknown;
  /** Optional structured details about the failure (shape varies by assert). */
  violation?: Record<string, unknown>;
  /** Returns a plain-object summary: `{ assert, value, violation? }`. */
  show(): { assert: string; value: unknown; violation?: Record<string, unknown> };
}

/**
 * The instance-side of an Assert (no static factory methods).
 *
 * All assert factories produce objects with this shape. At runtime, every
 * assert has `__class__`, `__parentClass__`, and `groups` properties set
 * by the `validator.js` Assert base class.
 *
 * Use `CustomAssertThis<ClassName>` when authoring your own asserts —
 * it provides a writable `__class__` for the factory function body.
 */
export interface DefaultAssertInstance {
  /** The assert's class name (e.g., `'Uuid'`, `'Integer'`). Set by each assert factory. */
  readonly __class__: string;

  /** Always `'Assert'` — the parent class identifier. */
  readonly __parentClass__: 'Assert';

  /** Validation groups this assert belongs to. Empty array = responds to the `'Default'` group. */
  groups: string[];

  /**
   * Returns `true` if the value passes, or a `DefaultViolation` on failure.
   * Does not throw — catches the violation internally.
   */
  check(value: unknown, group?: string | string[], context?: unknown): true | DefaultViolation;

  /**
   * Validates the value. Returns `true` on success.
   * Throws a `Violation` on failure.
   */
  validate(value: unknown, group?: string | string[], context?: unknown): true;

  /**
   * Returns `true` if this assert should run for the given validation group(s).
   *
   * - If a group is specified and this assert is not in that group → `false`.
   * - If no group is specified and this assert has explicit groups → `false`.
   * - Otherwise → `true`.
   */
  requiresValidation(group?: string | string[]): boolean;

  /**
   * Checks whether this assert belongs to the given group.
   * All asserts respond to the `'Any'` group.
   * Asserts with no explicit groups respond to the `'Default'` group.
   */
  hasGroup(group: string | string[]): boolean;

  /** Returns `true` if this assert belongs to at least one of the provided groups. */
  hasOneOf(groups: string[]): boolean;

  /** Returns `true` if this assert has been assigned to one or more groups. */
  hasGroups(): boolean;
}

/**
 * Helper type for typing the `this` context inside a custom assert factory.
 *
 * Unlike `DefaultAssertInstance`, the `__class__` property is writable,
 * allowing assignment inside the factory function body.
 *
 * @template ClassName - The assert's `__class__` string (e.g., `'MyAssert'`).
 *
 * @example
 * ```ts
 * import type { CustomAssertThis } from 'validator.js-asserts';
 *
 * function MyAssert(this: CustomAssertThis<'MyAssert'>, threshold: number) {
 *   this.__class__ = 'MyAssert';
 *   this.validate = (value: unknown) => { return true; };
 *   return this;
 * }
 * ```
 */
export type CustomAssertThis<ClassName extends string = string> = Omit<DefaultAssertInstance, '__class__'> & {
  __class__: ClassName;
};

/**
 * Type for a raw assert constructor function as used in `Assert.extend()`.
 *
 * @template ClassName - The `__class__` string the assert sets.
 * @template Args - The constructor parameter types.
 *
 * @example
 * ```ts
 * import type { AssertFactory } from 'validator.js-asserts';
 *
 * const MyAssert: AssertFactory<'MyAssert', [threshold: number]> = function (threshold) {
 *   this.__class__ = 'MyAssert';
 *   this.validate = (value: unknown) => { return true; };
 *   return this;
 * };
 * ```
 */
export type AssertFactory<ClassName extends string = string, Args extends unknown[] = unknown[]> = (
  this: CustomAssertThis<ClassName>,
  ...args: Args
) => CustomAssertThis<ClassName>;

/**
 * All `validator.js-asserts` assert factories, exposed as camelCase methods.
 *
 * @template AssertInstance - The return type for all assert methods.
 *   Defaults to `DefaultAssertInstance`. When used with `@uphold/validator.js`,
 *   a richer `AssertInstance` (with typed `Violation`) is passed in.
 */
export interface ValidatorJSAsserts<AssertInstance = DefaultAssertInstance> {
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

  /** Run a custom callback function, passing a custom class name. */
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

export * from '../index';
