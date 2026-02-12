'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const OneOfAssert = require('../../src/asserts/one-of-assert.js');

/**
 * Extend `Assert` with `OneOfAssert`.
 */

const Assert = BaseAssert.extend({
  OneOf: OneOfAssert
});

/**
 * Test `OneOfAssert`.
 */

describe('OneOfAssert', () => {
  it('should throw an error if no constraint sets are provided', ({ assert }) => {
    try {
      Assert.oneOf();

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'OneOf constraint requires at least two constraint sets');
    }
  });

  it('should throw an error if only one constraint set is provided', ({ assert }) => {
    try {
      Assert.oneOf({ bar: [Assert.equalTo('foo')] });

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'OneOf constraint requires at least two constraint sets');
    }
  });

  it('should throw an error if value does not match any constraint set', ({ assert }) => {
    try {
      Assert.oneOf({ bar: [Assert.equalTo('foo')] }, { bar: [Assert.equalTo('baz')] }).validate({ bar: 'biz' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
    }
  });

  it('should include all violations in the error when no constraint set matches', ({ assert }) => {
    try {
      Assert.oneOf({ bar: [Assert.equalTo('biz')] }, { bar: [Assert.equalTo('baz')] }).validate({ bar: 'qux' });

      assert.fail();
    } catch (e) {
      const { violation } = e.show();

      assert.equal(violation.length, 2);
      assert.ok(violation[0].bar[0] instanceof Violation);
      assert.equal(violation[0].bar[0].show().assert, 'EqualTo');
      assert.equal(violation[0].bar[0].show().violation.value, 'biz');
      assert.ok(violation[1].bar[0] instanceof Violation);
      assert.equal(violation[1].bar[0].show().assert, 'EqualTo');
      assert.equal(violation[1].bar[0].show().violation.value, 'baz');
    }
  });

  it('should validate required fields using `deepRequired`', ({ assert }) => {
    try {
      Assert.oneOf(
        { bar: [Assert.required(), Assert.notBlank()] },
        { baz: [Assert.required(), Assert.notBlank()] }
      ).validate({});

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
    }
  });

  it('should throw an error if a constraint set with an extra assert does not match', ({ assert }) => {
    try {
      Assert.oneOf(
        {
          bar: [Assert.equalTo('biz')],
          baz: [Assert.oneOf({ qux: [Assert.equalTo('corge')] }, { qux: [Assert.equalTo('grault')] })]
        },
        { bar: [Assert.equalTo('baz')] }
      ).validate({ bar: 'biz', baz: { qux: 'wrong' } });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
    }
  });

  it('should throw an error if value does not match any assert instance constraint set', ({ assert }) => {
    try {
      Assert.oneOf(Assert.ofLength({ max: 1 }), Assert.ofLength({ min: 5 })).validate('foo');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
    }
  });

  it('should throw an error if value matches more than one assert instance constraint set', ({ assert }) => {
    try {
      Assert.oneOf(Assert.ofLength({ max: 5 }), Assert.ofLength({ min: 2 })).validate('foo');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
      assert.deepStrictEqual(e.show().violation, { matches: 2 });
    }
  });

  it('should throw an error if value does not match any assert array constraint set', ({ assert }) => {
    try {
      Assert.oneOf([Assert.equalTo('foo')], [Assert.equalTo('bar')]).validate('baz');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
    }
  });

  it('should throw an error if value matches more than one assert array constraint set', ({ assert }) => {
    try {
      Assert.oneOf(
        [Assert.notBlank(), Assert.ofLength({ min: 1 })],
        [Assert.notBlank(), Assert.ofLength({ max: 5 })]
      ).validate('foo');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
      assert.deepStrictEqual(e.show().violation, { matches: 2 });
    }
  });

  it('should throw an error if value matches more than one constraint set', ({ assert }) => {
    try {
      Assert.oneOf({ bar: [Assert.equalTo('biz')] }, { bar: [Assert.equalTo('biz')] }).validate({ bar: 'biz' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
      assert.deepStrictEqual(e.show().violation, { matches: 2 });
    }
  });

  it('should throw an error if value matches more than one constraint set with overlapping schemas', ({ assert }) => {
    try {
      Assert.oneOf({ bar: [Assert.notBlank()] }, { bar: [Assert.equalTo('biz')] }).validate({ bar: 'biz' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'OneOf');
      assert.deepStrictEqual(e.show().violation, { matches: 2 });
    }
  });

  it('should pass if value matches the first constraint set', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf({ bar: [Assert.equalTo('biz')] }, { bar: [Assert.equalTo('baz')] }).validate({ bar: 'biz' });
    });
  });

  it('should pass if value matches the second constraint set', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf({ bar: [Assert.equalTo('biz')] }, { bar: [Assert.equalTo('baz')] }).validate({ bar: 'baz' });
    });
  });

  it('should support more than two constraint sets', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf(
        { bar: [Assert.equalTo('biz')] },
        { bar: [Assert.equalTo('baz')] },
        { bar: [Assert.equalTo('qux')] }
      ).validate({ bar: 'qux' });
    });
  });

  it('should pass if a constraint set contains an extra assert', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf(
        {
          bar: [Assert.equalTo('biz')],
          baz: [Assert.oneOf({ qux: [Assert.equalTo('corge')] }, { qux: [Assert.equalTo('grault')] })]
        },
        { bar: [Assert.equalTo('baz')] }
      ).validate({ bar: 'biz', baz: { qux: 'corge' } });
    });
  });

  it('should pass if value matches exactly one assert instance constraint set', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf(Assert.ofLength({ max: 2 }), Assert.ofLength({ min: 3 })).validate('foo');
    });
  });

  it('should pass if value matches the first assert array constraint set', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf([Assert.equalTo('foo')], [Assert.equalTo('bar')]).validate('foo');
    });
  });

  it('should pass if value matches the second assert array constraint set', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.oneOf([Assert.equalTo('foo')], [Assert.equalTo('bar')]).validate('bar');
    });
  });
});
