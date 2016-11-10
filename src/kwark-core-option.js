var exists = require('./utils').exists;

/* @Option Type:
*
*  May or may not return a value, but never fails.
*  Option is null safe, will never crash your app
*  unless you explicitly specify so by unwrapping
*  the null value.
*
* */
function Option(v)
{
    return exists(v) ? Just.of(v) : None.of(v);
}

Option.of = function(v)
{
  return new Option(v);
};


Option.prototype.map = function(f)
{
    return this.isNone() ? None.of(null) : Just.of(f(this.__value));
};

Option.prototype.isNone = function()
{
    return this.constructor === None;
};

Option.prototype.orElse = function(other)
{
    return this.isNone() ? Option.of(other.unwrap()) : Option.of(this.unwrap());
};

Option.prototype.empty = function()
{
    return None.of(null);
};

Option.prototype.unwrap = function()
{
  return this.__value;
};

Option.prototype.concat = function(other, f)
{
    return this.isNone() ? None.of(null) : f(this.unwrap(), other.unwrap());
};

function Just(v)
{
    this.__value = v;
}

Just.prototype = Object.create(Option.prototype);
Just.prototype.constructor = Just;

Just.prototype.map = function(f)
{
    return new Just(f(this.__value));
};


Just.of = function(v) {
    return new Just(v);
};

function None(v)
{
    this.__value = v;
}

None.prototype = Object.create(Option.prototype);
None.prototype.constructor = None;

None.prototype.map = function()
{
    return new None(null);
};

None.of = function(v) {
    return new None(v);
};

module.exports = Option;